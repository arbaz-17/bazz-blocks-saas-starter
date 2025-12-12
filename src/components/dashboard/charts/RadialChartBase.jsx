
"use client";

import * as React from "react";
import { RadialBarChart, RadialBar, PolarRadiusAxis, Label } from "recharts";
import { cn } from "@/lib/utils";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

/**
 * RadialChartBase (stacked gauge)
 * - Opinionated: one-row stacked radial (great for plan mix / distribution)
 *
 * Data shape:
 *   data = [{ pro: 120, premium: 40, starter: 200 }]
 *
 * Props:
 * - data: array (required; first row is used)
 * - config: ChartConfig (required)
 * - keys?: string[] (optional override; otherwise auto-detect numeric keys from first row)
 * - centerLabel?: string (default: "Total")
 * - centerSubLabel?: string
 * - endAngle?: number (default: 180)
 * - innerRadius?: number (default: 70)
 * - outerRadius?: number (default: 120)
 * - showTooltip?: boolean (default: true)
 * - className?: string (ChartContainer)
 * - chartClassName?: string (wrap sizing)
 */
export function RadialChartBase({
  data = [],
  config,
  keys,
  centerLabel = "Total",
  centerSubLabel,
  endAngle = 180,
  innerRadius = 70,
  outerRadius = 120,
  showTooltip = true,
  className,
}) {
  const first = data?.[0] ?? null;

  const resolvedKeys = React.useMemo(() => {
    if (!first) return [];
    if (Array.isArray(keys) && keys.length) return keys;
    return Object.keys(first).filter((k) => typeof first[k] === "number");
  }, [first, keys]);

  const total = React.useMemo(() => {
    if (!first) return 0;
    return resolvedKeys.reduce(
      (sum, k) => sum + (Number(first[k]) || 0),
      0
    );
  }, [first, resolvedKeys]);

  if (!first) return null;

  return (
    <ChartContainer
      config={config}
      className={cn("h-full w-full max-h-[260px] mx-auto", className)}
    >
      {/* IMPORTANT: ChartContainer must wrap the chart directly */}
      <RadialBarChart
        data={data}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        endAngle={endAngle}
        accessibilityLayer
      >
        {showTooltip ? (
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        ) : null}

        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox)) return null;
              const cx = viewBox.cx;
              const cy = viewBox.cy;

              return (
                <text x={cx} y={cy} textAnchor="middle">
                  <tspan
                    x={cx}
                    y={(cy || 0) - 16}
                    className="fill-foreground text-2xl font-bold"
                  >
                    {total.toLocaleString()}
                  </tspan>
                  <tspan
                    x={cx}
                    y={(cy || 0) + 4}
                    className="fill-muted-foreground text-xs"
                  >
                    {centerLabel}
                  </tspan>
                  {centerSubLabel ? (
                    <tspan
                      x={cx}
                      y={(cy || 0) + 18}
                      className="fill-muted-foreground text-[11px]"
                    >
                      {centerSubLabel}
                    </tspan>
                  ) : null}
                </text>
              );
            }}
          />
        </PolarRadiusAxis>

        {resolvedKeys.map((k) => (
          <RadialBar
            key={k}
            dataKey={k}
            stackId="a"
            cornerRadius={5}
            className="stroke-transparent stroke-2"
            fill={`var(--color-${k})`}
          />
        ))}
      </RadialBarChart>
    </ChartContainer>
  );
}