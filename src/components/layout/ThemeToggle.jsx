"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useThemeMode } from "./ThemeProvider";

export function ThemeToggle({ className }) {
  const { toggleTheme, isDark } = useThemeMode();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-card/90 shadow-sm",
        "hover:bg-accent/80 hover:text-foreground transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="relative flex h-4 w-4 items-center justify-center">
        {/* Sun icon for light mode */}
        <Sun
          className={cn(
            "absolute h-4 w-4 transition-all duration-200",
            isDark
              ? "scale-0 opacity-0 -rotate-90"
              : "scale-100 opacity-100 rotate-0 text-amber-400"
          )}
          aria-hidden="true"
        />
        {/* Moon icon for dark mode */}
        <Moon
          className={cn(
            "absolute h-4 w-4 transition-all duration-200",
            isDark
              ? "scale-100 opacity-100 rotate-0 text-sky-300"
              : "scale-0 opacity-0 rotate-90"
          )}
          aria-hidden="true"
        />
      </span>
    </button>
  );
}
