// src/components/dashboard/layout/PageHeader.jsx
import { cn } from "@/lib/utils";
import { DashboardBreadcrumbs } from "./DashboardBreadcrumbsBase";

/**
 * PageHeader (Base)
 * Props:
 * - title: string | ReactNode
 * - subtitle?: string | ReactNode
 * - breadcrumbItems?: { label; href? }[]
 * - actions?: ReactNode
 */
export function PageHeader({
  title,
  subtitle,
  breadcrumbItems,
  actions,
  className,
}) {
  return (
    <header className={cn("w-full mb-4 sm:mb-6", className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          {breadcrumbItems?.length ? (
            <div className="mb-1">
              <DashboardBreadcrumbs items={breadcrumbItems} />
            </div>
          ) : null}

          {title ? (
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
              {title}
            </h1>
          ) : null}

          {subtitle ? (
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
              {subtitle}
            </p>
          ) : null}
        </div>

        {actions ? (
          <div className="flex w-full sm:w-auto justify-start sm:justify-end">
            <div className="flex flex-wrap items-center gap-2">{actions}</div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
