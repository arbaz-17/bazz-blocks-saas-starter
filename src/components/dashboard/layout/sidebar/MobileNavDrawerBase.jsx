// src/components/dashboard/sidebar/MobileNavDrawerBase.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { badgeToneClasses, isItemActive } from "./sidebar-utils";

export function MobileNavDrawerBase({
  sections = [],
  open,
  onOpenChange,
  title = "Navigation",
  subtitle,
}) {
  const pathname = usePathname() || "/";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="flex flex-col p-0">
        <SheetHeader className="border-b px-4 py-3 text-left">
          <SheetTitle className="text-sm font-semibold tracking-tight">
            {title}
          </SheetTitle>
          {subtitle ? (
            <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
          ) : null}
        </SheetHeader>

        <ScrollArea className="flex-1">
          <nav aria-label="Mobile navigation" className="space-y-3 px-2 py-3">
            {sections.map((section) => (
              <div
                key={section.id ?? section.label ?? JSON.stringify(section)}
                className="space-y-1"
              >
                {section.label ? (
                  <p className="px-2 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground/80">
                    {section.label}
                  </p>
                ) : null}

                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const isExternal =
                      item.external || (item.href && item.href.startsWith("http"));
                    const isActive = isItemActive(item, pathname);

                    const row = (
                      <div
                        className={cn(
                          "flex w-full items-center gap-2 rounded-md px-2.5 py-2.5 text-sm",
                          "transition-colors",
                          item.disabled
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-accent hover:text-foreground",
                          isActive && "bg-accent/80 text-foreground"
                        )}
                      >
                        {item.icon ? (
                          <span className="flex h-5 w-5 items-center justify-center rounded-md">
                            {item.icon}
                          </span>
                        ) : null}

                        <span className="flex-1 truncate">{item.label}</span>

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
                    );

                    if (!item.href || item.disabled) {
                      return (
                        <button
                          key={item.id ?? item.label}
                          type="button"
                          className="w-full text-left"
                          disabled={item.disabled}
                        >
                          {row}
                        </button>
                      );
                    }

                    if (isExternal) {
                      return (
                        <a
                          key={item.id ?? item.label}
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <SheetClose asChild>{row}</SheetClose>
                        </a>
                      );
                    }

                    return (
                      <Link
                        key={item.id ?? item.label}
                        href={item.href}
                        className="block"
                      >
                        <SheetClose asChild>{row}</SheetClose>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </ScrollArea>

        <div className="flex items-center justify-between border-t px-3 py-2 text-xs text-muted-foreground">
          <span>App</span>
          <SheetClose asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <X className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Close</span>
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
