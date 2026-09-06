import { cn } from "@/lib/utils";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: React.ElementType;
};

/**
 * Consistent max-width + gutter wrapper used by every section.
 * Centralising this means the site-wide measure can change in one place.
 */
export function Container({
  as: Tag = "div",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-[var(--container-max)] px-6 sm:px-8 lg:px-10",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
