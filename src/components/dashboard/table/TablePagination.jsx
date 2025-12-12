// src/components/data-table/TablePagination.jsx
"use client";

import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

function getPageNumbers(current, total) {
  const pages = [];

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
    return pages;
  }

  const add = (p) => {
    if (!pages.includes(p)) pages.push(p);
  };

  add(1);
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) pages.push("left-ellipsis");
  for (let i = start; i <= end; i++) add(i);
  if (end < total - 1) pages.push("right-ellipsis");
  add(total);

  return pages;
}

export function TablePagination({
  page,
  pageSize,
  totalItems,
  pageSizeOptions = [10, 25, 50, 100],
  onPageChange,
  onPageSizeChange,
  showPageSizeSelect = true,
  disabled = false,
  className,
}) {
  const totalPages = Math.max(1, Math.ceil((totalItems || 0) / (pageSize || 1)));

  const safePage = Math.min(Math.max(page || 1, 1), totalPages);
  const startIndex = totalItems === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const endIndex = totalItems === 0 ? 0 : Math.min(totalItems, safePage * pageSize);

  const canGoPrev = safePage > 1;
  const canGoNext = safePage < totalPages;

  const handlePageChange = (nextPage) => {
    if (disabled || !onPageChange) return;
    const normalized = Math.min(Math.max(nextPage, 1), totalPages);
    if (normalized !== safePage) onPageChange(normalized);
  };

  const handlePageSizeChange = (nextSizeStr) => {
    if (disabled || !onPageSizeChange) return;
    const nextSize = Number(nextSizeStr) || pageSize;
    onPageSizeChange(nextSize);
  };

  const pageNumbers = getPageNumbers(safePage, totalPages);

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-2 text-xs md:flex-row md:items-center md:justify-between md:text-sm",
        disabled && "opacity-70 pointer-events-none",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
        <span>
          Showing{" "}
          <span className="font-medium text-foreground">{startIndex.toLocaleString()}</span>
          {" – "}
          <span className="font-medium text-foreground">{endIndex.toLocaleString()}</span>{" "}
          of{" "}
          <span className="font-medium text-foreground">{totalItems.toLocaleString()}</span>
        </span>

        {showPageSizeSelect && (
          <div className="flex items-center gap-1">
            <span className="hidden sm:inline">· Rows per page</span>
            <span className="inline sm:hidden">· / page</span>
            <Select value={String(pageSize)} onValueChange={handlePageSizeChange}>
              <SelectTrigger className="h-7 w-[72px] rounded-md border-border bg-background px-2 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="start" className="text-xs">
                {pageSizeOptions.map((opt) => (
                  <SelectItem key={opt} value={String(opt)}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2">
        <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground sm:hidden">
          Page <span className="font-medium text-foreground">{safePage}</span> of{" "}
          <span className="font-medium text-foreground">{totalPages}</span>
        </span>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 rounded-md"
            onClick={() => handlePageChange(1)}
            disabled={!canGoPrev}
            aria-label="Go to first page"
          >
            <ChevronsLeft className="h-3 w-3" aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 rounded-md"
            onClick={() => handlePageChange(safePage - 1)}
            disabled={!canGoPrev}
            aria-label="Go to previous page"
          >
            <ChevronLeft className="h-3 w-3" aria-hidden="true" />
          </Button>
        </div>

        <div className="hidden items-center gap-1 sm:flex">
          {pageNumbers.map((item, idx) => {
            if (item === "left-ellipsis" || item === "right-ellipsis") {
              return (
                <span key={`${item}-${idx}`} className="px-1 text-[11px] text-muted-foreground">
                  …
                </span>
              );
            }

            const pageNumber = item;
            const isActive = pageNumber === safePage;

            return (
              <Button
                key={pageNumber}
                variant={isActive ? "default" : "outline"}
                size="icon"
                className={cn("h-7 w-7 rounded-md text-[11px]", !isActive && "bg-background")}
                onClick={() => handlePageChange(pageNumber)}
                aria-current={isActive ? "page" : undefined}
                aria-label={`Go to page ${pageNumber}`}
              >
                {pageNumber}
              </Button>
            );
          })}
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 rounded-md"
            onClick={() => handlePageChange(safePage + 1)}
            disabled={!canGoNext}
            aria-label="Go to next page"
          >
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 rounded-md"
            onClick={() => handlePageChange(totalPages)}
            disabled={!canGoNext}
            aria-label="Go to last page"
          >
            <ChevronsRight className="h-3 w-3" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}
