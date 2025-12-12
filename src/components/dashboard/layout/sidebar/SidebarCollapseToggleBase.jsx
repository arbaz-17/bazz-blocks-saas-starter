// src/components/dashboard/sidebar/SidebarCollapseToggleBase.jsx
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function SidebarCollapseToggleBase({ collapsed, onToggle, className }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "group flex w-full items-center justify-center gap-2 rounded-lg px-2 py-1.5 text-[11px]",
        "text-muted-foreground hover:text-foreground",
        "hover:bg-accent/80 transition-colors",
        className
      )}
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
    >
      <span
        className={cn(
          "inline-flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background shadow-sm",
          "group-hover:bg-card"
        )}
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        ) : (
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        )}
      </span>

      {!collapsed ? (
        <span className="hidden sm:inline text-[11px] font-medium">
          Collapse
        </span>
      ) : null}
    </button>
  );
}
