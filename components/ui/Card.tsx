import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Adds hover elevation — use for clickable/interactive cards. */
  interactive?: boolean;
  /** Faint gradient border — reserve for one or two featured cards per page. */
  featured?: boolean;
  padding?: "sm" | "md" | "lg";
};

const paddingClass = {
  sm: "p-5",
  md: "p-7",
  lg: "p-9",
};

/**
 * Base surface for grouped content: rounded corners, hairline border,
 * subtle top sheen. See styles/components.css (.card, .card-interactive,
 * .card-featured) for the underlying tokens.
 */
export function Card({
  interactive = false,
  featured = false,
  padding = "md",
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "card",
        interactive && "card-interactive",
        featured && "card-featured",
        paddingClass[padding],
        className
      )}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
