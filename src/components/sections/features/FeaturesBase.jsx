// src/components/marketing/features/FeaturesBase.jsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeader } from "@/components/layout/SectionHeader";

const containerVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 0.61, 0.36, 1],
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
};

export function FeaturesBase({
  id,
  eyebrow,
  title,
  subtitle,
  align = "left",
  maxWidth,
  className,
  animateIn = true,
  layout = "columns",
  features = [],
}) {
  if (!features.length) return null;

  const MotionContainer = animateIn ? motion.div : "div";
  const MotionCard = animateIn ? motion.article : "article";

  const containerMotionProps = animateIn
    ? {
        variants: containerVariants,
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, amount: 0.2 },
      }
    : {};

  return (
    <SectionWrapper id={id} className={className} maxWidth={maxWidth}>
      {(eyebrow || title || subtitle) && (
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          align={align}
          className="mb-10 md:mb-14"
        />
      )}

      <MotionContainer
        {...containerMotionProps}
        className="flex flex-col gap-8 md:gap-10"
      >
        {features.map((feature, index) => {
          const featureLayout = feature.layout || layout;
          const isStacked = featureLayout === "stacked";
          const mediaSide = feature.mediaSide || "right";

          const key = `${feature.title ?? "feature"}-${index}`;

          const contentAlignClasses = cn(
            "flex w-full flex-col gap-4 md:gap-5",
            "items-center text-center",
            !isStacked && align === "left" && "md:items-start md:text-left",
            !isStacked && align === "center" && "md:items-center md:text-center",
            !isStacked && align === "right" && "md:items-end md:text-right"
          );

          const actionsAlignClasses = cn(
            "mt-4 flex flex-wrap gap-3",
            "justify-center",
            !isStacked && align === "left" && "md:justify-start",
            !isStacked && align === "center" && "md:justify-center",
            !isStacked && align === "right" && "md:justify-end"
          );

          const cardClasses =
            "relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8 md:p-10 shadow-sm";

          const ContentBlock = (
            <div className={contentAlignClasses}>
              {feature.badge && (
                <span className="inline-flex items-center rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground">
                  {feature.badge}
                </span>
              )}

              {feature.eyebrow && (
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {feature.eyebrow}
                </p>
              )}

              {feature.title && (
                <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  {feature.title}
                </h3>
              )}

              {feature.description && (
                <p className="max-w-prose text-sm text-muted-foreground sm:text-base">
                  {feature.description}
                </p>
              )}

              {feature.cta && feature.cta.label && feature.cta.href && (
                <div className={actionsAlignClasses}>
                  <Button asChild size="sm">
                    <Link href={feature.cta.href}>{feature.cta.label}</Link>
                  </Button>
                </div>
              )}
            </div>
          );

          const MediaBlock = (
            <div className="flex w-full justify-center">
              <FeatureImage
                image={feature.image}
                fallbackAlt={feature.title || "Feature illustration"}
              />
            </div>
          );

          return (
            <MotionCard
              key={key}
              className={cardClasses}
              {...(animateIn ? { variants: cardVariants } : {})}
            >
              {isStacked ? (
                <div className="flex flex-col gap-8">
                  {ContentBlock}
                  {MediaBlock}
                </div>
              ) : (
                <div className="grid gap-8 md:grid-cols-2 md:items-center">
                  <div
                    className={cn(
                      "order-2 md:order-1",
                      mediaSide === "left" && "md:order-2"
                    )}
                  >
                    {ContentBlock}
                  </div>
                  <div
                    className={cn(
                      "order-1 md:order-2",
                      mediaSide === "left" && "md:order-1"
                    )}
                  >
                    {MediaBlock}
                  </div>
                </div>
              )}
            </MotionCard>
          );
        })}
      </MotionContainer>
    </SectionWrapper>
  );
}

function FeatureImage({ image, fallbackAlt }) {
  if (!image) {
    return (
      <div className="relative aspect-[4/3] w-full max-w-md rounded-xl border border-dashed border-border bg-muted/40" />
    );
  }

  if (typeof image === "string") {
    return (
      <div className="relative aspect-[4/3] w-full max-w-md overflow-hidden rounded-xl bg-muted">
        <Image
          src={image}
          alt={fallbackAlt}
          fill
          className="object-contain object-center"
          sizes="(min-width: 1024px) 480px, (min-width: 768px) 50vw, 100vw"
        />
      </div>
    );
  }

  const { src, alt } = image;

  return (
    <div className="relative aspect-[4/3] w-full max-w-md overflow-hidden rounded-xl bg-muted">
      <Image
        src={src}
        alt={alt || fallbackAlt}
        fill
        className="object-contain object-center"
        sizes="(min-width: 1024px) 480px, (min-width: 768px) 50vw, 100vw"
      />
    </div>
  );
}
