
"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export function TableRowActions({
  row,
  actions,
  size = "icon",
  align = "right",
  className,
}) {
  const defs = useMemo(
    () =>
      typeof actions === "function"
        ? actions(row)
        : Array.isArray(actions)
        ? actions
        : [],
    [actions, row],
  );

  if (!row) return null;

  const visibleActions = defs.filter((action) => {
    if (!action) return false;
    const { show } = action;
    if (typeof show === "function") return show(row);
    if (show === false) return false;
    return true;
  });

  if (!visibleActions.length) return null;

  const justifyClass =
    align === "left"
      ? "justify-start"
      : align === "center"
      ? "justify-center"
      : "justify-end";

  return (
    <div
      data-no-row-click
      className={cn("flex items-center gap-1.5", justifyClass, className)}
    >
      {visibleActions.map((action) => {
        const IconComponent = action.icon || Eye;
        const variant = action.variant || "ghost";

        return (
          <Button
            key={action.id}
            type="button"
            variant={variant}
            size={size === "icon" ? "icon" : "sm"}
            className={cn(
              "h-7 w-7 rounded-full text-muted-foreground hover:text-foreground",
              size !== "icon" && "px-2",
              action.className,
            )}
            onClick={(e) => {
              e.stopPropagation();
              action.onClick?.(row);
            }}
            aria-label={action.label}
          >
            <IconComponent
              className={cn("h-3.5 w-3.5", size !== "icon" && "mr-1")}
              aria-hidden="true"
            />
          </Button>
        );
      })}
    </div>
  );
}
