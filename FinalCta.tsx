"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { primaryCta } from "@/data/site";
import { useInViewport } from "@/lib/useInViewport";

/** Deterministic pseudo-random so server and client render identically. */
function rand(i: number, salt = 0) {
  return Math.abs(Math.sin((i + 1) * 12.9898 + salt * 78.233) * 43758.5453) % 1;
}

/** Sparse activated nodes over the grid — a data field, not decoration. */
const NODES = Array.from({ length: 26 }, (_, i) => ({
  x: 4 + rand(i, 1) * 92,
  y: 8 + rand(i, 2) * 84,
  r: 1 + rand(i, 3) * 1.8,
  d: rand(i, 4) * 4,
}));

/**
 * Closing call to action.
 *
 * The background is a faint measurement grid with a slow pulse of
 * activated nodes and a single brand glow — enough to read as
 * "data" behind the type without competing with it. Everything sits
 * behind `aria-hidden` since it carries no information.
 */
export function FinalCta() {
  const reduced = useReducedMotion();
  const { ref, inView } = useInViewport<HTMLElement>();
  const reduce = reduced || !inView;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-t border-line"
    >
      {/* Background field */}
      <div className="absolute inset-0" aria-hidden="true">
        <svg
          className="size-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="ol-cta-grid"
              width="4"
              height="4"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M4 0H0V4"
                fill="none"
                stroke="var(--color-border)"
                strokeWidth="0.15"
              />
            </pattern>
            <radialGradient id="ol-cta-fade" cx="0.5" cy="0.5" r="0.55">
              <stop offset="30%" stopColor="#fff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <mask id="ol-cta-mask">
              <rect width="100" height="100" fill="url(#ol-cta-fade)" />
            </mask>
          </defs>
          <rect
            width="100"
            height="100"
            fill="url(#ol-cta-grid)"
            mask="url(#ol-cta-mask)"
          />
          <g mask="url(#ol-cta-mask)">
            {NODES.map((n, i) => (
              <motion.circle
                key={i}
                cx={n.x}
                cy={n.y}
                r={n.r * 0.22}
                fill="var(--color-cyan)"
                initial={{ opacity: 0.25 }}
                animate={reduce ? undefined : { opacity: [0.12, 0.6, 0.12] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  delay: n.d,
                  ease: "easeInOut",
                }}
              />
            ))}
          </g>
        </svg>

        {/* One brand glow, centred low behind the buttons */}
        <div
          className="absolute inset-x-0 bottom-0 h-2/3"
          style={{
            background:
              "radial-gradient(50% 70% at 50% 100%, rgba(62,203,240,0.14) 0%, rgba(139,126,242,0.06) 45%, rgba(0,0,0,0) 75%)",
          }}
        />
      </div>

      <Container className="relative z-10 py-[var(--space-section-y)] text-center">
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduce ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-[18ch] text-[clamp(2rem,1.3rem+2.6vw,3rem)]!"
        >
          Have an idea worth building?
        </motion.h2>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: reduce ? 0 : 0.65,
            delay: reduce ? 0 : 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto mt-5 max-w-[52ch] text-lg text-ink-soft"
        >
          Let&apos;s turn your idea, research problem or business challenge into
          something useful.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: reduce ? 0 : 0.65,
            delay: reduce ? 0 : 0.16,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button href={primaryCta.href}>
            {primaryCta.label}
            <ArrowRight className="size-4" />
          </Button>
          <Button href="/contact" variant="secondary">
            Talk to Us
            <ArrowRight className="size-4" />
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
