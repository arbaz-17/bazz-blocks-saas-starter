
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { staggerContainer,defaultMotionProps } from "@/lib/motion";

/**
 * SectionWrapper
 *
 * A reusable layout shell for marketing / dashboard sections.
 *
 * Responsibilities:
 * - Handles outer spacing & width via .page-section + .section-inner
 * - Provides an optional in-view animation (staggered container)
 * - Exposes basic layout customization via props
 *
 * Props:
 * - id?: string               → anchor (e.g. "pricing", "features")
 * - className?: string        → extra classes on the outer wrapper
 * - maxWidth?: string         → override max width (Tailwind class). Default: "max-w-6xl"
 * - padded?: boolean          → apply standard vertical padding. Default: true
 * - animateIn?: boolean       → enable Framer Motion on scroll into view
 * - as?: keyof JSX.IntrinsicElements → underlying tag, defaults to "section"
 * - children: React.ReactNode
 */
export function SectionWrapper({
  id,
  className,
  maxWidth = "max-w-6xl",
  padded = true,
  animateIn = false,
  as = "section",
  children,
}) {
  // Choose the underlying element
  const Tag = as;
  const MotionTag = motion[as];

  const outerClasses = cn(
    padded ? "page-section" : "w-full",
    className
  );

  const innerClasses = cn("section-inner", maxWidth);

  // Animated version
  if (animateIn) {
    return (
      <MotionTag
        id={id}
        className={outerClasses}
        variants={staggerContainer}
        {...defaultMotionProps}
      >
        <div className={innerClasses}>{children}</div>
      </MotionTag>
    );
  }

  // Static version
  return (
    <Tag id={id} className={outerClasses}>
      <div className={innerClasses}>{children}</div>
    </Tag>
  );
}
