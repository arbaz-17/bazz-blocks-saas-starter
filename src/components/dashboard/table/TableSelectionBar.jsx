
"use client";

import React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function TableSelectionBar({
  count,
  selectedCount,
  label = "selected",
  onClear,
  actions,
  variant = "inline",
  className,
}) {
  const resolvedCount = typeof count === "number" ? count : selectedCount;
  if (!resolvedCount || resolvedCount <= 0) return null;

  const baseClasses = "flex items-center justify-between gap-3 text-xs sm:text-sm";
  const variantClasses =
    variant === "floating"
      ? "fixed inset-x-4 bottom-4 z-40 rounded-full border border-border bg-background/95 shadow-lg px-4 py-2.5 sm:inset-x-auto sm:right-8 sm:left-auto sm:min-w-[260px]"
      : "px-3 py-2 sm:px-4 sm:py-2.5 border-b border-border/60 bg-muted/60";

  return (
    <div className={cn(baseClasses, variantClasses, className)}>
      <div className="flex items-center gap-2">
        <span className="inline-flex h-6 min-w-[1.75rem] items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary tabular-nums">
          {resolvedCount}
        </span>
        <span className="text-muted-foreground">{label}</span>
      </div>

      <div className="flex items-center gap-2">
        {actions && <div className="flex items-center gap-1">{actions}</div>}
        {onClear && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
            onClick={onClear}
            aria-label="Clear selection"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </Button>
        )}
      </div>
    </div>
  );
}
