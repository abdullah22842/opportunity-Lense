import { NextResponse } from "next/server";
import { validateEnquiry, emptyEnquiry, type EnquiryValues } from "@/lib/contact";

/**
 * POST /api/contact
 *
 * Receives the enquiry form, validates it again on the server (never
 * trust the browser), and emails it to the team through Resend.
 *
 * Required environment variables (set them in Vercel → Settings →
 * Environment Variables, and in .env.local for local development):
 *   RESEND_API_KEY      API key from https://resend.com/api-keys
 *   CONTACT_TO_EMAIL    Inbox that receives enquiries
 * Optional:
 *   CONTACT_FROM_EMAIL  Sender, e.g. "Opportunity Lens <hello@yourdomain.com>".
 *                       Defaults to Resend's test sender, which can only
 *                       deliver to the email you signed up to Resend with.
 */

const FROM_DEFAULT = "Opportunity Lens <onboarding@resend.dev>";

// Best-effort flood protection: max 5 enquiries per IP per 10 minutes.
// Serverless instances don't share memory, so this is a speed bump,
// not a guarantee.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set.");
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Keep only the fields we expect, coerced to strings.
  const raw = (body ?? {}) as Record<string, unknown>;
  const values: EnquiryValues = { ...emptyEnquiry };
  for (const key of Object.keys(emptyEnquiry) as (keyof EnquiryValues)[]) {
    if (typeof raw[key] === "string") values[key] = raw[key] as string;
  }

  // Honeypot filled in: pretend success so bots learn nothing.
  if (values.website) return NextResponse.json({ ok: true });

  const errors = validateEnquiry(values);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Invalid enquiry", errors }, { status: 400 });
  }

  const text = [
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    `Company: ${values.company.trim() || "-"}`,
    `Project type: ${values.projectType}`,
    `Budget: ${values.budget || "Not given"}`,
    "",
    values.message.trim(),
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || FROM_DEFAULT,
        to: [to],
        // Hitting "Reply" in your inbox answers the person directly.
        reply_to: values.email.trim(),
        subject: `New enquiry: ${values.projectType} from ${values.name.trim()}`,
        text,
      }),
    });

    if (!res.ok) {
      console.error("Contact form: Resend error", res.status, await res.text());
      return NextResponse.json({ error: "Send failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("Contact form: network error", err);
    return NextResponse.json({ error: "Send failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
