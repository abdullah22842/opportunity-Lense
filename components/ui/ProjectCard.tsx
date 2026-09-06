"use client";

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
export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Link
      href={project.href}
      aria-label={`${project.title} — view project`}
      className={cn(
        "card card-interactive group flex h-full flex-col p-6 sm:p-7",
        "focus-visible:border-cyan",
        className
      )}
    >
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs tracking-[0.12em] text-cyan">
            {project.category}
          </span>
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

        <div className="mt-auto flex items-center gap-2 pt-7 text-sm text-muted transition-colors duration-[var(--duration-base)] group-hover:text-cyan">
          <span>View Project</span>
          <ArrowRight
            className="size-4 transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}
