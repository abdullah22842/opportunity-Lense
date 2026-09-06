"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { insights, type Insight } from "@/data/insights";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * One article card.
 *
 * Placeholders render as a non-navigating <article> rather than a link,
 * so nothing on the page promises a destination that doesn't exist yet.
 * Real entries become links automatically once `placeholder` is removed.
 */
function InsightCard({ insight }: { insight: Insight }) {
  const inner = (
    <div className="relative z-10 flex h-full flex-col">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="tracking-[0.12em] text-cyan">{insight.category}</span>
        {insight.date && (
          <span className="text-muted">{formatDate(insight.date)}</span>
        )}
        {insight.readingMinutes && (
          <span className="text-muted">{insight.readingMinutes} min read</span>
        )}
        {insight.placeholder && (
          <span className="rounded-[var(--radius-full)] border border-line bg-surface-2 px-2 py-0.5 text-muted">
            Example
          </span>
        )}
      </div>

      <h3
        className={cn(
          "mt-4 text-[1.15rem]! leading-snug! font-semibold",
          !insight.placeholder &&
            "transition-colors duration-[var(--duration-base)] group-hover:text-cyan"
        )}
      >
        {insight.title}
      </h3>

      <p className="mt-3 text-sm text-ink-soft">{insight.excerpt}</p>

      {!insight.placeholder && (
        <div className="mt-auto flex items-center gap-2 pt-6 text-sm text-muted transition-colors duration-[var(--duration-base)] group-hover:text-cyan">
          <span>Read article</span>
          <ArrowRight
            className="size-4 transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1"
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );

  if (insight.placeholder) {
    return <article className="card flex h-full flex-col p-6">{inner}</article>;
  }

  return (
    <Link
      href={insight.href}
      className="card card-interactive group flex h-full flex-col p-6 focus-visible:border-cyan"
    >
      {inner}
    </Link>
  );
}

/**
 * Insights.
 *
 * Content lives in /data/insights.ts. The note under the subheading
 * clears itself once no entry carries the `placeholder` flag.
 */
export function Insights() {
  const reduce = useReducedMotion();
  const hasPlaceholders = insights.some((i) => i.placeholder);

  return (
    <Section id="insights" className="scroll-mt-24 border-t border-line">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="text-[clamp(1.9rem,1.2rem+2.2vw,2.6rem)]!">
          Ideas, Research &amp; Technology
        </h2>
        {hasPlaceholders && (
          <p className="mt-4 max-w-[56ch] text-sm text-muted">
            Writing is in progress. The cards below outline the topics we plan
            to publish on.
          </p>
        )}
      </motion.div>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {insights.map((insight, i) => (
          <motion.li
            key={insight.id}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: reduce ? 0 : 0.55,
              delay: reduce ? 0 : i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex"
          >
            <div className="w-full">
              <InsightCard insight={insight} />
            </div>
          </motion.li>
        ))}
      </ul>

      <div className="mt-10">
        <Button href="/#insights" variant="secondary">
          View All Insights
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </Section>
  );
}
