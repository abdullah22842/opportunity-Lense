"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { founder } from "@/data/site";

/**
 * About.
 *
 * Honest framing for a founder-led company: no team grid, no invented
 * headcount. The founder card holds a clean, correctly-proportioned
 * slot so a real photo can be dropped in later without any layout
 * shift — see `founder.photo` in /data/site.ts.
 */
export function About() {
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
      id="about"
      className="scroll-mt-24 border-t border-line"
      containerClassName="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.44fr)] lg:gap-16"
    >
      <div>
        <motion.h2
          {...rise(0)}
          className="max-w-[16ch] text-[clamp(1.9rem,1.2rem+2.2vw,2.6rem)]!"
        >
          A small team with a bigger vision.
        </motion.h2>

        <motion.p {...rise(0.08)} className="mt-6 text-lg text-ink-soft">
          Opportunity Lens is an emerging AI and technology company focused on
          building practical solutions at the intersection of research, software
          and artificial intelligence.
        </motion.p>

        <motion.p {...rise(0.14)} className="mt-4 text-lg text-ink-soft">
          We start small, work closely with our clients and partners, and grow
          through meaningful technology—not unnecessary complexity.
        </motion.p>
      </div>

      {/* Founder card */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-70px" }}
        transition={{
          duration: reduce ? 0 : 0.7,
          delay: reduce ? 0 : 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="card h-fit w-full max-w-[20rem] p-5"
      >
        <div className="relative z-10">
          {/* Photo slot — fixed 4:5 so swapping in a real image shifts nothing */}
          <div className="relative aspect-4/5 w-full overflow-hidden rounded-[var(--radius-md)] border border-line bg-surface-2">
            {founder.photo ? (
              <Image
                src={founder.photo}
                alt={founder.photoAlt}
                fill
                sizes="(min-width: 1024px) 24rem, 100vw"
                className="object-cover"
              />
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center"
                aria-hidden="true"
              >
                {/* Lens mark, oversized and quiet — a held space, not an avatar */}
                <svg
                  viewBox="0 0 22 22"
                  className="size-24 text-line-strong"
                  fill="none"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="8"
                    stroke="currentColor"
                    strokeWidth="0.8"
                  />
                  <circle
                    cx="11"
                    cy="11"
                    r="2.5"
                    fill="var(--color-violet)"
                    fillOpacity="0.35"
                  />
                </svg>
              </div>
            )}
          </div>

          <div className="mt-5">
            {founder.name && (
              <p className="font-display text-lg leading-tight">
                {founder.name}
              </p>
            )}
            <p className="text-sm text-cyan">{founder.role}</p>
            <p className="mt-3 text-sm text-muted">
              Opportunity Lens is founder-led. Work is delivered directly, with
              specialist collaborators brought in when a project calls for it.
            </p>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
