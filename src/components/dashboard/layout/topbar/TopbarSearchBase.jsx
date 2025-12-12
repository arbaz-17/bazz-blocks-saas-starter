"use client";

import React from "react";
import { Search, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

function useMediaQuery(query) {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const m = window.matchMedia(query);
    const onChange = () => setMatches(m.matches);
    onChange();
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, [query]);

  return matches;
}

export function TopbarSearchBase({ onSubmit, placeholder = "Search…", className }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (!isDesktop) return;
    if (!open) return;
    // focus after render
    setTimeout(() => inputRef.current?.focus?.(), 0);
  }, [open, isDesktop]);

  const close = () => {
    setOpen(false);
    setValue("");
  };

  const submit = (e) => {
    e.preventDefault();
    const v = value.trim();
    if (!v) return;
    onSubmit?.(v);
    close();
  };

  // Desktop: inline expanding input
  if (isDesktop) {
    return (
      <div className={cn("flex items-center gap-1.5", className)}>
        <form
          onSubmit={submit}
          className={cn(
            "overflow-hidden transition-[width] duration-200 ease-out",
            open ? "w-[220px]" : "w-0"
          )}
        >
          <div
            className={cn(
              "flex items-center gap-1 rounded-full border bg-muted/60 px-2.5 py-1.5",
              open ? "opacity-100" : "opacity-0 pointer-events-none",
              "transition-opacity duration-150"
            )}
          >
            <Search className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
            <Input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={placeholder}
              className="h-5 border-none bg-transparent px-1 text-xs shadow-none focus-visible:ring-0"
            />
            {value ? (
              <button
                type="button"
                onClick={close}
                className="rounded-full p-0.5 text-muted-foreground hover:bg-background"
                aria-label="Clear search"
              >
                <X className="h-3 w-3" aria-hidden="true" />
              </button>
            ) : null}
          </div>
        </form>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="shrink-0"
          aria-label={open ? "Close search" : "Open search"}
          onClick={() => setOpen((p) => !p)}
        >
          {open ? <X className="h-4 w-4" aria-hidden="true" /> : <Search className="h-4 w-4" aria-hidden="true" />}
        </Button>
      </div>
    );
  }

  // Mobile: Sheet search
  return (
    <div className={cn(className)}>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="shrink-0"
        aria-label="Open search"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4" aria-hidden="true" />
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="top" className="p-0">
          <SheetHeader className="border-b px-4 py-3 text-left">
            <SheetTitle className="text-sm font-semibold tracking-tight">
              Search
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={submit} className="px-4 py-3">
            <div className="flex items-center gap-2">
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                className="h-10"
              />
              <Button type="button" variant="outline" onClick={close}>
                Cancel
              </Button>
              <Button type="submit">Go</Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
