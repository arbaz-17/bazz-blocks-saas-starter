"use client";

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

/**
 * App-level theme provider using next-themes.
 */
export function ThemeProvider({ children }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      themes={["light", "dark"]}
    >
      {children}
    </NextThemesProvider>
  );
}

/**
 * Convenience hook for theme access + toggling.
 */
export function useThemeMode() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();

  const current = resolvedTheme || theme || systemTheme || "light";
  const isDark = current === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return {
    theme: current,
    setTheme,
    toggleTheme,
    isDark,
    isLight: !isDark,
  };
}
