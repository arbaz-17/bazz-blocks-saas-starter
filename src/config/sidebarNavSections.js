
import {
  LayoutDashboard,
  BarChart3,
  ListTodo,
  Users2,
  CalendarClock,
  Workflow,
  FileText,
  Settings,
  CreditCard,
  LifeBuoy,
} from "lucide-react";

export const sidebarNavSections = [
  {
    id: "main",
    label: "Main",
    items: [
      {
        id: "overview",
        label: "Overview",
        href: "/dashboard",
        exact: true,
        icon: <LayoutDashboard className="h-4 w-4" aria-hidden="true" />,
      },
      {
        id: "analytics",
        label: "Analytics",
        icon: <BarChart3 className="h-4 w-4" aria-hidden="true" />,
        children: [
          {
            id: "analytics-overview",
            label: "Overview",
            href: "/dashboard/analytics",
          },
          {
            id: "analytics-funnels",
            label: "Funnels",
            href: "/dashboard/analytics/funnels",
          },
          {
            id: "analytics-retention",
            label: "Retention",
            href: "/dashboard/analytics/retention",
          },
        ],
      },
      {
        id: "tasks",
        label: "Tasks",
        href: "/dashboard/tasks",
        icon: <ListTodo className="h-4 w-4" aria-hidden="true" />,
      },
      {
        id: "calendar",
        label: "Calendar",
        href: "/dashboard/calendar",
        icon: <CalendarClock className="h-4 w-4" aria-hidden="true" />,
      },
    ],
  },
  {
    id: "workspace",
    label: "Workspace",
    items: [
      {
        id: "accounts",
        label: "Accounts",
        href: "/dashboard/accounts",
        icon: <Users2 className="h-4 w-4" aria-hidden="true" />,
      },
      {
        id: "pipeline",
        label: "Pipeline",
        href: "/dashboard/pipeline",
        icon: <Workflow className="h-4 w-4" aria-hidden="true" />,
        badgeLabel: "Beta",
        badgeTone: "warning",
      },
      {
        id: "reports",
        label: "Reports",
        href: "/dashboard/reports",
        icon: <FileText className="h-4 w-4" aria-hidden="true" />,
      },
    ],
  },
  {
    id: "settings",
    label: "Admin & Settings",
    items: [
      {
        id: "settings-general",
        label: "Settings",
        href: "/dashboard/settings",
        icon: <Settings className="h-4 w-4" aria-hidden="true" />,
      },
      {
        id: "billing",
        label: "Billing",
        href: "/dashboard/billing",
        icon: <CreditCard className="h-4 w-4" aria-hidden="true" />,
      },
      {
        id: "support",
        label: "Help & Support",
        href: "/dashboard/support",
        icon: <LifeBuoy className="h-4 w-4" aria-hidden="true" />,
      },
    ],
  },
];
