// src/components/data-table/TableToolbar.jsx
"use client";

import * as React from "react";
import { Search, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function TableToolbar({
  showSearch = true,
  searchValue,
  defaultSearchValue = "",
  onSearchChange,
  onSearchSubmit,
  searchPlaceholder = "Search records...",
  searchDisabled = false,

  filters,
  primaryAction,
  secondaryActions,
  rightExtras,

  className,
}) {
  const [internalValue, setInternalValue] = React.useState(defaultSearchValue);

  const isControlled = typeof searchValue === "string";
  const value = isControlled ? searchValue : internalValue;

  const handleChange = (event) => {
    if (searchDisabled) return;
    const nextValue = event.target.value;

    if (!isControlled) setInternalValue(nextValue);
    onSearchChange?.(nextValue);
  };

  const handleSubmit = () => {
    if (searchDisabled) return;
    onSearchSubmit?.(value || "");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleClear = () => {
    if (searchDisabled) return;

    if (!isControlled) setInternalValue("");
    onSearchChange?.("");
    onSearchSubmit?.("");
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-xl border border-border/60 bg-muted/40 px-3 py-2.5 shadow-sm md:flex-row md:items-center md:justify-between md:px-4 md:py-3",
        "backdrop-blur supports-[backdrop-filter]:bg-muted/60",
        className,
      )}
    >
      <div className="flex flex-1 flex-col gap-2 md:flex-row md:items-center md:gap-3">
        {showSearch && (
          <div className="flex-1 md:max-w-sm">
            <div
              className={cn(
                "group relative flex items-center rounded-lg border border-border/60 bg-background/80 px-2",
                "transition-colors duration-150",
                !searchDisabled &&
                  "focus-within:border-primary/60 focus-within:ring-1 focus-within:ring-primary/40",
                searchDisabled && "opacity-70 cursor-not-allowed",
              )}
            >
              <span className="pointer-events-none flex items-center">
                <Search className="mr-1.5 h-4 w-4 text-muted-foreground/80" aria-hidden="true" />
              </span>

              <Input
                type="search"
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                disabled={searchDisabled}
                placeholder={searchPlaceholder}
                className={cn(
                  "h-9 w-full border-0 bg-transparent px-1 text-sm shadow-none",
                  "focus-visible:ring-0 focus-visible:ring-offset-0",
                  "placeholder:text-muted-foreground/70",
                )}
                aria-label="Search table records"
              />

              {value && !searchDisabled && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="ml-1 flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground/80 transition hover:bg-muted hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              )}

              {onSearchSubmit && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  disabled={searchDisabled}
                  onClick={handleSubmit}
                  className="ml-1 h-7 w-7 shrink-0 rounded-full text-muted-foreground/80 hover:text-foreground hover:bg-muted"
                  aria-label="Run search"
                >
                  <Search className="h-3.5 w-3.5" aria-hidden="true" />
                </Button>
              )}
            </div>
          </div>
        )}

        {filters && (
          <div className={cn("flex flex-wrap items-center gap-1.5 md:gap-2", "max-md:-mx-1 max-md:overflow-x-auto max-md:px-1")}>
            {filters}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2">
        {secondaryActions && <div className="flex flex-wrap items-center gap-1.5 md:gap-2">{secondaryActions}</div>}
        {rightExtras && <div className="flex flex-wrap items-center gap-1.5 md:gap-2">{rightExtras}</div>}
        {primaryAction && <div className="flex items-center">{primaryAction}</div>}
      </div>
    </div>
  );
}
