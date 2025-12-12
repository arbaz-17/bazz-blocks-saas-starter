
"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  ChartLoadingStateBase,
  ChartEmptyStateBase,
  ChartErrorStateBase,
} from "./ChartStatesBase";

const HEIGHT = {
  sm: "h-[220px]",
  md: "h-[280px]",
  lg: "h-[340px]",
};

export function ChartCardBase({
  eyebrow,
  title,
  description,
  headerIcon,
  headerActions,
  toolbar,

  status = "idle", // "idle" | "loading" | "empty" | "error"
  emptyMessage,
  errorMessage,
  onRetry,

  minHeight = "md",
  animateIn = true,
  className,
  bodyClassName,
  children,
  ...props
}) {
  const Wrapper = animateIn ? motion.div : "div";
  const wrapperProps = animateIn
    ? {
        initial: { opacity: 0, y: 6 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.22, ease: "easeOut" },
      }
    : {};

  const showChart = status === "idle" || !status;

  return (
    <Wrapper {...wrapperProps}>
      <Card
        className={cn(
          "flex flex-col rounded-xl border border-border bg-card text-card-foreground shadow-sm",
          className
        )}
        {...props}
      >
        {(eyebrow || title || description || headerIcon || headerActions) && (
          <div className="flex flex-col gap-3 border-b border-border/70 px-4 py-3 sm:flex-row sm:items-start sm:justify-between sm:px-5 sm:py-4">
            <div className="flex flex-1 items-start gap-3">
              {headerIcon ? (
                <div className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  {headerIcon}
                </div>
              ) : null}

              <div className="flex flex-col gap-1">
                {eyebrow ? (
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {eyebrow}
                  </p>
                ) : null}
                {title ? (
                  <h3 className="text-sm font-semibold leading-tight sm:text-base">
                    {title}
                  </h3>
                ) : null}
                {description ? (
                  <p className="text-xs text-muted-foreground sm:text-[13px]">
                    {description}
                  </p>
                ) : null}
              </div>
            </div>

            {headerActions ? (
              <div className="mt-2 flex flex-wrap items-center justify-start gap-2 sm:mt-0 sm:justify-end">
                {headerActions}
              </div>
            ) : null}
          </div>
        )}

        {toolbar ? (
          <div className="border-b border-border/60 px-4 py-2.5 text-xs sm:px-5">
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              {toolbar}
            </div>
          </div>
        ) : null}

        <div
          className={cn(
            "relative px-3 py-3 sm:px-5 sm:py-4",
            HEIGHT[minHeight] || HEIGHT.md,
            bodyClassName
          )}
        >
          {status === "loading" ? <ChartLoadingStateBase /> : null}
          {status === "empty" ? <ChartEmptyStateBase message={emptyMessage} /> : null}
          {status === "error" ? (
            <ChartErrorStateBase message={errorMessage} onRetry={onRetry} />
          ) : null}

          {showChart ? <div className="h-full w-full">{children}</div> : null}
        </div>
      </Card>
    </Wrapper>
  );
}
