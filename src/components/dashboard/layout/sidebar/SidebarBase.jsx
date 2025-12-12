
"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

import { SidebarSectionBase } from "./SidebarSectionBase";
import { SidebarCollapseToggleBase } from "./SidebarCollapseToggleBase";
import { findActiveGroupId } from "./sidebar-utils";

/**
 * SidebarBase (Free)
 * - Opinionated styling (single variant)
 * - Collapsible desktop sidebar
 * - Nested groups (1 level)
 */
export function SidebarBase({
  sections = [],
  brand,
  logo,
  footer,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
  className,
}) {
  const pathname = usePathname() || "/";

  const [collapsedInternal, setCollapsedInternal] = useState(defaultCollapsed);
  const collapsed = collapsedProp ?? collapsedInternal;

  // Manual open group (only matters when there's no active group on the route)
  const [manualOpenGroupId, setManualOpenGroupId] = useState(null);

  const handleCollapsedToggle = useCallback(() => {
    const next = !collapsed;
    setCollapsedInternal(next);
    onCollapsedChange?.(next);
  }, [collapsed, onCollapsedChange]);

  const handleGroupToggle = useCallback((groupId) => {
    setManualOpenGroupId((prev) => (prev === groupId ? null : groupId));
  }, []);

  // ✅ Derived from route (no setState in effects)
  const activeGroupId = useMemo(() => {
    if (collapsed) return null;
    return findActiveGroupId(sections, pathname);
  }, [collapsed, sections, pathname]);

  const openGroupId = activeGroupId ?? manualOpenGroupId;

  const brandInitial =
    typeof brand === "string" && brand.trim()
      ? brand.trim()[0].toUpperCase()
      : "B";

  const logoNode =
    logo ?? (
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
        {brandInitial}
      </div>
    );

  return (
    <aside
      className={cn(
        "h-dvh flex flex-col overflow-hidden border-r bg-card",
        collapsed ? "w-16" : "w-64",
        "transition-[width] duration-200 ease-out",
        className
      )}
    >
      {/* Top */}
      <div className="flex h-14 items-center border-b px-3">
        <div
          className={cn(
            "flex w-full items-center gap-2 min-w-0",
            collapsed ? "justify-center" : "justify-start"
          )}
        >
          {logoNode}
          {!collapsed && brand ? (
            <span className="truncate text-sm font-semibold tracking-tight">
              {brand}
            </span>
          ) : null}
        </div>
      </div>

      {/* Middle (scroll) */}
<div className="flex-1 overflow-hidden">
        <nav
          aria-label="Main navigation"
          className={cn("space-y-3 py-3", collapsed ? "px-1" : "px-2")}
        >
          {sections.map((section) => (
            <SidebarSectionBase
              key={section.id ?? section.label ?? JSON.stringify(section)}
              section={section}
              collapsed={collapsed}
              currentPath={pathname}
              openGroupId={openGroupId}
              onGroupToggle={handleGroupToggle}
            />
          ))}
        </nav>
</div>

      {/* Bottom */}
      <div className="border-t px-2 py-2 space-y-2">
        {footer ? (
          <div className={cn(collapsed ? "flex justify-center" : "px-1")}>
            {footer}
          </div>
        ) : null}

        <SidebarCollapseToggleBase
          collapsed={collapsed}
          onToggle={handleCollapsedToggle}
        />
      </div>
    </aside>
  );
}
