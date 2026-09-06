"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Code2,
  FlaskConical,
  Globe,
  ScanEye,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Service } from "@/data/site";

const icons: Record<Service["icon"], LucideIcon> = {
  sparkles: Sparkles,
  "scan-eye": ScanEye,
  code: Code2,
  workflow: Workflow,
  "flask-conical": FlaskConical,
  globe: Globe,
};

type ServiceCardProps = {
  service: Service;
  className?: string;
};

/**
 * One service in the capability grid.
 *
 * The whole card is a single link — the arrow is an affordance, not a
 * separate target — so there's one tab stop and one focus ring per card.
 * Hover state is handled in CSS via the `group` so it applies uniformly
 * whether the pointer or the keyboard triggers it.
 */
export function ServiceCard({ service, className }: ServiceCardProps) {
  const Icon = icons[service.icon];

  return (
    <Link
      href={service.href}
      aria-label={`Start a ${service.title} project`}
      className={cn(
        "card card-interactive group flex h-full flex-col p-6 sm:p-7",
        "focus-visible:border-cyan",
        className
      )}
    >
      <div className="relative z-10 flex h-full flex-col">
        {/* Number + icon */}
        <div className="flex items-start justify-between gap-4">
          <span
            aria-hidden="true"
            className="font-display text-sm tracking-[0.14em] text-muted transition-colors duration-[var(--duration-base)] group-hover:text-cyan"
          >
            {service.number}
          </span>
          <span
            className={cn(
              "inline-flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)]",
              "border border-line bg-surface-2 text-ink-soft",
              "transition-[color,border-color,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-standard)]",
              "group-hover:border-cyan/40 group-hover:text-cyan group-hover:shadow-[var(--glow-cyan-sm)]"
            )}
          >
            <Icon className="size-5" aria-hidden="true" strokeWidth={1.6} />
          </span>
        </div>

        {/* Title + description */}
        <h3 className="mt-6 text-[1.2rem]! leading-snug! font-semibold">{service.title}</h3>
        <p className="mt-3 text-sm text-ink-soft">{service.description}</p>

        {/* Tags */}
        <ul className="mt-6 flex flex-wrap gap-1.5">
          {service.tags.map((tag) => (
            <li
              key={tag}
              className={cn(
                "rounded-[var(--radius-full)] border border-line bg-surface-2 px-2.5 py-1",
                "text-xs text-muted transition-colors duration-[var(--duration-base)]",
                "group-hover:border-line-strong group-hover:text-ink-soft"
              )}
            >
              {tag}
            </li>
          ))}
        </ul>

        {/* Arrow sits on the bottom edge, aligned across cards of unequal height */}
        <div className="mt-auto flex items-center gap-2 pt-7 text-sm text-muted transition-colors duration-[var(--duration-base)] group-hover:text-cyan">
          <span>Start a project</span>
          <ArrowUpRight
            className="size-4 transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}
