"use client";

import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { DashboardBreadcrumbs } from "@/components/dashboard/layout/DashboardBreadcrumbsBase";
import { UserMenu } from "../UserMenuBase";
import { TopbarSearchBase } from "./TopbarSearchBase";
import { TopbarNotificationsButtonBase } from "./TopbarNotificationsButtonBase";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

/**
 * TopbarBase (Free)
 * - Pinned by DashboardShellBase (not sticky here)
 *
 * Props:
 * - breadcrumbsItems?: {label, href?}[]
 * - user?: {name?, email?, avatarUrl?}
 * - onOpenMobileNav?: () => void
 * - showMobileMenu?: boolean
 * - rightSlot?: ReactNode
 *
 * - onSearchSubmit?: (value) => void
 * - searchPlaceholder?: string
 *
 * - onToggleNotifications?: () => void
 * - notificationsUnreadCount?: number
 * - showNotificationsButton?: boolean
 *
 * - showThemeToggle?: boolean
 */
export function TopbarBase({
  breadcrumbsItems = [],
  user,
  onOpenMobileNav,
  showMobileMenu = true,

  rightSlot,

  onSearchSubmit,
  searchPlaceholder = "Search…",

  onToggleNotifications,
  notificationsUnreadCount = 0,
  showNotificationsButton = true,

  showThemeToggle = true,
  className,
}) {
  return (
    <div
      className={cn(
        "h-14 px-3 sm:px-4 lg:px-6",
        "flex items-center justify-between gap-3",
        className
      )}
    >
      {/* Left: mobile menu + breadcrumbs */}
      <div className="flex min-w-0 items-center gap-2">
        {showMobileMenu ? (
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Open navigation"
            onClick={onOpenMobileNav}
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </Button>
        ) : null}

        <div className="min-w-0">
          {breadcrumbsItems?.length ? (
            <DashboardBreadcrumbs items={breadcrumbsItems} />
          ) : (
            <span className="text-sm font-medium text-muted-foreground">
              Dashboard
            </span>
          )}
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {rightSlot}

        <TopbarSearchBase
          onSubmit={onSearchSubmit}
          placeholder={searchPlaceholder}
        />

        {showThemeToggle ? <ThemeToggle /> : null}

        {showNotificationsButton ? (
          <TopbarNotificationsButtonBase
            onClick={onToggleNotifications}
            unreadCount={notificationsUnreadCount}
          />
        ) : null}

        <UserMenu user={user} />
      </div>
    </div>
  );
}
