"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  className?: string;
};

/**
 * One portfolio entry.
 *
 * Whole card is a single link, matching ServiceCard, so there's one tab
 * stop per card. The `placeholder` flag renders an explicit "Example"
 * marker — remove the flag in the data once a card describes real
 * delivered work.
 */
function externalLinks(project: Project) {
  const links = [
    project.links?.github ? { label: "GitHub", href: project.links.github } : null,
    project.links?.demo ? { label: "Demo", href: project.links.demo } : null,
    project.links?.paper ? { label: "Paper", href: project.links.paper } : null,
  ];
  return links.filter((link): link is { label: string; href: string } =>
    Boolean(link)
  );
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const links = externalLinks(project);
  const linked = links.length === 0;

  const body = (
    <div className="relative z-10 flex h-full flex-col">
      {project.image && (
        <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-[var(--radius-sm)] border border-line">
          {project.image.startsWith("/") ? (
            <Image
              src={project.image}
              alt={project.imageAlt || project.title}
              fill
              sizes="(min-width: 1024px) 24rem, 100vw"
              className="object-cover"
            />
          ) : (
            // Remote URLs stay as a plain image so a new host does not need a Next config change.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.image}
              alt={project.imageAlt || project.title}
              className="size-full object-cover"
            />
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs tracking-[0.12em] text-cyan">
          {project.category}
        </span>
        {project.featured && (
          <span className="rounded-[var(--radius-full)] border border-cyan/30 bg-cyan/10 px-2 py-0.5 text-xs text-cyan">
            Featured
          </span>
        )}
        {project.placeholder && (
          <span className="rounded-[var(--radius-full)] border border-line bg-surface-2 px-2 py-0.5 text-xs text-muted">
            Example
          </span>
        )}
      </div>

      <h3 className="mt-4 text-[1.2rem]! leading-snug! font-semibold transition-colors duration-[var(--duration-base)] group-hover:text-cyan">
        {project.title}
      </h3>

      <p className="mt-3 text-sm text-ink-soft">{project.description}</p>

      <ul className="mt-6 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className={cn(
              "rounded-[var(--radius-sm)] border border-line bg-surface-2 px-2 py-1",
              "font-mono text-xs text-muted transition-colors duration-[var(--duration-base)]",
              "group-hover:border-line-strong group-hover:text-ink-soft"
            )}
          >
            {tag}
          </li>
        ))}
      </ul>

      {linked ? (
        <div className="mt-auto flex items-center gap-2 pt-7 text-sm text-muted transition-colors duration-[var(--duration-base)] group-hover:text-cyan">
          <span>View Project</span>
          <ArrowRight
            className="size-4 transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1"
            aria-hidden="true"
          />
        </div>
      ) : (
        <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2 pt-7">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors duration-[var(--duration-base)] hover:text-cyan"
            >
              {link.label}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          ))}
        </div>
      )}
    </div>
  );

  const classes = cn(
    "card card-interactive group flex h-full flex-col p-6 sm:p-7",
    "focus-visible:border-cyan",
    className
  );

  if (linked) {
    return (
      <Link
        href={project.href}
        aria-label={`${project.title} — view project`}
        className={classes}
      >
        {body}
      </Link>
    );
  }

  return <article className={classes}>{body}</article>;
}
