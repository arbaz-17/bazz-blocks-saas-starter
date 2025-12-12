// src/components/dashboard/layout/PageSection.jsx
import { cn } from "@/lib/utils";

/**
 * PageSection (Base)
 * Variants:
 * - "card" (default)
 * - "ghost" (spacing only)
 */
export function PageSection({
  as: Component = "section",
  id,
  variant = "card", // "card" | "ghost"
  className,
  children,
  ...props
}) {
  const styles =
    variant === "ghost"
      ? "w-full"
      : "w-full bg-card text-card-foreground border border-border rounded-xl shadow-sm";

  const padding = variant === "ghost" ? "py-4 sm:py-6" : "p-4 sm:p-6";

  return (
    <Component
      id={id}
      className={cn(styles, padding, className)}
      {...props}
    >
      {children}
    </Component>
  );
}
