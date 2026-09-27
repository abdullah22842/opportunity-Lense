import type { Metadata } from "next";
import { Briefcase, GitBranch, Mail, MessageCircle } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/ui/ContactForm";
import {
  contactChannels,
  projectTypes,
  type ContactChannel,
} from "@/data/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell Opportunity Lens about your idea, research problem or business challenge. We reply to every enquiry.",
  alternates: { canonical: "/contact" },
};

const channelIcons: Record<ContactChannel["icon"], typeof Mail> = {
  mail: Mail,
  linkedin: Briefcase,
  github: GitBranch,
  "message-circle": MessageCircle,
};

const nextSteps = [
  "We read your enquiry and come back with questions if anything is unclear.",
  "A short call to work out whether we're the right fit for the problem.",
  "If we are, a written scope with a clear first deliverable.",
];

/**
 * Contact page.
 *
 * Service cards link here as /contact?project=<Project type>; a value
 * that matches one of `projectTypes` pre-selects it in the form.
 * Anything else is ignored rather than trusted.
 */
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ project?: string | string[] }>;
}) {
  const { project } = await searchParams;
  const requested = Array.isArray(project) ? project[0] : project;
  const defaultProjectType = (projectTypes as readonly string[]).includes(
    requested ?? ""
  )
    ? (requested as string)
    : "";

  // Only show channels that actually exist. An empty card of
  // "to be published" labels reads as unfinished on a live site.
  const liveChannels = contactChannels.filter((c) => c.value);

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="surface-glow">
          <Container className="relative z-10 pt-16 pb-12 lg:pt-24">
            <h1 className="max-w-[14ch] text-[clamp(2.05rem,1.1rem+2.7vw,2.9rem)]! leading-[1.08]!">
              Let&apos;s build something useful.
            </h1>
            <p className="mt-6 max-w-[54ch] text-lg text-ink-soft">
              Tell us about your idea, research problem or business challenge.
            </p>
          </Container>
        </div>

        <Container className="grid gap-8 pb-[var(--space-section-y)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.5fr)] lg:gap-10">
          <ContactForm defaultProjectType={defaultProjectType} />

          <aside className="flex h-fit flex-col gap-6">
            {liveChannels.length > 0 && (
              <div className="card p-6">
                <div className="relative z-10">
                  <h2 className="text-lg! font-semibold">
                    Other ways to reach us
                  </h2>
                  <ul className="mt-5 space-y-4">
                    {liveChannels.map((channel) => {
                      const Icon = channelIcons[channel.icon];
                      const href = channel.href ?? channel.value!;
                      const external = href.startsWith("http");
                      return (
                        <li key={channel.id}>
                          <a
                            href={href}
                            {...(external
                              ? { target: "_blank", rel: "noopener noreferrer" }
                              : {})}
                            className="group flex items-center gap-3"
                          >
                            <span className="flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-line bg-surface-2">
                              <Icon className="size-4 text-ink-soft group-hover:text-cyan" />
                            </span>
                            <span>
                              <span className="block text-sm font-semibold text-ink">
                                {channel.label}
                              </span>
                              <span className="block text-sm text-muted group-hover:text-cyan">
                                {channel.value}
                              </span>
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            )}

            <div className="card p-6">
              <div className="relative z-10">
                <h2 className="text-lg! font-semibold">What happens next</h2>
                <ol className="mt-5 space-y-4">
                  {nextSteps.map((step, i) => (
                    <li key={step} className="flex gap-3 text-sm text-ink-soft">
                      <span className="font-semibold text-cyan">{i + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </aside>
        </Container>
      </main>
      <Footer />
    </>
  );
}
