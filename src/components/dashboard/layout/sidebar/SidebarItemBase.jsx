
"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { badgeToneClasses, isItemActive } from "./sidebar-utils";

export function SidebarItemBase({
  item,
  collapsed,
  currentPath,
  compact = false,
}) {
  const isExternal = item.external || (item.href && item.href.startsWith("http"));
  const isActive = isItemActive(item, currentPath);

  const base = cn(
    "flex w-full items-center gap-2 rounded-md px-2.5",
    compact ? "py-1.5 text-[13px]" : "py-2 text-sm",
    "transition-colors",
    item.disabled
      ? "opacity-50 cursor-not-allowed"
      : "hover:bg-accent hover:text-foreground",
    isActive && "bg-accent/80 text-foreground"
  );

  const content = (
    <div className={base} title={collapsed ? item.label : undefined}>
      {item.icon ? (
        <span
          className={cn(
            "flex h-5 w-5 items-center justify-center rounded-md",
            isActive && "bg-background/30"
          )}
        >
          {item.icon}
        </span>
      ) : null}

      {!collapsed ? (
        <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
          <span className="truncate">{item.label}</span>

          {item.badgeLabel ? (
            <span
              className={cn(
                "inline-flex items-center rounded-full border px-1.5 text-[10px] font-medium leading-tight",
                badgeToneClasses(item.badgeTone)
              )}
            >
              {item.badgeLabel}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );

  if (!item.href || item.disabled) {
    return (
      <button type="button" className="w-full text-left" disabled={item.disabled}>
        {content}
      </button>
    );
  }

  if (isExternal) {
    return (
      <a href={item.href} target="_blank" rel="noreferrer" className="block">
        {content}
      </a>
    );
  }

  return (
    <Link href={item.href} className="block">
      {content}
    </Link>
  );
}
