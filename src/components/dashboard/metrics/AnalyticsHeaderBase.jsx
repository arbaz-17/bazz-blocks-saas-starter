// src/components/analytics/AnalyticsHeaderBase.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * AnalyticsHeaderBase
 * - Eyebrow + Title + Subtitle
 * - Right slot for controls (date range, export, refresh, etc.)
 * - Bottom slot for filters/segments (optional)
 */
export function AnalyticsHeaderBase({
  id,
  eyebrow,
  title,
  subtitle,
  align = "left",
  rightSlot,
  bottomSlot,
  animateIn = true,
  className,
  ...props
}) {
  const textAlign =
    align === "center"
      ? "text-center items-center"
      : align === "right"
      ? "text-right items-end"
      : "text-left items-start";

  const Wrapper = animateIn ? motion.header : "header";
  const wrapperProps = animateIn
    ? {
        initial: { opacity: 0, y: 6 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.22, ease: "easeOut" },
      }
    : {};

  return (
    <Wrapper
      id={id}
      className={cn("flex flex-col gap-3", className)}
      {...wrapperProps}
      {...props}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className={cn("flex flex-col gap-1", textAlign)}>
          {eyebrow ? (
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              {eyebrow}
            </p>
          ) : null}

          {title ? (
            <h2 className="text-lg font-semibold leading-tight md:text-xl">
              {title}
            </h2>
          ) : null}

          {subtitle ? (
            <p className="max-w-2xl text-xs text-muted-foreground md:text-sm">
              {subtitle}
            </p>
          ) : null}
        </div>

        {rightSlot ? (
          <div className="flex flex-wrap items-center justify-start gap-2 md:justify-end">
            {rightSlot}
          </div>
        ) : null}
      </div>

      {bottomSlot ? (
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          {bottomSlot}
        </div>
      ) : null}
    </Wrapper>
  );
}
