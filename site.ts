/**
 * Central site configuration.
 *
 * Single source of truth for copy that appears in more than one place
 * (metadata, header, footer, structured data). Keeping this in /data
 * means new sections or a larger content team can extend the site
 * without touching layout or component code.
 */

export const siteConfig = {
  name: "Opportunity Lens",
  shortName: "Opportunity Lens",
  tagline: "AI, Technology & Research",
  description:
    "Opportunity Lens builds AI-powered solutions, intelligent software and research-driven technology across Generative AI, Computer Vision, Machine Learning and digital solutions.",
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
  /**
   * Left null on purpose. These were placeholder values; publishing an
   * address or profile that doesn't exist is worse than showing none.
   * Fill them in once they're real — the UI already handles both cases.
   */
  social: {
    linkedin: null as string | null,
    x: null as string | null,
    github: null as string | null,
  },
  contact: {
    email: null as string | null,
  },
} as const;

export type NavLink = {
  label: string;
  href: string;
};

/**
 * Primary navigation.
 *
 * Sections live on the homepage, so these are in-page anchors rather
 * than routes — a link to /services would 404 and Next would prefetch
 * the 404 on hover. When a section graduates to its own page, change
 * the href here and nothing else needs touching.
 */
export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Research", href: "/#research" },
  { label: "Projects", href: "/#projects" },
  { label: "About", href: "/#about" },
  { label: "Insights", href: "/#insights" },
  { label: "Contact", href: "/contact" },
];

/** Brand descriptor shown beneath the wordmark in the header. */
export const brandDescriptor = "AI \u2022 TECHNOLOGY \u2022 RESEARCH";

/** Disciplines line under the hero sub-copy. */
export const heroDisciplines = [
  "AI",
  "GenAI",
  "Computer Vision",
  "Software",
  "Research",
];

/** Primary conversion action, repeated in the header and hero. */
export const primaryCta = { label: "Start a Project", href: "/contact" };

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

/**
 * Footer navigation. Mirrors the header minus "Home", which the
 * wordmark already covers.
 */
export const footerLinks: NavLink[] = navLinks.filter(
  (link) => link.href !== "/"
);

/**
 * Social profiles.
 *
 * `href` is null for every entry: these render as inert placeholders
 * until real profile URLs exist. Set `href` to the live URL to turn one
 * into a working link — the footer switches automatically.
 * Do not guess a URL; an unlinked label is better than a dead one.
 */
export type SocialLink = {
  label: string;
  href: string | null;
};

export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", href: null },
  { label: "GitHub", href: null },
  { label: "Facebook", href: null },
];

export const footerTagline = "AI \u2022 Technology \u2022 Research";
export const footerBlurb =
  "Building intelligent technology for real-world problems.";
