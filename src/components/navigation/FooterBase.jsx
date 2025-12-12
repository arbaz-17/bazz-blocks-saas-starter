
"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

/**
 * FooterBase
 * 3-column marketing footer wired from simple config.
 *
 * Props:
 * - logo?: React.ReactNode
 * - productName?: string
 * - description?: string
 * - navTitle?: string
 * - navLinks?: { label: string; href: string }[]
 * - newsletter?: {
 *     title?: string;
 *     description?: string;
 *     placeholder?: string;
 *     ctaLabel?: string;
 *     helperText?: string;
 *   }
 * - className?: string
 */
export function FooterBase({
  logo,
  productName = "Your SaaS Starter",
  description,
  navTitle = "Navigation",
  navLinks = [],
  newsletter,
  className,
}) {
    const pathname = usePathname();
  
      if (pathname.startsWith("/dashboard") || pathname.startsWith("/dashboard-test")) {
      return null;
    }
  
  const year = new Date().getFullYear();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Starter is UI-only by default; wire this up to your favorite email tool.
  };

  return (
    <footer
      className={cn(
        "border-t border-border/60 bg-background/80",
        "backdrop-blur supports-[backdrop-filter]:bg-background/70",
        className
      )}
    >
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Main 3-column layout */}
        <div className="grid gap-10 md:grid-cols-3 lg:gap-12">
          {/* Column 1: Brand block */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {logo && (
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent/30">
                  {logo}
                </span>
              )}
              <span className="text-sm font-semibold tracking-tight text-foreground">
                {productName}
              </span>
            </div>

            {description && (
              <p className="max-w-sm text-sm text-muted-foreground">
                {description}
              </p>
            )}

            <p className="text-xs text-muted-foreground">
              Made with{" "}
              <span aria-hidden="true" className="mx-0.5">
                ❤️
              </span>
              by{" "}
              <Link
                href="https://portfolio-arbaz.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Arbaz Ahmad
              </Link>
              .
            </p>
          </div>

          {/* Column 2: Nav links */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">
              {navTitle}
            </p>

            {navLinks?.length > 0 && (
              <ul className="space-y-2 text-sm text-muted-foreground">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Column 3: Newsletter */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">
              {newsletter?.title || "Stay in the loop"}
            </p>

            <p className="text-sm text-muted-foreground">
              {newsletter?.description ||
                "Use this email box to turn casual visitors into early users, beta testers, or waitlist signups."}
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-2 sm:flex-row"
            >
              <Input
                type="email"
                required
                placeholder={newsletter?.placeholder || "Enter your email"}
                className="h-10 bg-background/80"
              />
              <Button type="submit" className="h-10 sm:shrink-0">
                {newsletter?.ctaLabel || "Get updates"}
              </Button>
            </form>

            <p className="text-xs text-muted-foreground">
              {newsletter?.helperText ||
                "Explain your cadence and no-spam promise here so visitors know what to expect."}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-border/60 pt-4 text-xs text-muted-foreground">
          <p>© {year} {productName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
