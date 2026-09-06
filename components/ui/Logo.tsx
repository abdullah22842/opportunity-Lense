import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  markOnly?: boolean;
};

/**
 * Wordmark + lens mark. The mark (ring + focused gradient dot) is the
 * one recurring visual motif for the brand — keep it out of general
 * decorative use elsewhere on the site.
 */
export function Logo({ className, markOnly = false }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.6" />
        <defs>
          <linearGradient id="ol-logo-dot" x1="6" y1="6" x2="16" y2="16">
            <stop offset="0%" stopColor="var(--color-cyan)" />
            <stop offset="100%" stopColor="var(--color-violet)" />
          </linearGradient>
        </defs>
        <circle cx="11" cy="11" r="2.5" fill="url(#ol-logo-dot)" />
      </svg>
      {!markOnly && (
        <span className="font-display text-[1.05rem] leading-none">
          Opportunity Lens
        </span>
      )}
    </span>
  );
}
