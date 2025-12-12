// src/components/data-table/TableFiltersSheet.jsx
"use client";

import * as React from "react";
import { Filter, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const ALL_OPTION_VALUE = "__all";

export function TableFiltersSheet({
  table,
  filtersConfig,
  title = "Filters",
  description = "Refine the records by applying one or more filters.",
}) {
  if (!filtersConfig || !filtersConfig.length) return null;

  const activeFilterCount = filtersConfig.reduce((count, filter) => {
    const column = table.getColumn(filter.columnId);
    if (!column) return count;

    const v = column.getFilterValue();
    const isEmpty =
      v === undefined ||
      v === null ||
      v === "" ||
      (Array.isArray(v) && v.length === 0);

    return isEmpty ? count : count + 1;
  }, 0);

  const hasActiveFilters = activeFilterCount > 0;

  const handleReset = () => table.resetColumnFilters();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className={cn(
            "relative gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs",
            "bg-background/70 hover:bg-accent/60",
            hasActiveFilters && "border-primary/60 bg-primary/5 text-primary",
          )}
        >
          <Filter className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">Filters</span>

          {hasActiveFilters && (
            <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-[1.25rem] items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className={cn(
          "flex w-full flex-col border-l border-border/60 bg-background/95 backdrop-blur",
          "sm:max-w-md",
        )}
      >
        <SheetHeader className="border-b border-border/60 pb-3">
          <div className="space-y-2">
            <SheetTitle className="text-base">{title}</SheetTitle>
            {description && (
              <SheetDescription className="text-xs text-muted-foreground">
                {description}
              </SheetDescription>
            )}
          </div>
        </SheetHeader>

        <ScrollArea className="mt-4 h-[calc(100vh-9rem)] pr-1">
          <div className="space-y-4 px-1.5">
            {filtersConfig.map((filter) => {
              const column = table.getColumn(filter.columnId);
              if (!column) return null;

              const rawValue = column.getFilterValue();
              const value = rawValue === undefined || rawValue === null ? "" : rawValue;

              const isActive =
                rawValue !== undefined &&
                rawValue !== null &&
                rawValue !== "" &&
                !(Array.isArray(rawValue) && rawValue.length === 0);

              const clearThisFilter = () => column.setFilterValue(undefined);

              return (
                <div
                  key={filter.id}
                  className="flex w-full flex-col gap-3 rounded-xl border border-border/70 bg-background/80 px-3.5 py-3.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <Label className="text-xs font-medium text-foreground">
                        {filter.label}
                      </Label>
                      {filter.description && (
                        <p className="mt-1 text-[11px] text-muted-foreground/80">
                          {filter.description}
                        </p>
                      )}
                    </div>

                    {isActive && (
                      <button
                        type="button"
                        onClick={clearThisFilter}
                        className="inline-flex items-center gap-1 rounded-full bg-muted/60 px-2 py-0.5 text-[10px] text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        <X className="h-3 w-3" aria-hidden="true" />
                        <span>Reset</span>
                      </button>
                    )}
                  </div>

                  <div className="w-full">
                    {filter.type === "text" && (
                      <Input
                        value={value}
                        onChange={(e) =>
                          column.setFilterValue(
                            e.target.value.trim() === "" ? undefined : e.target.value,
                          )
                        }
                        placeholder={filter.placeholder || "Type to filter..."}
                        className="h-9 w-full text-xs"
                      />
                    )}

                    {filter.type === "number" && (
                      <Input
                        type="number"
                        value={value}
                        onChange={(e) => {
                          const v = e.target.value;
                          column.setFilterValue(
                            v === "" || Number.isNaN(Number(v)) ? undefined : Number(v),
                          );
                        }}
                        placeholder={filter.placeholder || "Enter value"}
                        className="h-9 w-full text-xs"
                      />
                    )}

                    {filter.type === "select" && (
                      <Select
                        value={
                          rawValue === undefined || rawValue === null
                            ? ALL_OPTION_VALUE
                            : String(rawValue)
                        }
                        onValueChange={(val) => {
                          if (val === ALL_OPTION_VALUE) column.setFilterValue(undefined);
                          else column.setFilterValue(val);
                        }}
                      >
                        <SelectTrigger className="h-9 w-full text-xs">
                          <SelectValue placeholder={filter.placeholder || "Select option"} />
                        </SelectTrigger>
                        <SelectContent>
                          {filter.includeAllOption !== false && (
                            <SelectItem value={ALL_OPTION_VALUE}>All</SelectItem>
                          )}
                          {filter.options?.map((opt) => (
                            <SelectItem key={opt.value} value={String(opt.value)}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}

                    {filter.type === "boolean" && (
                      <Select
                        value={
                          rawValue === undefined || rawValue === null
                            ? ALL_OPTION_VALUE
                            : rawValue
                            ? "true"
                            : "false"
                        }
                        onValueChange={(val) => {
                          if (val === ALL_OPTION_VALUE) column.setFilterValue(undefined);
                          else column.setFilterValue(val === "true");
                        }}
                      >
                        <SelectTrigger className="h-9 w-full text-xs">
                          <SelectValue placeholder={filter.placeholder || "All"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={ALL_OPTION_VALUE}>All</SelectItem>
                          <SelectItem value="true">Yes</SelectItem>
                          <SelectItem value="false">No</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        <SheetFooter className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
          <Button type="button" variant="ghost" size="sm" onClick={handleReset} className="text-xs">
            Reset all
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
