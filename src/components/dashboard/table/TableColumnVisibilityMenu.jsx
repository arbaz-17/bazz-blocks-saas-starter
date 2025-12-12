// src/components/data-table/TableColumnVisibilityMenu.jsx
"use client";

import React from "react";
import { Eye, EyeOff, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export function TableColumnVisibilityMenu({
  columns = [],
  onToggleColumn,
  onReset,
  showReset = false,
  className,
}) {
  const hasHidden = columns.some((c) => !c.visible);

  const handleToggle = (col) => {
    if (!onToggleColumn) return;
    if (col.disableToggle || col.pinned) return;
    onToggleColumn(col.id, !col.visible);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className={cn(
            "gap-1.5 rounded-xl px-2.5 py-1.5 text-xs cursor-pointer",
            "bg-background/70 hover:bg-accent/60",
            className,
          )}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">Columns</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="flex items-center justify-between gap-2 text-xs">
          <span>Toggle columns</span>
          {hasHidden && (
            <span className="inline-flex items-center gap-1 rounded-full bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
              <EyeOff className="h-3 w-3" aria-hidden="true" />
              Hidden
            </span>
          )}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {columns.map((col) => {
          const disabled = col.disableToggle || col.pinned;

          return (
            <DropdownMenuItem
              key={col.id}
              role="menuitemcheckbox"
              aria-checked={col.visible}
              disabled={disabled}
              onSelect={(event) => {
                event.preventDefault();
                if (!disabled) handleToggle(col);
              }}
              className={cn("flex items-center gap-2 text-xs cursor-pointer", disabled && "opacity-60 cursor-not-allowed")}
            >
              {col.visible ? (
                <Eye className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
              ) : (
                <EyeOff className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
              )}
              <span className="truncate">{col.label}</span>
            </DropdownMenuItem>
          );
        })}

        {showReset && onReset && (
          <>
            <DropdownMenuSeparator />
            <button
              type="button"
              onClick={onReset}
              className="w-full px-2 py-1.5 text-left text-[11px] text-muted-foreground hover:bg-muted/70"
            >
              Reset to default
            </button>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
