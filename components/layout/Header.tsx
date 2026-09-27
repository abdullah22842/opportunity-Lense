"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { brandDescriptor, navLinks, primaryCta, siteConfig } from "@/data/site";

/**
 * Sticky site header.
 *
 * Sits transparent over the hero and gains an elevated background plus a
 * hairline rule once the page scrolls, so the hero visual reads cleanly
 * at rest but the nav stays legible over content further down.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll and wire Escape while the mobile panel is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Anchor links (/#services) all live on the homepage; only mark a plain
  // route as current. Highlighting by scroll position is a separate concern.
  const isActive = (href: string) => {
    if (href.includes("#")) return false;
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter]",
        "duration-[var(--duration-base)] ease-[var(--ease-standard)]",
        scrolled
          ? "border-b border-line bg-bg-elevated/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container className="flex h-[4.5rem] items-center justify-between gap-3 sm:gap-6">
        {/* Brand lockup */}
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-2.5 sm:gap-3"
          aria-label={`${siteConfig.name} — home`}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 22 22"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
          >
            <circle
              cx="11"
              cy="11"
              r="8"
              stroke="currentColor"
              strokeWidth="1.6"
              className="text-line-strong transition-colors duration-[var(--duration-base)] group-hover:text-cyan"
            />
            <defs>
              <linearGradient id="ol-header-dot" x1="6" y1="6" x2="16" y2="16">
                <stop offset="0%" stopColor="var(--color-cyan)" />
                <stop offset="100%" stopColor="var(--color-violet)" />
              </linearGradient>
            </defs>
            <circle cx="11" cy="11" r="2.5" fill="url(#ol-header-dot)" />
          </svg>

          <span className="flex flex-col leading-none">
            <span className="font-display whitespace-nowrap text-[0.7rem] tracking-[0.02em] xs:text-[0.9rem] sm:text-[1.05rem]">
              OPPORTUNITY LENS
            </span>
            <span className="mt-1.5 whitespace-nowrap text-[0.5rem] tracking-[0.16em] text-muted xs:text-[0.55rem] sm:text-[0.65rem] sm:tracking-[0.22em]">
              {brandDescriptor}
            </span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav
          className="hidden items-center gap-0.5 xl:flex"
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "relative rounded-[var(--radius-sm)] px-2.5 py-2 text-sm transition-colors",
                "duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
                isActive(link.href)
                  ? "text-ink"
                  : "text-ink-soft hover:text-ink"
              )}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-x-2.5 -bottom-px h-px bg-cyan"
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                  }
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden xl:block">
            <Button href={primaryCta.href} size="sm">
              {primaryCta.label}
              <ArrowRight className="size-4" />
            </Button>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className={cn(
              "inline-flex size-11 items-center justify-center rounded-[var(--radius-sm)] xl:hidden",
              "border border-line text-ink-soft transition-colors duration-[var(--duration-fast)]",
              "hover:border-line-strong hover:text-ink"
            )}
          >
            <AnimatePresence initial={false} mode="wait">
              {open ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: reduceMotion ? 0 : 0.18 }}
                  className="flex"
                >
                  <X className="size-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: reduceMotion ? 0 : 0.18 }}
                  className="flex"
                >
                  <Menu className="size-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </Container>

      {/* Mobile panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            key="panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="fixed inset-x-0 top-[4.5rem] bottom-0 z-40 overflow-y-auto border-t border-line bg-bg xl:hidden"
          >
            <Container className="flex min-h-full flex-col py-8">
              <nav aria-label="Mobile" className="flex flex-col">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.4,
                      delay: reduceMotion ? 0 : 0.04 + i * 0.045,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={cn(
                        "flex items-baseline justify-between border-b border-line py-5",
                        "font-display text-2xl transition-colors duration-[var(--duration-fast)]",
                        isActive(link.href)
                          ? "text-cyan"
                          : "text-ink hover:text-cyan"
                      )}
                    >
                      {link.label}
                      <ArrowRight className="size-4 shrink-0 self-center text-muted" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.4,
                  delay: reduceMotion ? 0 : 0.04 + navLinks.length * 0.045,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-10"
              >
                <Button href={primaryCta.href} className="w-full">
                  {primaryCta.label}
                  <ArrowRight className="size-4" />
                </Button>
                {siteConfig.contact.email && (
                  <p className="mt-6 text-sm text-muted">
                    {siteConfig.contact.email}
                  </p>
                )}
              </motion.div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
