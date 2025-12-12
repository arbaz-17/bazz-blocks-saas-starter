// src/components/analytics/MetricGridBase.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0, y: 4 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.06, duration: 0.18, ease: "easeOut" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
};

// Tailwind-safe presets (no dynamic grid-cols strings)
const GRID_PRESETS = {
  kpi: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  compact: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  wide: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

/**
 * MetricGridBase
 * - Layout-only KPI grid with optional stagger animation.
 *
 * Props:
 * - preset?: "kpi" | "compact" | "wide"
 * - gap?: string (tailwind gap classes)
 * - animateIn?: boolean
 */
export function MetricGridBase({
  preset = "kpi",
  gap = "gap-4 sm:gap-5",
  animateIn = true,
  className,
  children,
  ...props
}) {
  const gridClassName = cn(
    "grid",
    GRID_PRESETS[preset] || GRID_PRESETS.kpi,
    gap,
    className
  );

  if (!animateIn) {
    return (
      <div className={gridClassName} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={gridClassName}
      variants={containerVariants}
      initial="hidden"
      animate="show"
      {...props}
    >
      {React.Children.map(children, (child, index) =>
        child == null ? null : (
          <motion.div
            key={child.key ?? index}
            variants={itemVariants}
            className="h-full"
          >
            {child}
          </motion.div>
        )
      )}
    </motion.div>
  );
}
