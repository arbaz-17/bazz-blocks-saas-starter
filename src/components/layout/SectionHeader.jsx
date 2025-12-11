"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeIn,defaultMotionProps,staggerContainer,fadeInUp } from "@/lib/motion";
/**
 * SectionHeader
 *
 * Shared heading block for marketing sections.
 *
 * Props:
 * - eyebrow?: string                → small label above the title
 * - title?: string                  → main heading text
 * - subtitle?: string               → supporting description
 * - align?: "left" | "center" | "right"  → text alignment (default: "left")
 * - className?: string              → extra classes on the wrapper
 * - as?: keyof JSX.IntrinsicElements → heading tag, e.g. "h2" | "h3" (default: "h2")
 * - animateIn?: boolean             → fade-in on scroll using motion (default: false)
 */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
  as = "h2",
  animateIn = false,
}) {
  const Tag = as;

  const alignClasses =
    align === "center"
      ? "items-center text-center"
      : align === "right"
      ? "items-end text-right"
      : "items-start text-left";

  const Wrapper = animateIn ? motion.div : "div";

  return (
    <Wrapper
      className={cn(
        "flex flex-col gap-2",
        alignClasses,
        className
      )}
      {...(animateIn ? { variants: fadeIn, ...defaultMotionProps } : {})}
    >
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-wide text-primary/80">
          {eyebrow}
        </p>
      ) : null}

      {title ? (
        <Tag className="text-2xl md:text-3xl font-semibold tracking-tight">
          {title}
        </Tag>
      ) : null}

      {subtitle ? (
        <p className="max-w-2xl text-sm sm:text-base text-muted-foreground">
          {subtitle}
        </p>
      ) : null}
    </Wrapper>
  );
}
