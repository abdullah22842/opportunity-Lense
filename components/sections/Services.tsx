"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { services } from "@/data/site";

/**
 * Capability grid.
 *
 * One reveal as the grid scrolls into view, lightly staggered by column
 * so the row reads left to right — not a separate animation per card on
 * every scroll pass.
 */
export function Services() {
  const reduce = useReducedMotion();

  return (
    <Section id="services" className="scroll-mt-24 border-t border-line">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{
          duration: reduce ? 0 : 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <h2 className="text-[clamp(1.9rem,1.2rem+2.2vw,2.6rem)]!">
          What We Build
        </h2>
        <p className="mt-4 max-w-[52ch] text-lg text-ink-soft">
          From intelligent prototypes to production-ready digital solutions.
        </p>
      </motion.div>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <motion.li
            key={service.id}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: reduce ? 0 : 0.55,
              delay: reduce ? 0 : (i % 3) * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex"
          >
            <ServiceCard service={service} className="w-full" />
          </motion.li>
        ))}
      </ul>
    </Section>
  );
}
