"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HeroVisual } from "@/components/visuals/HeroVisual";
import { heroDisciplines, primaryCta } from "@/data/site";

/**
 * Homepage hero.
 *
 * Two columns on desktop (copy left, lens visual right), stacked on
 * mobile with the visual demoted below the actions. One orchestrated
 * entrance on load — the only non-user-triggered motion here besides
 * the visual's own ambient loop.
 */
export function Hero() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduce ? 0 : 0.65,
      delay: reduce ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <div className="surface-glow">
      <Container className="relative z-10 grid items-center gap-14 pt-16 pb-[var(--space-section-y)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 lg:pt-24">
        {/* ---------- Copy ---------- */}
        <div>
          <motion.h1
            {...rise(0.05)}
            className="text-[clamp(2.05rem,1.1rem+2.7vw,2.7rem)]! leading-[1.08]!"
          >
            Intelligent Technology.
            <br />
            Real-World Impact.
          </motion.h1>

          <motion.p
            {...rise(0.14)}
            className="mt-7 max-w-[54ch] text-lg text-ink-soft"
          >
            Opportunity Lens builds AI-powered solutions, intelligent software
            and research-driven technology that help businesses, researchers and
            organisations turn ideas into practical solutions.
          </motion.p>

          <motion.ul
            {...rise(0.22)}
            className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted"
          >
            {heroDisciplines.map((item, i) => (
              <li key={item} className="flex items-center gap-3">
                {i > 0 && (
                  <span aria-hidden="true" className="size-1 rounded-full bg-line-strong" />
                )}
                {item}
              </li>
            ))}
          </motion.ul>

          <motion.div
            {...rise(0.3)}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Button href={primaryCta.href}>
              {primaryCta.label}
              <ArrowRight className="size-4" />
            </Button>
            <Button href="/#projects" variant="secondary">
              Explore Our Work
            </Button>
          </motion.div>
        </div>

        {/* ---------- Visual ---------- */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: reduce ? 0 : 1.1,
            delay: reduce ? 0 : 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative mx-auto w-full max-w-[19rem] sm:max-w-[23rem] lg:max-w-none"
        >
          <HeroVisual />
        </motion.div>
      </Container>
    </div>
  );
}
