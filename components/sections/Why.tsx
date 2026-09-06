"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Handshake,
  Microscope,
  Target,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { reasons, type Reason } from "@/data/site";

const icons: Record<Reason["icon"], LucideIcon> = {
  microscope: Microscope,
  target: Target,
  handshake: Handshake,
  "trending-up": TrendingUp,
};

/**
 * Why Opportunity Lens.
 *
 * Four positions, stated plainly. These are claims about how we work,
 * which we can stand behind — deliberately not metrics, client counts
 * or years of experience, none of which a new company has.
 *
 * No hover lift here: nothing is clickable, so the cards stay static
 * and the interactive treatment keeps its meaning elsewhere on the page.
 */
export function Why() {
  const reduce = useReducedMotion();

  return (
    <Section id="why" className="scroll-mt-24 border-t border-line">
      <motion.h2
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-[clamp(1.9rem,1.2rem+2.2vw,2.6rem)]!"
      >
        Why Opportunity Lens
      </motion.h2>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map((reason, i) => {
          const Icon = icons[reason.icon];
          return (
            <motion.li
              key={reason.id}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: reduce ? 0 : 0.55,
                delay: reduce ? 0 : i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="card flex flex-col p-6"
            >
              <div className="relative z-10 flex h-full flex-col">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-cyan/25 bg-cyan/8 text-cyan">
                  <Icon className="size-5" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-[1.1rem]! leading-snug! font-semibold">
                  {reason.title}
                </h3>
                <p className="mt-3 text-sm text-ink-soft">{reason.body}</p>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </Section>
  );
}
