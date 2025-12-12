
"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeader } from "@/components/layout/SectionHeader";

const stepVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 0.61, 0.36, 1] },
  },
};

/**
 * StepsBase – simple vertical "how it works" / journey timeline.
 *
 * Props:
 * - id?: string
 * - eyebrow?: string
 * - title?: string
 * - subtitle?: string
 * - align?: "left" | "center" | "right"
 * - maxWidth?: string
 * - className?: string
 * - animateIn?: boolean
 * - stepsAlign?: "left" | "center"
 * - steps: {
 *     step?: number | string;
 *     title: string;
 *     description?: string;
 *     eyebrow?: string;
 *     meta?: string;
 *     highlight?: boolean;
 *   }[]
 */
export function StepsBase({
  id,
  eyebrow,
  title,
  subtitle,
  align = "left",
  maxWidth,
  className,
  animateIn = true,
  stepsAlign = "left",
  steps = [],
}) {
  if (!steps.length) {
    return (
      <SectionWrapper id={id} className={className} maxWidth={maxWidth}>
        {(eyebrow || title || subtitle) && (
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            subtitle={subtitle}
            align={align}
          />
        )}
      </SectionWrapper>
    );
  }

  const MotionStep = animateIn ? motion.li : "li";

  const stepsWrapperClasses = cn(
    "relative space-y-6 md:space-y-8",
    stepsAlign === "center" && "md:mx-auto md:max-w-3xl"
  );

  return (
    <SectionWrapper id={id} className={className} maxWidth={maxWidth}>
      {(eyebrow || title || subtitle) && (
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          align={align}
          className="mb-8 md:mb-10"
        />
      )}

      <ol className={stepsWrapperClasses}>
        {steps.map((stepItem, index) => {
          const {
            step,
            title: stepTitle,
            description,
            eyebrow: stepEyebrow,
            meta,
            highlight,
          } = stepItem;

          const isLast = index === steps.length - 1;
          const displayStep = step ?? index + 1;
          const key = `${displayStep}-${stepTitle || "step"}`;

          const motionProps = animateIn
            ? {
                variants: stepVariants,
                initial: "hidden",
                whileInView: "show",
                viewport: { once: true, amount: 0.2 },
                transition: {
                  duration: 0.3,
                  delay: index * 0.06,
                },
              }
            : {};

          const cardClasses = cn(
            "flex-1 rounded-xl border bg-card/80 p-4 sm:p-5 md:p-6 shadow-sm",
            "transition-transform transition-shadow duration-200",
            "hover:-translate-y-[1px] hover:shadow-md",
            highlight && "border-primary/50 bg-primary/5 shadow-sm"
          );

          const stepCircleClasses = cn(
            "flex h-9 w-9 items-center justify-center rounded-full border text-xs font-semibold",
            highlight
              ? "border-primary bg-primary text-primary-foreground shadow-sm"
              : "border-border bg-background text-muted-foreground"
          );

          return (
            <MotionStep
              key={key}
              {...motionProps}
              className={cn("relative flex gap-4 md:gap-6")}
            >
              {/* Timeline column */}
              <div className="relative flex flex-col items-center">
                <div className={stepCircleClasses}>
                  <span>{displayStep}</span>
                </div>

                {!isLast && (
                  <div className="mt-1 flex-1">
                    <div className="mx-auto h-full w-px bg-border/70" />
                  </div>
                )}
              </div>

              {/* Content card */}
              <div className="flex-1">
                <div className={cardClasses}>
                  <div className="flex flex-col gap-2">
                    {stepEyebrow && (
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">
                        {stepEyebrow}
                      </p>
                    )}

                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      {stepTitle && (
                        <h3 className="text-sm font-semibold tracking-tight text-foreground sm:text-base md:text-lg">
                          {stepTitle}
                        </h3>
                      )}
                      {meta && (
                        <span className="text-xs text-muted-foreground">
                          {meta}
                        </span>
                      )}
                    </div>

                    {description && (
                      <p className="text-xs text-muted-foreground sm:text-sm">
                        {description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </MotionStep>
          );
        })}
      </ol>
    </SectionWrapper>
  );
}
