/**
 * Enquiry validation and submission.
 *
 * ── Connecting a backend ────────────────────────────────────────────
 * Set NEXT_PUBLIC_CONTACT_ENDPOINT to a URL that accepts a JSON POST.
 * That can be:
 *   • a Next.js route handler you write at app/api/contact/route.ts
 *     → NEXT_PUBLIC_CONTACT_ENDPOINT="/api/contact"
 *   • a hosted form service (Formspree, Basin, Web3Forms, …)
 *     → NEXT_PUBLIC_CONTACT_ENDPOINT="https://formspree.io/f/xxxxxxx"
 *
 * Until that variable is set, `submitEnquiry` returns status
 * "not-configured". The form then tells the person plainly that the
 * form isn't live yet rather than showing a false confirmation — never
 * report a message as sent when nothing received it.
 */

export type EnquiryValues = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
  /** Honeypot — must stay empty. Bots fill it in; people never see it. */
  website: string;
};

export type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>;

export const emptyEnquiry: EnquiryValues = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  budget: "",
  message: "",
  website: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const MESSAGE_MIN = 20;
export const MESSAGE_MAX = 2000;

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

  if (!values.projectType) {
    errors.projectType = "Choose the closest project type.";
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

export type SubmitResult =
  | { status: "sent" }
  | { status: "not-configured" }
  | { status: "error"; message: string };

const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "";

export function isContactConfigured() {
  return ENDPOINT.length > 0;
}

export async function submitEnquiry(
  values: EnquiryValues
): Promise<SubmitResult> {
  // Honeypot tripped — accept silently so bots don't learn anything.
  if (values.website) return { status: "sent" };

  if (!ENDPOINT) return { status: "not-configured" };

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: values.name.trim(),
        email: values.email.trim(),
        company: values.company.trim(),
        projectType: values.projectType,
        budget: values.budget,
        message: values.message.trim(),
      }),
    });

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
