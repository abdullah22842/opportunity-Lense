/**
 * Insights / articles.
 *
 * ARTICLES ARE PLACEHOLDERS. Each entry carries `placeholder: true`,
 * which renders an "Example" marker and keeps the card non-navigating.
 * To publish a real article: fill in the fields, set a real `href`,
 * add `date`, and remove the `placeholder` flag. The section maps over
 * whatever is in this array, so nothing else needs changing.
 */

export type InsightCategory = "AI" | "Research" | "Technology";

export type Insight = {
  id: string;
  category: InsightCategory;
  title: string;
  excerpt: string;
  /** ISO date, e.g. "2026-04-12". Omitted while the entry is a placeholder. */
  date?: string;
  /** Approximate read time in minutes. */
  readingMinutes?: number;
  href: string;
  placeholder?: boolean;
};

export const insights: Insight[] = [
  {
    id: "example-genai-small-business",
    category: "AI",
    title: "What Generative AI Means for Small Businesses",
    excerpt:
      "An example of the kind of piece we plan to publish: where generative models genuinely save time for a small team, and where they add cost without adding value.",
    href: "/#insights",
    placeholder: true,
  },
  {
    id: "example-prototype-to-production",
    category: "Research",
    title: "From Research Prototype to Real-World AI",
    excerpt:
      "An example write-up on the gap between a model that works in a notebook and one that holds up in production — evaluation, drift, and the engineering in between.",
    href: "/#insights",
    placeholder: true,
  },
  {
    id: "example-cv-medical-imaging",
    category: "Technology",
    title: "How Computer Vision Is Changing Medical Imaging",
    excerpt:
      "An example article on where vision models are being applied in clinical imaging, what they can support today, and what still needs a specialist in the loop.",
    href: "/#insights",
    placeholder: true,
  },
];
