
"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export function ChartLoadingStateBase() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-muted-foreground" />
    </div>
  );
}

export function ChartEmptyStateBase({ message = "No data to show." }) {
  return (
    <div className="absolute inset-0 grid place-items-center text-center">
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

export function ChartErrorStateBase({
  message = "Something went wrong.",
  onRetry,
}) {
  return (
    <div className="absolute inset-0 grid place-items-center gap-3 text-center">
      <p className="text-sm text-muted-foreground">{message}</p>
      {onRetry ? <Button size="sm" onClick={onRetry}>Retry</Button> : null}
    </div>
  );
}
