// src/components/analytics/charts/recharts/BarChartBase.jsx
"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

/**
 * BarChartBase (simple vertical bars)
 *
 * Props:
 * - data: array (required)
 * - config: ChartConfig (required)
 * - indexKey?: string (default: "month")
 * - seriesKeys?: string[] (optional override)
 * - stacked?: boolean (default: false)
 * - legend?: boolean (default: false)
 * - grid?: boolean (default: true)
 * - radius?: number (default: 4)
 * - className?: string
 */
export function BarChartBase({
  data = [],
  config,
  indexKey = "month",
  seriesKeys,
  stacked = false,
  legend = false,
  grid = true,
  radius = 3,
  className,
}) {
  const keys = React.useMemo(() => {
    if (Array.isArray(seriesKeys) && seriesKeys.length) return seriesKeys;

    return Object.entries(config || {})
      .filter(([, v]) => v && v.color)
      .map(([k]) => k);
  }, [config, seriesKeys]);

  const tickFormatter = (v) =>
    typeof v === "string" ? v.slice(0, 3) : String(v ?? "");

  const indicator = keys.length > 1 ? "dashed" : "line";

  return (
    <ChartContainer config={config} className={cn("h-full w-full", className)}>
      <BarChart data={data} accessibilityLayer margin={{ left: 12, right: 12 }}>
        {grid ? <CartesianGrid vertical={false} /> : null}

        <XAxis
          dataKey={indexKey}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          minTickGap={32}
          tickFormatter={tickFormatter}
        />

        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator={indicator} />}
        />

        {keys.map((key) => (
          <Bar
            key={key}
            dataKey={key}
            stackId={stacked ? "a" : undefined}
            fill={`var(--color-${key})`}
            radius={radius}
          />
        ))}

        {legend ? <ChartLegend content={<ChartLegendContent />} /> : null}
      </BarChart>
    </ChartContainer>
  );
}
