/**
 * Team and visitor mail via Resend.
 * Server-only. Missing keys are a skip, not a crash — the enquiry is
 * already stored before this runs.
 */

export type EnquiryMail = {
  name: string;
  email: string;
  organisation: string;
  projectType: string;
  budget: string;
  message: string;
  preferredContact: string;
  submittedAt: string;
  attachments: string[];
};

const FROM_DEFAULT = "Opportunity Lens <onboarding@resend.dev>";

function fromAddress() {
  return process.env.CONTACT_FROM_EMAIL || FROM_DEFAULT;
}

export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL);
}

async function send(payload: {
  to: string[];
  reply_to?: string;
  subject: string;
  text: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromAddress(),
      ...payload,
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text());
    return false;
  }

  return true;
}

export async function sendTeamEnquiry(mail: EnquiryMail) {
  const to = process.env.CONTACT_TO_EMAIL;
  if (!to || !process.env.RESEND_API_KEY) return false;

  const files =
    mail.attachments.length > 0
      ? mail.attachments.map((name) => `- ${name}`).join("\n")
      : "None";

  const text = [
    `Name: ${mail.name}`,
    `Email: ${mail.email}`,
    `Organisation: ${mail.organisation || "-"}`,
    `Project type: ${mail.projectType}`,
    `Budget: ${mail.budget || "Not given"}`,
    `Preferred contact: ${mail.preferredContact || "Not given"}`,
    `Submitted: ${mail.submittedAt}`,
    "",
    "Attachments (private Supabase Storage, not public links):",
    files,
    "",
    mail.message,
  ].join("\n");

  return send({
    to: [to],
    reply_to: mail.email,
    subject: `New enquiry: ${mail.projectType} from ${mail.name}`,
    text,
  });
}

export async function sendVisitorConfirmation(mail: EnquiryMail) {
  if (!process.env.RESEND_API_KEY) return false;

  const text = [
    `Hi ${mail.name},`,
    "",
    "Thanks — your enquiry has been received. We'll review the details and get back to you.",
    "",
    "Opportunity Lens",
  ].join("\n");

  return send({
    to: [mail.email],
    reply_to: process.env.CONTACT_TO_EMAIL,
    subject: "We received your enquiry — Opportunity Lens",
    text,
  });
}
