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
/* Services                                                                   */
/* -------------------------------------------------------------------------- */

export type Service = {
  id: string;
  title: string;
  summary: string;
  icon:
    | "brain"
    | "sparkles"
    | "scan-eye"
    | "network"
    | "stethoscope"
    | "code"
    | "workflow"
    | "megaphone"
    | "flask-conical";
};

export const services: Service[] = [
  {
    id: "artificial-intelligence",
    title: "Artificial Intelligence",
    summary:
      "Custom AI systems designed around a specific business problem, not a generic model.",
    icon: "brain",
  },
  {
    id: "generative-ai",
    title: "Generative AI",
    summary:
      "Applied generative models for content, design, and product workflows.",
    icon: "sparkles",
  },
  {
    id: "computer-vision",
    title: "Computer Vision",
    summary:
      "Vision systems that detect, classify, and measure what matters in an image or video feed.",
    icon: "scan-eye",
  },
  {
    id: "machine-learning",
    title: "Machine Learning",
    summary:
      "Predictive and decision models trained and maintained on real production data.",
    icon: "network",
  },
  {
    id: "medical-ai",
    title: "Medical AI",
    summary:
      "AI tooling for clinical and healthcare workflows, built with domain experts.",
    icon: "stethoscope",
  },
  {
    id: "software-development",
    title: "Software Development",
    summary:
      "Full-stack product engineering for the applications that carry AI into daily use.",
    icon: "code",
  },
  {
    id: "ai-automation",
    title: "AI Automation",
    summary:
      "Automating operational work end-to-end with agents and orchestration.",
    icon: "workflow",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    summary:
      "Data-informed growth and marketing for AI-native and traditional businesses alike.",
    icon: "megaphone",
  },
  {
    id: "research-rd",
    title: "Research & R&D",
    summary:
      "Applied research that keeps client work grounded in the current state of the art.",
    icon: "flask-conical",
  },
];