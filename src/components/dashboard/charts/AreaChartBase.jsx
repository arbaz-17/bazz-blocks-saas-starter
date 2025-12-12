// src/components/analytics/charts/recharts/AreaChartBase.jsx
"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

/**
 * AreaChartBase (Recharts + shadcn ChartContainer)
 *
 * Props:
 * - data: array (required)
 * - config: ChartConfig (required) -> { key: { label, color } }
 * - indexKey?: string (default: "month")
 * - seriesKeys?: string[] (optional override)
 * - stacked?: boolean (default: false)
 * - gradient?: boolean (default: true)
 * - legend?: boolean (default: false)
 * - grid?: boolean (default: true)
 * - className?: string
 */
export function AreaChartBase({
  data = [],
  config,
  indexKey = "month",
  seriesKeys,
  stacked = false,
  gradient = true,
  legend = false,
  grid = true,
  className,
}) {
  const id = React.useId();

  const keys = React.useMemo(() => {
    if (Array.isArray(seriesKeys) && seriesKeys.length) return seriesKeys;

    return Object.entries(config || {})
      .filter(([, v]) => v && v.color)
      .map(([k]) => k);
  }, [config, seriesKeys]);

  const tickFormatter = (v) =>
    typeof v === "string" ? v.slice(0, 3) : String(v ?? "");

  const indicator = keys.length > 1 ? "dot" : "line";

  return (
    <ChartContainer config={config} className={cn("h-full w-full", className)}>
      <AreaChart data={data} accessibilityLayer margin={{ left: 12, right: 12 }}>
        {/* Gradients */}
        {gradient && keys.length > 0 ? (
          <defs>
            {keys.map((key) => {
              const gradientId = `${id}-fill-${key}`;
              const colorVar = `var(--color-${key})`;
              return (
                <linearGradient key={gradientId} id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colorVar} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={colorVar} stopOpacity={0.1} />
                </linearGradient>
              );
            })}
          </defs>
        ) : null}

        {grid ? <CartesianGrid vertical={false} /> : null}

        <XAxis
          dataKey={indexKey}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={tickFormatter}
        />

        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator={indicator} />}
        />

        {keys.map((key) => {
          const colorVar = `var(--color-${key})`;
          const gradientId = `${id}-fill-${key}`;
          return (
            <Area
              key={key}
              dataKey={key}
              type="monotone"
              stackId={stacked ? "a" : undefined}
              stroke={colorVar}
              fill={gradient ? `url(#${gradientId})` : colorVar}
              fillOpacity={gradient ? 1 : 0.35}
            />
          );
        })}

        {legend ? <ChartLegend content={<ChartLegendContent />} /> : null}
      </AreaChart>
    </ChartContainer>
  );
}
