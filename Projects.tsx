"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";

/**
 * Selected Work.
 *
 * Cards are driven entirely by /data/projects.ts. The note under the
 * subheading is conditional on any entry still carrying the
 * `placeholder` flag, so it disappears on its own once every card
 * describes real work.
 */
export function Projects() {
  const reduce = useReducedMotion();
  const hasPlaceholders = projects.some((p) => p.placeholder);

  return (
    <Section id="projects" className="scroll-mt-24 border-t border-line">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="text-[clamp(1.9rem,1.2rem+2.2vw,2.6rem)]!">
          Selected Work
        </h2>
        <p className="mt-4 max-w-[54ch] text-lg text-ink-soft">
          A growing portfolio of experiments, research and technology projects.
        </p>
        {hasPlaceholders && (
          <p className="mt-3 text-sm text-muted">
            The entries below are illustrative examples of the kind of work we
            take on, not client engagements.
          </p>
        )}
      </motion.div>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <motion.li
            key={project.id}
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
            <ProjectCard project={project} className="w-full" />
          </motion.li>
        ))}
      </ul>

      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.1 }}
        className="mt-10"
      >
        <Button href="/#projects" variant="secondary">
          See all work
          <ArrowRight className="size-4" />
        </Button>
      </motion.div>
    </Section>
  );
}
