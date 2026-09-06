import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "neutral" | "cyan" | "violet";
};

const toneClass = {
  neutral: "badge-neutral",
  cyan: "badge-cyan",
  violet: "badge-violet",
};

/**
 * Small categorical label — e.g. a content type ("Case study",
 * "Research") or a status. Use where it conveys real category
 * information, not as decoration above every heading.
 */
export function Badge({ tone = "neutral", className, children, ...props }: BadgeProps) {
  return (
    <span className={cn("badge", toneClass[tone], className)} {...props}>
      {children}
    </span>
  );
}
