// src/components/marketing/pricing/PricingBase.jsx
"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeader } from "@/components/layout/SectionHeader";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 0.61, 0.36, 1] },
  },
};

/**
 * PricingBase – simple 2–3 plan pricing grid.
 *
 * Plan shape:
 * {
 *   id: string;
 *   badge?: string;
 *   title: string;
 *   price: string;
 *   priceSuffix?: string;
 *   discountLabel?: string;
 *   description?: string;
 *   emphasis?: string;
 *   features?: string[];
 *   ctaLabel: string;
 *   ctaHref: string;
 *   featured?: boolean;          // visually emphasized card
 *   highlightLabel?: string;     // e.g. "Most popular"
 * }
 */
export function PricingBase({
  id,
  eyebrow,
  title,
  subtitle,
  align = "center",
  maxWidth = "max-w-6xl",
  className,
  plans = [],
  note,
  animateIn = true,
}) {
  if (!plans.length) return null;

  const MotionContainer = animateIn ? motion.div : "div";
  const MotionCard = animateIn ? motion.div : "div";

  const alignmentClass =
    align === "left"
      ? "text-left"
      : align === "right"
      ? "text-right"
      : "text-center";

  const noteAlignClass =
    align === "left"
      ? "text-left"
      : align === "right"
      ? "text-right"
      : "text-center";

  const gridColsClass =
    plans.length === 2
      ? "md:grid-cols-2"
      : "md:grid-cols-2 lg:grid-cols-3";

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

      <MotionContainer
        {...(animateIn && {
          variants: containerVariants,
          initial: "hidden",
          whileInView: "show",
          viewport: { once: true, amount: 0.2 },
        })}
        className={cn(
          "mt-10 grid grid-cols-1 gap-6",
          gridColsClass
        )}
      >
        {plans.map((plan) => {
          const {
            id: planId,
            badge,
            title: planTitle,
            price,
            priceSuffix,
            discountLabel,
            description,
            emphasis,
            features = [],
            ctaLabel,
            ctaHref,
            featured,
            highlightLabel,
          } = plan || {};

          const isFeatured = Boolean(featured);

          const baseCardClasses =
            "relative flex h-full flex-col rounded-2xl border bg-card p-6 sm:p-8 shadow-sm " +
            "transition-transform duration-200 hover:-translate-y-1 hover:shadow-md";

          const featuredClasses =
            "border-primary/70 bg-primary/5 ring-1 ring-primary/40 " +
            "md:scale-[1.03] lg:scale-[1.05] md:z-10 md:shadow-lg";

          const cardClasses = cn(
            baseCardClasses,
            isFeatured && featuredClasses
          );

          return (
            <MotionCard
              key={planId || planTitle}
              {...(animateIn && { variants: cardVariants })}
              className={cardClasses}
            >
              {/* Top section: badge, price, subtitle, CTA */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-3">
                  {badge && (
                    <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                      {badge}
                    </span>
                  )}

                  {isFeatured && (
                    <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
                      {highlightLabel || "Most popular"}
                    </span>
                  )}
                </div>

                {planTitle && (
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {planTitle}
                  </h3>
                )}

                {(price || priceSuffix) && (
                  <div className="flex flex-wrap items-baseline gap-2">
                    {price && (
                      <span className="text-3xl font-semibold leading-none tracking-tight">
                        {price}
                      </span>
                    )}
                    {priceSuffix && (
                      <span className="text-sm text-muted-foreground">
                        {priceSuffix}
                      </span>
                    )}
                  </div>
                )}

                {discountLabel && (
                  <span className="inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary">
                    {discountLabel}
                  </span>
                )}

                {description && (
                  <p className="text-sm text-muted-foreground">
                    {description}
                  </p>
                )}

                {ctaLabel && ctaHref && (
                  <div className="mt-2">
                    <Button
                      asChild
                      className={cn(
                        "w-full justify-center",
                        isFeatured && "bg-primary text-primary-foreground"
                      )}
                    >
                      <Link href={ctaHref}>{ctaLabel}</Link>
                    </Button>
                  </div>
                )}
              </div>

              <div className="my-5 h-px w-full bg-border/70" />

              {/* Bottom section: emphasis + features */}
              <div className="flex flex-1 flex-col gap-4 text-sm">
                {emphasis && (
                  <p className="font-semibold text-foreground">
                    {emphasis}
                  </p>
                )}

                {features && features.length > 0 && (
                  <ul className="mt-1 space-y-2">
                    {features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2"
                      >
                        <span className="mt-[2px] flex h-4 w-4 items-center justify-center rounded-full bg-primary/10">
                          <Check
                            className="h-3 w-3 text-primary"
                            aria-hidden="true"
                            strokeWidth={2.5}
                          />
                        </span>
                        <span className="text-sm leading-snug text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </MotionCard>
          );
        })}
      </MotionContainer>

      {note && (
        <p
          className={cn(
            "mt-8 text-xs sm:text-sm text-muted-foreground",
            noteAlignClass
          )}
        >
          {note}
        </p>
      )}
    </SectionWrapper>
  );
}
