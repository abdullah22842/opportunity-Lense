import Link from "next/link";
import { Container } from "@/components/ui/Container";
import {
  footerBlurb,
  footerLinks,
  footerTagline,
  siteConfig,
  socialLinks,
} from "@/data/site";

/**
 * Site footer.
 *
 * Social entries with a null `href` render as plain text rather than
 * links — see `socialLinks` in /data/site.ts. No contact details or
 * profile URLs are hard-coded here; add them to the data file once they
 * exist.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bg-elevated">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <circle
                  cx="11"
                  cy="11"
                  r="8"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="text-line-strong"
                />
                <defs>
                  <linearGradient id="ol-footer-dot" x1="6" y1="6" x2="16" y2="16">
                    <stop offset="0%" stopColor="var(--color-cyan)" />
                    <stop offset="100%" stopColor="var(--color-violet)" />
                  </linearGradient>
                </defs>
                <circle cx="11" cy="11" r="2.5" fill="url(#ol-footer-dot)" />
              </svg>
              <span className="font-display text-[1rem] leading-none">
                {siteConfig.name}
              </span>
            </div>
            <p className="mt-3 text-sm text-muted">{footerTagline}</p>
            <p className="mt-4 max-w-[34ch] text-sm text-ink-soft">
              {footerBlurb}
            </p>
          </div>

          {/* Navigation */}
          <nav aria-labelledby="footer-nav-heading">
            <h2
              id="footer-nav-heading"
              className="text-sm! font-semibold text-ink"
            >
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-soft transition-colors duration-[var(--duration-fast)] hover:text-cyan"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <div>
            <h2 className="text-sm! font-semibold text-ink">Elsewhere</h2>
            <ul className="mt-4 space-y-2.5">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  {social.href ? (
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-ink-soft transition-colors duration-[var(--duration-fast)] hover:text-cyan"
                    >
                      {social.label}
                    </a>
                  ) : (
                    <span className="text-sm text-muted">
                      {social.label}
                      <span className="sr-only"> — profile coming soon</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-6">
          <p className="text-sm text-muted" suppressHydrationWarning>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
