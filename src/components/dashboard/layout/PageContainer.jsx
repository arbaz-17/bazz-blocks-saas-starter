// src/components/dashboard/layout/PageContainer.jsx
import { cn } from "@/lib/utils";

/**
 * PageContainer (Base)
 * - Wraps the main content area
 * - Handles responsive padding + max-width
 */
export function PageContainer({
  as: Component = "main",
  maxWidth = "max-w-6xl",
  padded = true,
  className,
  children,
  ...props
}) {
  return (
    <Component
      className={cn(
        "w-full mx-auto",
        padded && "px-2 sm:px-4 lg:px-6 py-3 sm:py-5",
        maxWidth,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
