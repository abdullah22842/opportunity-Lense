/**
 * Contact page content.
 *
 * CONTACT CHANNELS ARE UNPOPULATED. Every channel below has
 * `value: null`, which renders it as a labelled placeholder rather than
 * a link. Fill in `value` (and `href` where it differs) to activate one
 * — the page switches it to a real link automatically.
 *
 * Do not guess an address, handle or number here. An unlinked label is
 * better than one that goes nowhere.
 */

export type ContactChannel = {
  id: string;
  label: string;
  /** What's shown to the person, e.g. an address or handle. */
  value: string | null;
  /** Where it links. Falls back to `value` for mailto/tel style entries. */
  href?: string | null;
  /** Shown while the channel has no value. */
  placeholderNote: string;
  icon: "mail" | "linkedin" | "github" | "message-circle";
};

export const contactChannels: ContactChannel[] = [
  {
    id: "email",
    label: "Email",
    value: "eaglesvisionspro@gmail.com"
    href: null,
    placeholderNote: "Address to be published",
    icon: "mail",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: null,
    href: "https://www.linkedin.com/company/opportunity-lens",
    placeholderNote: "Profile to be published",
    icon: "linkedin",
  },
  {
    id: "github",
    label: "GitHub",
    value: null,
    href: null,
    placeholderNote: "Profile to be published",
    icon: "github",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: null,
    href: null,
    placeholderNote: "Number to be published",
    icon: "message-circle",
  },
];

/** Project type options. Mirrors the services offered on the homepage. */
export const projectTypes = [
  "AI & Generative AI",
  "Computer Vision",
  "Software Development",
  "AI Automation",
  "Research & R&D",
  "Digital Solutions",
  "Not sure yet",
] as const;

/** Budget bands. Deliberately broad — this is a routing signal, not a quote. */
export const budgetRanges = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "Over $50,000",
  "Prefer to discuss",
] as const;

/**
 * How the visitor would like a reply. Optional on the form.
 * No phone number is collected — we don't invent a channel we don't use.
 */
export const contactMethods = ["Email", "Video call"] as const;
