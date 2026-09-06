"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ResearchVisual } from "@/components/visuals/ResearchVisual";
import { researchTopics } from "@/data/projects";

/**
 * Research & Innovation.
 *
 * Visual sits left on desktop to alternate against the hero's
 * right-hand composition, so the page doesn't develop a single-side
 * rhythm. On mobile the copy leads and the visual follows.
 */
export function Research() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-70px" },
    transition: {
      duration: reduce ? 0 : 0.6,
      delay: reduce ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <Section
      id="research"
      className="scroll-mt-24 border-t border-line"
      containerClassName="grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:gap-16"
    >
      {/* Visual — second in the DOM so copy is read first on mobile */}
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-70px" }}
        transition={{
          duration: reduce ? 0 : 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="order-2 lg:order-1"
      >
        <ResearchVisual />
      </motion.div>

      <div className="order-1 lg:order-2">
        <motion.h2
          {...rise(0)}
          className="text-[clamp(1.9rem,1.2rem+2.2vw,2.6rem)]!"
        >
          Where AI Meets Research
        </motion.h2>

        <motion.p {...rise(0.08)} className="mt-5 text-lg text-ink-soft">
          Our research work explores emerging approaches in artificial
          intelligence, computer vision, generative models and medical
          imaging—with a focus on translating research into useful technology.
        </motion.p>

        <motion.ul {...rise(0.16)} className="mt-8 flex flex-wrap gap-2">
          {researchTopics.map((topic) => (
            <li
              key={topic}
              className="rounded-[var(--radius-full)] border border-line bg-surface-2 px-3 py-1.5 text-sm text-ink-soft"
            >
              {topic}
            </li>
          ))}
        </motion.ul>

        <motion.div {...rise(0.24)} className="mt-9">
          <Button href="/#research" variant="secondary">
            Explore Research
            <ArrowRight className="size-4" />
          </Button>
        </motion.div>
      </div>
    </Section>
  );
}
