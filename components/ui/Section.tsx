import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  containerClassName?: string;
  /** Set false for sections that need a bleed-to-edge layout. */
  contained?: boolean;
};

/**
 * Wraps a <section> with the site's standard vertical rhythm and,
 * by default, the shared Container. Section-specific background or
 * border treatments are passed via className.
 */
export function Section({
  className,
  containerClassName,
  contained = true,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("py-[var(--space-section-y)]", className)}
      {...props}
    >
      {contained ? (
        <Container className={containerClassName}>{children}</Container>
      ) : (
        children
      )}
    </section>
  );
}
