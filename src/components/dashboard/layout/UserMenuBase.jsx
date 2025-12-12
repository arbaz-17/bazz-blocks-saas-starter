// src/components/dashboard/layout/UserMenu.jsx
"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { LogOut, Settings, User as UserIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

/**
 * UserMenu (Base)
 * Props:
 * - user?: { name?: string, email?: string, avatarUrl?: string }
 * - onSignOut?: () => void
 * - className?: string
 */
export function UserMenu({ user, onSignOut, className }) {
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn("h-9 w-9 rounded-full p-0", className)}
          aria-label={user?.name ? `Open user menu for ${user.name}` : "Open user menu"}
        >
          <Avatar className="h-9 w-9">
            {user?.avatarUrl ? (
              <AvatarImage src={user.avatarUrl} alt={user?.name || "User avatar"} />
            ) : null}
            <AvatarFallback className="text-xs font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56" sideOffset={8}>
        <DropdownMenuLabel className="flex flex-col gap-0.5">
          <span className="text-sm font-medium">{user?.name ?? "Signed in"}</span>
          {user?.email ? (
            <span className="text-xs text-muted-foreground truncate">{user.email}</span>
          ) : null}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/dashboard/profile" className="flex items-center gap-2">
            <UserIcon className="h-4 w-4" aria-hidden="true" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" aria-hidden="true" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>

        {onSignOut ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={onSignOut}
              className="flex items-center gap-2 text-destructive focus:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
