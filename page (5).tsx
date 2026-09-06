import type { Metadata } from "next";
import { Briefcase, GitBranch, Mail, MessageCircle } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/sections/ContactForm";
import { contactChannels, projectTypes, type ContactChannel } from "@/data/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your idea, research problem or business challenge. Opportunity Lens builds AI, computer vision and software solutions.",
};

// lucide v1 dropped brand marks, so these are neutral stand-ins. Swap in
// real brand SVGs later if you want the recognisable logos.
const icons = {
  mail: Mail,
  linkedin: Briefcase,
  github: GitBranch,
  "message-circle": MessageCircle,
} as const;

/**
 * A single contact channel.
 *
 * Renders as a link only when `value` is set in /data/contact.ts.
 * Unpopulated channels render as a labelled placeholder — visible, so
 * people know the channel is coming, but not clickable.
 */
function Channel({ channel }: { channel: ContactChannel }) {
  const Icon = icons[channel.icon];
  const href = channel.href ?? channel.value;

  return (
    <li className="flex items-start gap-3.5">
      <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-line bg-surface-2 text-ink-soft">
        <Icon className="size-4" strokeWidth={1.7} aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-ink">
          {channel.label}
        </span>
        {channel.value && href ? (
          <a
            href={href}
            className="block truncate text-sm text-cyan underline-offset-4 hover:underline"
          >
            {channel.value}
          </a>
        ) : (
          <span className="block text-sm text-muted">
            {channel.placeholderNote}
          </span>
        )}
      </span>
    </li>
  );
}

/**
 * Accepts ?project=<type> so service cards can arrive with the project
 * type already chosen. The value is checked against the known list —
 * an unknown one is ignored rather than injected into the form.
 */
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ project?: string }>;
}) {
  const { project } = await searchParams;
  const preselected =
    project && (projectTypes as readonly string[]).includes(project)
      ? project
      : "";

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="surface-glow">
          <Container className="relative z-10 pt-16 pb-[var(--space-section-y)] lg:pt-24">
            <div className="max-w-[46rem]">
              <h1 className="text-[clamp(2.05rem,1.1rem+2.7vw,2.7rem)]! leading-[1.1]!">
                Let&apos;s Build Something Useful.
              </h1>
              <p className="mt-6 text-lg text-ink-soft">
                Tell us about your idea, research problem or business challenge.
              </p>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.75fr)] lg:gap-12">
              <ContactForm defaultProjectType={preselected} />

              <aside aria-labelledby="contact-other">
                <div className="card h-fit p-6">
                  <div className="relative z-10">
                    <h2
                      id="contact-other"
                      className="text-lg! font-semibold"
                    >
                      Other ways to reach us
                    </h2>
                    <p className="mt-2 text-sm text-muted">
                      These channels are being set up. The form above is the
                      fastest route in the meantime.
                    </p>
                    <ul className="mt-6 space-y-5">
                      {contactChannels.map((channel) => (
                        <Channel key={channel.id} channel={channel} />
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="card mt-5 p-6">
                  <div className="relative z-10">
                    <h2 className="text-lg! font-semibold">
                      What happens next
                    </h2>
                    <ol className="mt-4 space-y-3 text-sm text-ink-soft">
                      <li className="flex gap-3">
                        <span className="text-cyan" aria-hidden="true">
                          1
                        </span>
                        We read your enquiry and come back with questions if
                        anything is unclear.
                      </li>
                      <li className="flex gap-3">
                        <span className="text-cyan" aria-hidden="true">
                          2
                        </span>
                        A short call to work out whether we&apos;re the right
                        fit for the problem.
                      </li>
                      <li className="flex gap-3">
                        <span className="text-cyan" aria-hidden="true">
                          3
                        </span>
                        If we are, a written scope with a clear first
                        deliverable.
                      </li>
                    </ol>
                  </div>
                </div>
              </aside>
            </div>
          </Container>
        </div>
      </main>
      <Footer />
    </>
  );
}
