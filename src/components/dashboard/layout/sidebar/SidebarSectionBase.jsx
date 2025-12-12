// src/components/dashboard/sidebar/SidebarSectionBase.jsx
"use client";

import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { SidebarItemBase } from "./SidebarItemBase";
import { isItemOrChildActive } from "./sidebar-utils";

export function SidebarSectionBase({
  section,
  collapsed,
  currentPath,
  openGroupId,
  onGroupToggle,
}) {
  return (
    <div className="space-y-1">
      {!collapsed && section.label ? (
        <p className="px-2 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground/80">
          {section.label}
        </p>
      ) : null}

      <div className="space-y-0.5">
        {section.items.map((item) => {
          const groupId =
            item.id ?? `${section.id || section.label || "section"}-${item.label}`;

          const hasChildren = item.children && item.children.length > 0;

          if (!hasChildren) {
            return (
              <SidebarItemBase
                key={item.id ?? item.label}
                item={item}
                collapsed={collapsed}
                currentPath={currentPath}
              />
            );
          }

          // Collapsed: show parent only (no children)
          if (collapsed) {
            return (
              <SidebarItemBase
                key={groupId}
                item={item}
                collapsed={true}
                currentPath={currentPath}
              />
            );
          }

          const open = openGroupId === groupId;
          const isActiveGroup = isItemOrChildActive(item, currentPath);

          return (
            <div key={groupId} className="space-y-0.5">
              <button
                type="button"
                onClick={() => onGroupToggle?.(groupId)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-sm",
                  "transition-colors hover:bg-accent hover:text-foreground",
                  isActiveGroup && "bg-accent/80 text-foreground"
                )}
                aria-expanded={open}
              >
                {item.icon ? (
                  <span
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-md",
                      isActiveGroup && "bg-background/30"
                    )}
                  >
                    {item.icon}
                  </span>
                ) : null}

                <span className="flex-1 truncate text-left">{item.label}</span>

                <span
                  className={cn(
                    "ml-1 flex h-5 w-5 items-center justify-center rounded-md",
                    "text-muted-foreground transition-transform duration-200",
                    open && "rotate-90"
                  )}
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>

              {open ? (
                <div className="space-y-0.5 pl-5">
                  {item.children.map((child) => (
                    <SidebarItemBase
                      key={child.id ?? child.label}
                      item={child}
                      collapsed={false}
                      currentPath={currentPath}
                      compact
                    />
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
