// src/components/marketing/stats/StatsRowBase.jsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeader } from "@/components/layout/SectionHeader";

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

function StatNumber({
  value = 0,
  prefix,
  suffix,
  decimals = 0,
  animateValues = true,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!animateValues) return;

    const unsubscribe = motionValue.on("change", (latest) => {
      setDisplayValue(latest);
    });

    return () => unsubscribe();
  }, [motionValue, animateValues]);

  useEffect(() => {
    if (!animateValues) return;
    if (!isInView) return;

    const controls = animate(motionValue, value, {
      duration: 1.4,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [isInView, value, animateValues, motionValue]);

  const currentValue = animateValues ? displayValue : value;

  const formatted =
    typeof currentValue === "number"
      ? currentValue.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : currentValue;

  return (
    <span
      ref={ref}
      className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary"
    >
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

function StatCard({ stat, cardAlign = "left", animateValues }) {
  const {
    icon,
    label,
    value,
    prefix,
    suffix,
    decimals,
    description,
    highlight,
  } = stat;

  const alignClasses =
    cardAlign === "center"
      ? "items-center text-center"
      : cardAlign === "right"
      ? "items-end text-right"
      : "items-start text-left";

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-2xl border bg-card/70 p-5 sm:p-6",
        "shadow-sm transition-all duration-200",
        "hover:-translate-y-1 hover:shadow-md hover:border-primary/40",
        highlight && "border-primary/50 bg-primary/5"
      )}
    >
      <div className={cn("flex flex-1 flex-col gap-3", alignClasses)}>
        {icon && (
          <div
            className={cn(
              "mb-1 flex rounded-full bg-accent/10 text-accent-foreground",
              cardAlign === "left" && "self-start",
              cardAlign === "center" && "self-center",
              cardAlign === "right" && "self-end"
            )}
          >
            <span className="p-2" aria-hidden="true">
              {icon}
            </span>
          </div>
        )}

        <StatNumber
          value={value}
          prefix={prefix}
          suffix={suffix}
          decimals={decimals}
          animateValues={animateValues}
        />

        {label && (
          <h3 className="text-sm sm:text-[15px] font-medium text-foreground">
            {label}
          </h3>
        )}

        {description && (
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </article>
  );
}

/**
 * StatsRowBase
 *
 * Simple KPI row with animated numbers.
 * Each stat is a small config object; the layout and styling are handled for you.
 */
export function StatsRowBase({
  id,
  eyebrow,
  title,
  subtitle,
  align = "left",
  maxWidth = "max-w-5xl",
  className,
  stats = [],
  cardAlign = "left",
  animateIn = true,
  animateValues = true,
}) {
  if (!stats.length) return null;

  const content = (
    <div className={cn("mx-auto w-full", maxWidth)}>
      {(eyebrow || title || subtitle) && (
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          align={align}
          className="mb-8"
        />
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {stats.map((stat, index) => {
          const key = stat.id || stat.label || index;

          if (!animateIn) {
            return (
              <StatCard
                key={key}
                stat={stat}
                cardAlign={cardAlign}
                animateValues={animateValues}
              />
            );
          }

          return (
            <motion.div key={key} variants={cardVariants}>
              <StatCard
                stat={stat}
                cardAlign={cardAlign}
                animateValues={animateValues}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  if (!animateIn) {
    return (
      <SectionWrapper id={id} className={className}>
        {content}
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id={id} className={className}>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {content}
      </motion.div>
    </SectionWrapper>
  );
}
