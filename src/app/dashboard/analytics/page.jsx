import { AnalyticsHeaderBase } from "@/components/dashboard/metrics/AnalyticsHeaderBase";
import { MetricGridBase } from "@/components/dashboard/metrics/MetricGridBase";
import { MetricCardBase } from "@/components/dashboard/metrics/MetricCardBase";
import { ChartGridBase } from "@/components/dashboard/charts/ChartGridBase";
import { AreaChartBase } from "@/components/dashboard/charts/AreaChartBase";
import { BarChartBase } from "@/components/dashboard/charts/BarChartBase";
import { RadialChartBase } from "@/components/dashboard/charts/RadialChartBase";
import { ChartCardBase } from "@/components/dashboard/charts/ChartCardBase";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Users,
  ShoppingCart,
  Wallet,
  PieChart, BarChart3
} from "lucide-react";
import {
  revenueTrendConfig,
  revenueTrendData,
  signupsByChannelConfig,
  signupsByChannelData,
  planMixConfig,
  planMixData,
} from "@/config/analyticsChart";

const KPI_CARDS = [
  {
    title: "Monthly Revenue",
    icon: <Wallet className="h-4 w-4" />,
    value: "12,480",
    prefix: "$",
    delta: "+8.2%",
    deltaDirection: "up",
    deltaLabel: "vs last month",
    description: "Total revenue from paid subscriptions this month.",
  },
  {
    title: "New Customers",
    icon: <Users className="h-4 w-4" />,
    value: "318",
    delta: "+4.1%",
    deltaDirection: "up",
    deltaLabel: "vs last month",
    description: "Unique customers created in the last 30 days.",
  },
  {
    title: "Orders",
    icon: <ShoppingCart className="h-4 w-4" />,
    value: "1,204",
    delta: "-2.7%",
    deltaDirection: "down",
    deltaLabel: "vs last month",
    description: "Total completed orders in the last 30 days.",
  },
  {
    title: "Conversion Rate",
    icon: <TrendingUp className="h-4 w-4" />,
    value: "3.6",
    suffix: "%",
    delta: "0.0%",
    deltaDirection: "neutral",
    deltaLabel: "vs last month",
    description: "Visitors who converted into signups or purchases.",
  },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <AnalyticsHeaderBase
        eyebrow="Analytics"
        title="Overview"
        subtitle="Track your key KPIs at a glance and spot trends over time."
        rightSlot={
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline">
              Last 30 days
            </Button>
            <Button size="sm">Export</Button>
          </div>
        }
      />

      <MetricGridBase preset="kpi">
        {KPI_CARDS.map((card) => (
          <MetricCardBase key={card.title} {...card} />
        ))}
      </MetricGridBase>

      <AnalyticsHeaderBase
        eyebrow="Analytics"
        title="KPIs & Charts"
        subtitle="A config-driven starter set of charts using shadcn ChartContainer + Recharts."
        rightSlot={
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline">
              Last 30 days
            </Button>
            <Button size="sm">Export</Button>
          </div>
        }
      />

      <ChartGridBase preset="oneCol">
        {/* 1) Area Chart */}
        <ChartCardBase
          eyebrow="Trends"
          title="Revenue vs Expenses"
          description="Monthly revenue, expenses, and profit (12 months)."
          headerIcon={<TrendingUp className="h-4 w-4" />}
          minHeight="lg"
          toolbar={
            <>
              <Button size="sm" variant="outline">
                12 months
              </Button>
              <Button size="sm" variant="outline">
                YTD
              </Button>
            </>
          }
        >
          <AreaChartBase
            data={revenueTrendData}
            config={revenueTrendConfig}
            indexKey="month"
            stacked={false}
            gradient
            legend
          />
        </ChartCardBase>
        </ChartGridBase>
<ChartGridBase preset="twoCol">
        {/* 2) Bar Chart */}
        <ChartCardBase
          eyebrow="Acquisition"
          title="Signups by Channel"
          description="Organic vs ads vs referrals (monthly)."
          headerIcon={<BarChart3 className="h-4 w-4" />}
          minHeight="lg"
        >
          <BarChartBase
            data={signupsByChannelData}
            config={signupsByChannelConfig}
            indexKey="month"
            stacked
            legend
            grid
          />
        </ChartCardBase>

        {/* 3) Radial Chart (stacked gauge) */}
        <ChartCardBase
          eyebrow="Distribution"
          title="Plan Mix"
          description="Active customers by plan tier."
          headerIcon={<PieChart className="h-4 w-4" />}
          minHeight="md"
        >
          <RadialChartBase
            data={planMixData}
            config={planMixConfig}
            keys={["starter", "pro", "premium"]}
            centerLabel="Customers"
            centerSubLabel="All active plans"
          />
        </ChartCardBase>
      </ChartGridBase>
    </div>
  );
}