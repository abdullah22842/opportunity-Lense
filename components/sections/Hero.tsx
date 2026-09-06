"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";

const reveal = {
  hidden: { opacity: 0, y: 14 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/**
 * Example hero section — demonstrates how /components/sections pieces
 * are composed, including the single ambient hero glow and one
 * orchestrated entrance (not per-element scroll animation). This is
 * scaffolding for the real homepage build, not final hero copy.
 */
export function Hero() {
  return (
    <div className="surface-glow">
      <Section
        className="relative pt-28 sm:pt-36"
        containerClassName="max-w-[var(--container-max-narrow)] relative z-10"
      >
        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={reveal}
          className="text-sm text-muted"
        >
          {siteConfig.name}
        </motion.p>

        <motion.h1
          custom={0.08}
          initial="hidden"
          animate="visible"
          variants={reveal}
          className="mt-5"
        >
          {siteConfig.tagline}
        </motion.h1>

        <motion.p
          custom={0.16}
          initial="hidden"
          animate="visible"
          variants={reveal}
          className="mt-6 text-lg text-ink-soft"
        >
          {siteConfig.description}
        </motion.p>

        <motion.div
          custom={0.24}
          initial="hidden"
          animate="visible"
          variants={reveal}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <Button href="/contact">
            Start a conversation
            <ArrowUpRight className="size-4" />
          </Button>
          <Button href="/services" variant="secondary">
            See what we build
          </Button>
        </motion.div>
      </Section>
    </div>
  );
}
