import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { navLinks } from "@/data/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/**
 * 404. Says what happened and offers the way on — an empty screen is an
 * invitation to act, not a place to apologise.
 */
export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="surface-glow">
          <Container className="relative z-10 py-[var(--space-section-y)]">
            <p className="font-display text-sm tracking-[0.14em] text-cyan">
              404
            </p>
            <h1 className="mt-4 max-w-[18ch] text-[clamp(2rem,1.2rem+2.6vw,2.7rem)]! leading-[1.1]!">
              We couldn&apos;t find that page.
            </h1>
            <p className="mt-5 max-w-[52ch] text-lg text-ink-soft">
              The link may be out of date, or the page may not exist yet. Here
              is everything currently on the site.
            </p>

            <nav aria-label="Site sections" className="mt-8">
              <ul className="flex flex-wrap gap-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex rounded-[var(--radius-full)] border border-line bg-surface-2 px-3.5 py-1.5 text-sm text-ink-soft transition-colors duration-[var(--duration-fast)] hover:border-cyan/40 hover:text-cyan"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-10">
              <Button href="/">
                Back to home
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </Container>
        </div>
      </main>
      <Footer />
    </>
  );
}
