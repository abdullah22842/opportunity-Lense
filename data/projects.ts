/**
 * Research topics and portfolio entries.
 *
 * PROJECTS ARE PLACEHOLDERS. Every entry below has `placeholder: true`,
 * which renders an "Example" marker on the card. To publish a real
 * project: replace the fields, drop the `placeholder` flag, and point
 * `href` at the case-study route. Nothing else needs to change — the
 * section maps over whatever is in this array.
 */

export const researchTopics = [
  "Generative AI",
  "Diffusion Models",
  "Flow Matching",
  "Computer Vision",
  "Medical AI",
  "Medical Image Analysis",
  "Histopathology",
  "Segmentation",
  "Representation Learning",
] as const;

export type ProjectCategory =
  | "AI Research"
  | "Computer Vision"
  | "Generative AI"
  | "AI Applications"
  | "Software"
  | "Automation";

export type ProjectLinks = {
  /** Public GitHub repository for this project. */
  github?: string;
  /** Live demo. */
  demo?: string;
  /** Paper or other research write-up. */
  paper?: string;
};

export type Project = {
  id: string;
  category: ProjectCategory;
  title: string;
  description: string;
  tags: string[];
  /**
   * In-site link. Placeholder cards point at the work section.
   * Real projects can keep this, or rely on `links` instead.
   */
  href: string;
  /** Marks the card as an illustrative example rather than delivered work. */
  placeholder?: boolean;
  /** Shown as a small label. Leave unset until a project should lead the grid. */
  featured?: boolean;
  /** Path under /public, or an absolute image URL. */
  image?: string;
  imageAlt?: string;
  /**
   * Public references only. Contact-form uploads do not create repos;
   * add a GitHub URL here when the team decides a project is public.
   */
  links?: ProjectLinks;
};

export const projects: Project[] = [
  {
    id: "example-diffusion-histopathology",
    category: "AI Research",
    title: "Diffusion models for histopathology",
    description:
      "An example of the research track: training generative models to synthesise tissue patches, and testing whether the synthetic data helps downstream segmentation.",
    tags: ["Diffusion", "PyTorch", "Histopathology", "DDIM"],
    href: "/#projects",
    placeholder: true,
  },
  {
    id: "example-nuclei-segmentation",
    category: "Computer Vision",
    title: "Nuclei segmentation pipeline",
    description:
      "An example of a vision pipeline: detecting and outlining cell nuclei in whole-slide images, with the tiling and stitching needed to run at slide scale.",
    tags: ["Segmentation", "U-Net", "Medical imaging", "Python"],
    href: "/#projects",
    placeholder: true,
  },
  {
    id: "example-rag-assistant",
    category: "Generative AI",
    title: "Retrieval-grounded assistant",
    description:
      "An example of an applied LLM build: answers drawn from a private document set, with citations back to the source passage.",
    tags: ["RAG", "LLM", "Vector search", "TypeScript"],
    href: "/#projects",
    placeholder: true,
  },
  {
    id: "example-inspection-dashboard",
    category: "AI Applications",
    title: "Visual inspection dashboard",
    description:
      "An example of putting a model in front of users: live inference on a camera feed, with review queues for the cases the model is unsure about.",
    tags: ["Object detection", "Next.js", "Real-time", "Dashboards"],
    href: "/#projects",
    placeholder: true,
  },
  {
    id: "example-annotation-platform",
    category: "Software",
    title: "Annotation and review platform",
    description:
      "An example of research tooling: a web application for labelling images, tracking annotator agreement, and exporting training-ready datasets.",
    tags: ["React", "PostgreSQL", "APIs", "SaaS"],
    href: "/#projects",
    placeholder: true,
  },
  {
    id: "example-document-pipeline",
    category: "Automation",
    title: "Document processing pipeline",
    description:
      "An example of an automation build: incoming documents read, classified and routed, with the low-confidence cases escalated to a person.",
    tags: ["OCR", "Workflow automation", "Data pipelines", "Python"],
    href: "/#projects",
    placeholder: true,
  },
];
