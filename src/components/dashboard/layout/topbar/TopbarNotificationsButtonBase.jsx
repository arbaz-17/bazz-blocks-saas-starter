"use client";

import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function TopbarNotificationsButtonBase({
  onClick,
  disabled,
  unreadCount = 0,
  className,
}) {
  const showDot = unreadCount > 0;

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn("relative shrink-0", className)}
      onClick={onClick}
      disabled={disabled}
      aria-label={
        unreadCount > 0
          ? `Open notifications (${unreadCount} unread)`
          : "Open notifications"
      }
    >
      <Bell className="h-4 w-4" aria-hidden="true" />
      {showDot ? (
        <span className="absolute -right-0.5 -top-0.5 inline-flex h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-background" />
      ) : null}
    </Button>
  );
}
