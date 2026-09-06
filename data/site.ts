/**
 * Central site configuration.
 *
 * Single source of truth for copy that appears in more than one place
 * (metadata, header, footer, structured data).
 */

export const siteConfig = {
  name: "Opportunity Lens",
  shortName: "Opportunity Lens",
  tagline: "AI that brings the next opportunity into focus.",
  description:
    "Opportunity Lens is an AI technology company building generative AI, computer vision, and machine learning systems — from medical AI to automation and applied research.",
  url: "https://www.opportunitylens.com",
  locale: "en_US",
  themeColor: "#08090c",

  keywords: [
    "Opportunity Lens",
    "Artificial Intelligence",
    "Generative AI",
    "Computer Vision",
    "Machine Learning",
    "Medical AI",
    "AI Automation",
    "Software Development",
    "AI Research",
  ],

  social: {
    linkedin: "https://www.linkedin.com/company/opportunity-lens",
    x: "https://x.com/opportunitylens",
    github: "https://github.com/opportunity-lens",
  },

  contact: {
    email: "hello@opportunitylens.com",
  },
} as const;

/* -------------------------------------------------------------------------- */
/* Navigation                                                                 */
/* -------------------------------------------------------------------------- */

export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Research", href: "/research" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/* -------------------------------------------------------------------------- */
/* Brand                                                                      */
/* -------------------------------------------------------------------------- */

export const brandDescriptor =
  "AI, Computer Vision & Applied Research";

/** Disciplines line under the hero sub-copy. */
export const heroDisciplines = [
  "AI",
  "GenAI",
  "Computer Vision",
  "Software",
  "Research",
];

/* -------------------------------------------------------------------------- */
/* Primary CTA                                                                */
/* -------------------------------------------------------------------------- */

export type CtaLink = {
  label: string;
  href: string;
};

export const primaryCta: CtaLink = {
  label: "Start a Project",
  href: "/contact",
};

/* -------------------------------------------------------------------------- */
/* Social links                                                               */
/* -------------------------------------------------------------------------- */

export type SocialLink = {
  label: string;
  href: string;
};

export const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    href: siteConfig.social.linkedin,
  },
  {
    label: "GitHub",
    href: siteConfig.social.github,
  },
  {
    label: "X",
    href: siteConfig.social.x,
  },
];

/* -------------------------------------------------------------------------- */
/* Footer                                                                     */
/* -------------------------------------------------------------------------- */

export const footerTagline = siteConfig.tagline;

export const footerBlurb =
  "Opportunity Lens builds practical AI systems across generative AI, computer vision, software, automation, and applied research.";

export type FooterLink = {
  label: string;
  href: string;
};

export const footerLinks: FooterLink[] = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Research", href: "/research" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/* -------------------------------------------------------------------------- */
/* Founder                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Founder profile.
 *
 * `photo` is intentionally null: the card renders a clean placeholder
 * frame until a real image exists. To add one, drop the file in
 * /public and set `photo` to its path — nothing else needs to change.
 * Do not add entries here for people who are not actually on the team.
 */
export const founder = {
  name: null as string | null,
  role: "Founder & AI Researcher",
  photo: null as string | null,
  photoAlt: "Founder of Opportunity Lens",
};
/* -------------------------------------------------------------------------- */
/* Services                                                                   */
/* -------------------------------------------------------------------------- */

export type Service = {
  /** Display number — the cards are presented as an ordered set, 01-06. */
  number: string;
  id: string;
  title: string;
  /** One sentence on what the work actually is. No claims, no metrics. */
  description: string;
  icon: "sparkles" | "scan-eye" | "code" | "workflow" | "flask-conical" | "globe";
  /** Capabilities within this area, shown as tags on the card. */
  tags: string[];
  /**
   * Where the card goes. Points at the contact form with the project
   * type pre-selected — there are no per-service pages yet, and a link
   * to one would 404 (and be prefetched as a 404 on hover).
   */
  href: string;
};

export const services: Service[] = [
  {
    number: "01",
    id: "ai-generative-ai",
    title: "AI & Generative AI",
    description:
      "Language-model systems built around a specific task \u2014 grounded in your own data, with the retrieval and tooling that makes answers usable.",
    icon: "sparkles",
    tags: [
      "LLM applications",
      "RAG systems",
      "AI agents",
      "Generative AI",
      "AI assistants",
      "AI integration",
    ],
    href: "/contact?project=AI%20%26%20Generative%20AI",
  },
  {
    number: "02",
    id: "computer-vision",
    title: "Computer Vision",
    description:
      "Models that read images and video \u2014 finding, classifying and measuring what matters, from clinical scans to production lines.",
    icon: "scan-eye",
    tags: [
      "Image classification",
      "Object detection",
      "Image segmentation",
      "Medical imaging",
      "OCR",
      "Visual inspection",
      "Deep learning",
    ],
    href: "/contact?project=Computer%20Vision",
  },
  {
    number: "03",
    id: "software-development",
    title: "Software Development",
    description:
      "The applications and interfaces that carry a model into daily use, engineered to run reliably once the research is done.",
    icon: "code",
    tags: [
      "Web applications",
      "SaaS platforms",
      "APIs",
      "Dashboards",
      "Automation systems",
      "Custom software",
    ],
    href: "/contact?project=Software%20Development",
  },
  {
    number: "04",
    id: "ai-automation",
    title: "AI Automation",
    description:
      "Operational work handled end to end \u2014 documents read, data moved, and routine decisions made without a person in the loop.",
    icon: "workflow",
    tags: [
      "AI workflows",
      "Document processing",
      "RAG automation",
      "Business assistants",
      "Workflow automation",
      "Data pipelines",
    ],
    href: "/contact?project=AI%20Automation",
  },
  {
    number: "05",
    id: "research-rd",
    title: "Research & R&D",
    description:
      "Applied research for problems without an off-the-shelf answer, run as experiments and prototypes before anything is committed to.",
    icon: "flask-conical",
    tags: [
      "AI research",
      "Computer vision research",
      "Medical AI",
      "Machine learning experiments",
      "Research prototypes",
      "Technical consulting",
    ],
    href: "/contact?project=Research%20%26%20R%26D",
  },
  {
    number: "06",
    id: "digital-solutions",
    title: "Digital Solutions",
    description:
      "The surface a technical organisation presents to the world, and the measurement that shows whether it is working.",
    icon: "globe",
    tags: [
      "Websites",
      "SEO",
      "Digital marketing",
      "Content strategy",
      "Analytics",
      "Digital transformation",
    ],
    href: "/contact?project=Digital%20Solutions",
  },
];
/* -------------------------------------------------------------------------- */
/* Reasons (Why section)                                                      */
/* -------------------------------------------------------------------------- */

export type Reason = {
  id: string;
  title: string;
  body: string;
  icon: "microscope" | "target" | "handshake" | "trending-up";
};

export const reasons: Reason[] = [
  {
    id: "research-driven",
    title: "Research Driven",
    body: "We bring research thinking into practical technology development.",
    icon: "microscope",
  },
  {
    id: "practical-ai",
    title: "Practical AI",
    body: "We focus on useful AI—not AI for the sake of AI.",
    icon: "target",
  },
  {
    id: "flexible-collaboration",
    title: "Flexible Collaboration",
    body: "Work with us on a prototype, research project, software product or long-term technology initiative.",
    icon: "handshake",
  },
  {
    id: "built-to-grow",
    title: "Built to Grow",
    body: "Start with a focused solution and evolve it as your needs grow.",
    icon: "trending-up",
  },
];
