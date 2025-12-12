
"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

function DefaultLoadingState({ rows = 4 }) {
  return (
    <div className="space-y-2 p-4">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="grid grid-cols-[1.5rem_1.5fr_1fr] gap-3 items-center">
          <Skeleton className="h-4 w-4 rounded-md" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-24 justify-self-end" />
        </div>
      ))}
    </div>
  );
}

function DefaultEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-1 py-12 text-center text-sm">
      <p className="font-medium text-foreground">No records to display</p>
      <p className="text-xs text-muted-foreground max-w-sm">
        Add a new record or adjust filters/search to see results.
      </p>
    </div>
  );
}

function DefaultErrorState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-10 text-center text-sm">
      <p className="font-medium text-destructive">Something went wrong</p>
      <p className="text-xs text-muted-foreground max-w-sm">
        {message || "We couldn’t load this table. Try again in a moment."}
      </p>
    </div>
  );
}

export function DataTableCard({
  id,
  title,
  subtitle,
  eyebrow,
  totalCount,
  headerRight,

  loading = false,
  error = null,
  isEmpty = false,

  toolbar,
  children,

  selectionBar,
  pagination,

  className,
}) {
  const hasHeaderRight = Boolean(headerRight);

  let currentState = "data";
  if (loading) currentState = "loading";
  else if (error) currentState = "error";
  else if (isEmpty) currentState = "empty";

  return (
    <Card
      id={id}
      className={cn(
        "w-full bg-card border border-muted rounded-xl shadow-sm flex flex-col",
        className,
      )}
    >
      {(title || subtitle || eyebrow || typeof totalCount === "number" || headerRight) && (
        <CardHeader
          className={cn(
            "border-b border-border/70 bg-transparent px-3 py-3 rounded-t-xl",
            hasHeaderRight
              ? "flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-4 md:px-4 md:py-3"
              : "flex flex-col items-center gap-2 text-center md:px-4 md:py-3",
          )}
        >
          <div className={cn("space-y-1.5", !hasHeaderRight && "flex flex-col items-center")}>
            {eyebrow && (
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground/80">
                {eyebrow}
              </p>
            )}

            <div className={cn("flex flex-wrap items-center gap-2", !hasHeaderRight && "justify-center")}>
              {title && <CardTitle className="text-base font-semibold md:text-lg">{title}</CardTitle>}

              {typeof totalCount === "number" && (
                <span className="inline-flex items-center rounded-full border border-border/70 bg-background/90 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                  <span className="mr-1 h-1.5 w-1.5 rounded-full bg-primary/70" />
                  {totalCount.toLocaleString()}
                  <span className="hidden sm:inline">&nbsp;records</span>
                </span>
              )}
            </div>

            {subtitle && (
              <CardDescription
                className={cn(
                  "max-w-2xl text-xs text-muted-foreground/90 md:text-sm",
                  !hasHeaderRight && "text-center",
                )}
              >
                {subtitle}
              </CardDescription>
            )}
          </div>

          {hasHeaderRight && (
            <div className="flex w-full flex-wrap items-center justify-start gap-2 md:w-auto md:justify-end">
              {headerRight}
            </div>
          )}
        </CardHeader>
      )}

      <CardContent className="flex-1 flex flex-col gap-3 pb-3">
        {toolbar && (
          <>
            <div className="datatable-toolbar">{toolbar}</div>
            <Separator className="my-2" />
          </>
        )}

        <div className="relative flex-1 rounded-lg border border-border/70 bg-background/80 overflow-hidden">
          <div className="overflow-x-auto">
            {currentState === "loading" && <DefaultLoadingState />}
            {currentState === "error" && <DefaultErrorState message={typeof error === "string" ? error : undefined} />}
            {currentState === "empty" && <DefaultEmptyState />}
            {currentState === "data" && children}
          </div>
        </div>

        {selectionBar && <div className="mt-1">{selectionBar}</div>}
      </CardContent>

      {pagination && (
        <CardFooter className="border-t border-border/60 flex items-center justify-between gap-3">
          {pagination}
        </CardFooter>
      )}
    </Card>
  );
}
