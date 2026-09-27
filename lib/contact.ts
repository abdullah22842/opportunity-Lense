/**
 * Enquiry validation and submission.
 *
 * The browser posts multipart form data to /api/contact. Storage and
 * email are configured with server-only environment variables — nothing
 * secret is read here. If the server has no database configured it
 * answers "not-configured", and the form says so instead of pretending
 * the enquiry was received.
 */

import { budgetRanges, contactMethods, projectTypes } from "@/data/contact";

export type EnquiryValues = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
  preferredContact: string;
  /** Honeypot — must stay empty. Bots fill it in; people never see it. */
  website: string;
};

export type EnquiryErrors = Partial<
  Record<keyof EnquiryValues | "attachment", string>
>;

export const emptyEnquiry: EnquiryValues = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  budget: "",
  message: "",
  preferredContact: "",
  website: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const MESSAGE_MIN = 20;
export const MESSAGE_MAX = 2000;

/** Vercel request bodies top out near 4.5 MB, so the cap sits under that. */
export const MAX_FILES = 3;
export const MAX_TOTAL_BYTES = Math.floor(3.5 * 1024 * 1024);

const ALLOWED_EXT = new Set([
  "pdf",
  "png",
  "jpg",
  "jpeg",
  "webp",
  "txt",
  "doc",
  "docx",
]);

const BLOCKED_EXT = new Set([
  "exe",
  "js",
  "mjs",
  "sh",
  "bat",
  "cmd",
  "html",
  "htm",
  "svg",
  "php",
]);

export const FILE_ACCEPT = ".pdf,.png,.jpg,.jpeg,.webp,.txt,.doc,.docx";

const ALLOWED_LISTS = {
  projectType: projectTypes as readonly string[],
  budget: budgetRanges as readonly string[],
  preferredContact: contactMethods as readonly string[],
};

function extensionOf(name: string) {
  const base = name.split(/[/\\]/).pop() ?? "";
  const dot = base.lastIndexOf(".");
  if (dot <= 0) return "";
  return base.slice(dot + 1).toLowerCase();
}

/**
 * Validate the whole form. Returns an object keyed by field name;
 * empty means valid. Messages say what's wrong and how to fix it.
 */
export function validateEnquiry(values: EnquiryValues): EnquiryErrors {
  const errors: EnquiryErrors = {};

  if (!values.name.trim()) {
    errors.name = "Enter your name.";
  } else if (values.name.trim().length > 100) {
    errors.name = "Name is too long — 100 characters maximum.";
  }

  if (!values.email.trim()) {
    errors.email = "Enter an email address so we can reply.";
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = "That doesn't look like an email address.";
  }

  if (values.company.trim().length > 120) {
    errors.company = "Organisation name is too long — 120 characters maximum.";
  }

  if (
    !values.projectType ||
    !ALLOWED_LISTS.projectType.includes(values.projectType)
  ) {
    errors.projectType = "Choose the closest project type.";
  }

  if (values.budget && !ALLOWED_LISTS.budget.includes(values.budget)) {
    errors.budget = "Choose a budget range from the list.";
  }

  if (
    values.preferredContact &&
    !ALLOWED_LISTS.preferredContact.includes(values.preferredContact)
  ) {
    errors.preferredContact = "Choose a contact method from the list.";
  }

  const message = values.message.trim();
  if (!message) {
    errors.message = "Tell us a little about what you have in mind.";
  } else if (message.length < MESSAGE_MIN) {
    errors.message = `Add a bit more detail — at least ${MESSAGE_MIN} characters.`;
  } else if (message.length > MESSAGE_MAX) {
    errors.message = `That's over the ${MESSAGE_MAX} character limit.`;
  }

  return errors;
}

/** Client and server share this so a bad file is caught before upload. */
export function validateFiles(files: File[]): string | undefined {
  const real = files.filter((file) => file.size > 0);
  if (real.length > MAX_FILES) {
    return `Attach up to ${MAX_FILES} files.`;
  }

  let total = 0;
  for (const file of real) {
    total += file.size;
    const ext = extensionOf(file.name);
    const parts = (file.name.split(/[/\\]/).pop() ?? "").toLowerCase().split(".");
    const blocked = parts.slice(1).some((part) => BLOCKED_EXT.has(part));
    if (!ALLOWED_EXT.has(ext) || blocked) {
      return "Use a PDF, Word document, text file, or PNG, JPG, or WebP image.";
    }
  }

  if (total > MAX_TOTAL_BYTES) {
    return "Attachments are too large — keep the total under 3.5 MB.";
  }

  return undefined;
}

export function safeFileName(name: string) {
  const base = (name.split(/[/\\]/).pop() ?? "file").replace(/[^\w.\-]+/g, "_");
  const trimmed = base.replace(/^\.+/, "").slice(0, 80);
  return trimmed || "file";
}

export type SubmitResult =
  | { status: "sent" }
  | { status: "not-configured" }
  | { status: "invalid"; errors: EnquiryErrors }
  | { status: "error"; message: string };

export async function submitEnquiry(
  values: EnquiryValues,
  files: File[]
): Promise<SubmitResult> {
  const body = new FormData();
  body.set("name", values.name.trim());
  body.set("email", values.email.trim());
  body.set("company", values.company.trim());
  body.set("projectType", values.projectType);
  body.set("budget", values.budget);
  body.set("message", values.message.trim());
  body.set("preferredContact", values.preferredContact);
  body.set("website", values.website);
  for (const file of files) {
    if (file.size > 0) body.append("attachment", file);
  }

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { Accept: "application/json" },
      body,
    });

    if (response.status === 503) return { status: "not-configured" };

    if (response.status === 400) {
      const data = (await response.json().catch(() => null)) as {
        errors?: EnquiryErrors;
      } | null;
      if (data?.errors && Object.keys(data.errors).length > 0) {
        return { status: "invalid", errors: data.errors };
      }
      return {
        status: "error",
        message: "Some details need correcting before this can be sent.",
      };
    }

    if (response.status === 413) {
      return {
        status: "error",
        message: "Attachments are too large — keep the total under 3.5 MB.",
      };
    }

    if (response.status === 429) {
      return {
        status: "error",
        message: "Too many enquiries from this network. Please try again shortly.",
      };
    }

    if (!response.ok) {
      return {
        status: "error",
        message:
          "The message couldn't be sent just now. Please try again in a moment.",
      };
    }

    return { status: "sent" };
  } catch {
    return {
      status: "error",
      message:
        "The message couldn't be sent — check your connection and try again.",
    };
  }
}
