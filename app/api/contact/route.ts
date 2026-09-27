import { NextResponse } from "next/server";
import {
  emptyEnquiry,
  validateEnquiry,
  validateFiles,
  type EnquiryErrors,
  type EnquiryValues,
} from "@/lib/contact";
import { sendTeamEnquiry, sendVisitorConfirmation } from "@/lib/email";
import {
  deleteAttachments,
  insertInquiry,
  isStorageConfigured,
  uploadAttachments,
} from "@/lib/inquiries";

/**
 * POST /api/contact
 *
 * Validates the enquiry, stores it in Supabase, uploads any attachments
 * to a private bucket, then emails the team. Email failure does not
 * fail the request once the row is saved. Missing Supabase config
 * returns 503 so the form can say the enquiry was not stored.
 */

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MAX_BODY_BYTES = 4_500_000;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function clientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  );
}

function fieldErrors(errors: EnquiryErrors) {
  return NextResponse.json(
    { error: "Invalid enquiry", errors },
    { status: 400 }
  );
}

export async function POST(request: Request) {
  if (!isStorageConfigured()) {
    console.error(
      "Contact form: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set."
    );
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  if (rateLimited(clientIp(request))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const values: EnquiryValues = { ...emptyEnquiry };
  for (const key of Object.keys(emptyEnquiry) as (keyof EnquiryValues)[]) {
    const raw = form.get(key);
    if (typeof raw === "string") values[key] = raw;
  }

  // Honeypot filled in: pretend success so bots learn nothing.
  if (values.website.trim()) return NextResponse.json({ ok: true });

  const errors = validateEnquiry(values);
  const files = form
    .getAll("attachment")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);
  const fileError = validateFiles(files);
  if (fileError) errors.attachment = fileError;

  if (Object.keys(errors).length > 0) return fieldErrors(errors);

  const id = crypto.randomUUID();
  let paths: string[] = [];

  try {
    if (files.length > 0) paths = await uploadAttachments(id, files);
    await insertInquiry({
      id,
      name: values.name.trim(),
      email: values.email.trim(),
      organisation: values.company.trim(),
      projectType: values.projectType,
      budget: values.budget,
      message: values.message.trim(),
      preferredContact: values.preferredContact,
      attachmentPaths: paths,
    });
  } catch (err) {
    console.error("Contact form: save failed", err);
    if (paths.length > 0) await deleteAttachments(paths);
    return NextResponse.json({ error: "Save failed" }, { status: 502 });
  }

  const mail = {
    name: values.name.trim(),
    email: values.email.trim(),
    organisation: values.company.trim(),
    projectType: values.projectType,
    budget: values.budget,
    message: values.message.trim(),
    preferredContact: values.preferredContact,
    submittedAt: new Date().toISOString(),
    attachments: paths,
  };

  try {
    await sendTeamEnquiry(mail);
    await sendVisitorConfirmation(mail);
  } catch (err) {
    // The enquiry is already stored. Mail can be retried from the row.
    console.error("Contact form: email failed", err);
  }

  return NextResponse.json({ ok: true });
}
