// src/components/dashboard/layout/DashboardShellBase.jsx
import { cn } from "@/lib/utils";
import { PageContainer } from "./PageContainer";

export function DashboardShellBase({
  sidebar,
  topbar,
  children,
  maxWidth = "max-w-none",   // 👈 important (see point #2)
  padded = true,
  className,
  contentClassName,
}) {
  return (
    <div className={cn("h-dvh w-full overflow-hidden bg-background", className)}>
      <div className="flex h-full w-full">
        {/* Sidebar: pinned, never scrolls with page */}
{sidebar ? (
  <aside className="hidden lg:flex h-full shrink-0 overflow-hidden">
    {sidebar}
  </aside>
) : null}


        {/* Main column */}
        <div className="flex h-full min-w-0 flex-1 flex-col">
          {/* Topbar: pinned */}
          {topbar ? (
            <div className="shrink-0 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              {topbar}
            </div>
          ) : null}

          {/* ONLY THIS SCROLLS */}
          <div className={cn("min-w-0 flex-1 overflow-y-auto", contentClassName)}>
            <PageContainer maxWidth={maxWidth} padded={padded}>
              {children}
            </PageContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
