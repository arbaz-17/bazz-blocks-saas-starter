// src/components/analytics/charts/ChartGridBase.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const PRESETS = {
  // good defaults for dashboards
  default: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
  twoCol: "grid-cols-1 md:grid-cols-2",
  oneCol: "grid-cols-1",
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.18, ease: "easeOut" } },
};

export function ChartGridBase({
  preset = "default",
  gap = "gap-4 md:gap-5",
  animateIn = true,
  className,
  children,
  ...props
}) {
  const items = React.Children.toArray(children).filter(Boolean);

  const gridClass = cn("grid", PRESETS[preset] || PRESETS.default, gap, className);

  if (!animateIn) {
    return (
      <div className={gridClass} {...props}>
        {items}
      </div>
    );
  }

  return (
    <motion.div
      className={gridClass}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
      {...props}
    >
      {items.map((child, index) => (
        <motion.div key={child.key ?? index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
