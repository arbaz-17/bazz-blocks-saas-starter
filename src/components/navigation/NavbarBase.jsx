// components/marketing/navbar/NavbarBase.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ThemeToggle } from "../layout/ThemeToggle";

/**
 * NavbarBase – simple SaaS navbar for the free starter.
 *
 * Props:
 * - logo?: ReactNode
 * - navItems?: {
 *     label: string;
 *     href?: string;
 *     external?: boolean;
 *     children?: { label: string; href?: string; external?: boolean; description?: string }[];
 *   }[]
 * - cta?: { label: string; href: string; external?: boolean }
 * - sticky?: boolean
 * - showThemeToggle?: boolean
 * - className?: string
 */
export function NavbarBase({
  logo,
  navItems = [],
  cta,
  sticky = false,
  showThemeToggle = true,
  className,
}) {
  const pathname = usePathname();

    if (pathname.startsWith("/dashboard") || pathname.startsWith("/dashboard-test")) {
    return null;
  }

  return (
    <header
      className={cn(
        "w-full border-b border-border/60 bg-background/80 backdrop-blur",
        sticky && "sticky top-0 z-40",
        className
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Desktop (md and up) */}
        <div className="hidden h-16 items-center justify-between md:flex">
          <LogoSlotBase logo={logo} />

          <div className="font-heading flex items-center gap-4">
            <DesktopNavBase items={navItems} pathname={pathname} />
            {showThemeToggle ? <ThemeToggle className="ml-1" /> : null}
            {cta ? (
              <Button asChild size="sm">
                <Link
                  href={cta.href}
                  target={cta.external ? "_blank" : undefined}
                  rel={cta.external ? "noreferrer" : undefined}
                >
                  {cta.label}
                </Link>
              </Button>
            ) : null}

            
          </div>
        </div>

        {/* Mobile (below md) */}
        <div className="flex h-16 items-center justify-between gap-4 md:hidden">
          <LogoSlotBase logo={logo} />

          <div className="flex items-center gap-2">
            {showThemeToggle ? <ThemeToggle /> : null}
            <MobileNavBase items={navItems} cta={cta} pathname={pathname} />
          </div>
        </div>
      </div>
    </header>
  );
}

function LogoSlotBase({ logo }) {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 text-sm font-semibold text-foreground"
    >
      {logo ?? <span>Logo</span>}
    </Link>
  );
}

function DesktopNavBase({ items, pathname }) {
  if (!items || !items.length) return null;

  return (
    <nav aria-label="Main navigation" className="flex items-center gap-3">
      {items.map((item) => {
        const hasChildren = item.children && item.children.length > 0;
        const isActive =
          item.href && pathname && pathname.startsWith(item.href);

        if (hasChildren) {
          return (
            <DesktopDropdownBase
              key={item.label}
              item={item}
              pathname={pathname}
            />
          );
        }

        return (
          <Link
            key={item.label}
            href={item.href ?? "#"}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noreferrer" : undefined}
            className={cn(
              "inline-flex items-center rounded-md px-2 py-1 text-sm font-medium transition",
              "text-muted-foreground hover:text-foreground hover:bg-accent/60",
              isActive && "text-foreground"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function DesktopDropdownBase({ item }) {
  const children = item.children ?? [];

  return (
    <div className="relative group">
      <button
        type="button"
        className={cn(
          "inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium transition",
          "text-muted-foreground hover:text-foreground hover:bg-accent/60"
        )}
      >
        <span>{item.label}</span>
        <ChevronDown className="h-4 w-4" aria-hidden="true" />
      </button>

      <div
        className={cn(
          "pointer-events-none absolute left-1/2 top-full z-40 mt-2 w-64 -translate-x-1/2 rounded-xl border bg-popover p-2 text-sm shadow-md opacity-0",
          "translate-y-1 scale-95 transition-all duration-150 ease-out",
          "group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-2 group-hover:scale-100"
        )}
      >
        <div className="flex flex-col gap-1">
          {children.map((child) => (
            <Link
              key={child.label}
              href={child.href ?? "#"}
              target={child.external ? "_blank" : undefined}
              rel={child.external ? "noreferrer" : undefined}
              className={cn(
                "flex flex-col rounded-md px-2 py-1.5 transition",
                "text-sm text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <span className="font-medium">{child.label}</span>
              {child.description ? (
                <span className="text-xs text-muted-foreground/80">
                  {child.description}
                </span>
              ) : null}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileNavBase({ items, cta, pathname }) {
  const hasItems = items && items.length > 0;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-9 w-9 border-border"
          aria-label="Open navigation"
        >
          <Menu className="h-4 w-4" aria-hidden="true" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="flex flex-col gap-4 bg-background">
        <SheetHeader className="mt-2">
          <SheetTitle className="text-base font-semibold">
            Menu
          </SheetTitle>
        </SheetHeader>

        {hasItems ? (
          <nav
            aria-label="Mobile navigation"
            className="flex-1 space-y-1 overflow-y-auto"
          >
            {items.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isActive =
                item.href && pathname && pathname.startsWith(item.href);

              if (hasChildren) {
                return (
                  <Accordion
                    key={item.label}
                    type="single"
                    collapsible
                    className="rounded-lg border border-border/60 bg-card/80 px-2"
                  >
                    <AccordionItem value={item.label}>
                      <AccordionTrigger className="text-sm font-medium text-foreground">
                        {item.label}
                      </AccordionTrigger>
                      <AccordionContent className="space-y-1 pb-2">
                        {item.children.map((child) => (
                          <SheetClose asChild key={child.label}>
                            <Link
                              href={child.href ?? "#"}
                              target={child.external ? "_blank" : undefined}
                              rel={
                                child.external ? "noreferrer" : undefined
                              }
                              className={cn(
                                "block rounded-md px-2 py-1 text-sm",
                                "text-muted-foreground hover:text-foreground hover:bg-accent/70"
                              )}
                            >
                              {child.label}
                            </Link>
                          </SheetClose>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                );
              }

              return (
                <SheetClose asChild key={item.label}>
                  <Link
                    href={item.href ?? "#"}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm font-medium",
                      "text-muted-foreground hover:text-foreground hover:bg-accent/70",
                      isActive && "text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              );
            })}
          </nav>
        ) : null}

        {/* CTA at bottom */}
        <div className="mt-auto space-y-2 border-t border-border/60 pt-3">
          {cta ? (
            <SheetClose asChild>
              <Button asChild className="w-full">
                <Link
                  href={cta.href}
                  target={cta.external ? "_blank" : undefined}
                  rel={cta.external ? "noreferrer" : undefined}
                >
                  {cta.label}
                </Link>
              </Button>
            </SheetClose>
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  );
}
