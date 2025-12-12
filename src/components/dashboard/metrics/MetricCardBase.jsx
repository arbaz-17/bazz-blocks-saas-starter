
"use client";

import React from "react";
import { Info, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

/**
 * MetricCardBase
 * - Simple KPI card (title/icon + value + optional delta + optional tooltip)
 * - rightSlot lets you plug a small control (menu, refresh button, etc.)
 */
export function MetricCardBase({
  title,
  icon,
  description,

  value,
  prefix,
  suffix,

  delta, // string | number
  deltaLabel,
  deltaDirection, // "up" | "down" | "neutral" (optional)

  rightSlot,
  className,
}) {
  const hasDelta = delta !== undefined && delta !== null && delta !== "";

  const resolvedDirection = (() => {
    if (deltaDirection) return deltaDirection;
    if (typeof delta === "number") {
      if (delta > 0) return "up";
      if (delta < 0) return "down";
      return "neutral";
    }
    return "neutral";
  })();

  let DeltaIcon = Minus;
  let deltaClasses = "text-muted-foreground";

  if (resolvedDirection === "up") {
    DeltaIcon = ArrowUpRight;
    deltaClasses = "text-emerald-600 dark:text-emerald-400";
  } else if (resolvedDirection === "down") {
    DeltaIcon = ArrowDownRight;
    deltaClasses = "text-rose-600 dark:text-rose-400";
  }

  return (
    <Card
      className={cn(
        "h-full rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Left content */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            {icon ? (
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-background/60 text-primary shadow-sm">
                {icon}
              </span>
            ) : null}

            {title ? (
              <p className="text-sm font-medium text-muted-foreground">
                {title}
              </p>
            ) : null}

            {description ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 p-0 text-muted-foreground hover:text-foreground"
                  >
                    <Info className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="sr-only">More info</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" align="start">
                  <p className="max-w-xs text-xs leading-snug">{description}</p>
                </TooltipContent>
              </Tooltip>
            ) : null}
          </div>

          <div className="flex items-baseline gap-1">
            {prefix ? (
              <span className="text-sm font-medium text-muted-foreground">
                {prefix}
              </span>
            ) : null}

            <span className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {value}
            </span>

            {suffix ? (
              <span className="text-sm font-medium text-muted-foreground">
                {suffix}
              </span>
            ) : null}
          </div>

          {hasDelta ? (
            <div className={cn("inline-flex items-center gap-1 text-xs font-medium", deltaClasses)}>
              <DeltaIcon className="h-3 w-3" aria-hidden="true" />
              <span>{delta}</span>
              {deltaLabel ? (
                <span className="text-[11px] font-normal text-muted-foreground">
                  {deltaLabel}
                </span>
              ) : null}
            </div>
          ) : null}
        </div>

        {/* Right slot */}
        {rightSlot ? <div className="shrink-0">{rightSlot}</div> : null}
      </div>
    </Card>
  );
}
