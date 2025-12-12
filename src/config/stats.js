
import { Activity, Code2, Rocket } from "lucide-react";

export const statsRowSectionConfig = {
  id: "kpis",
  eyebrow: "Numbers that tell the story",
  title: "What changes when you start from a Bazz Blocks starter",
  subtitle:
    "These stats are just config objects. The component handles layout, animation, and styling so you can focus on the story you want to tell.",
  align: "center",
  cardAlign: "center",
  stats: [
    {
      id: "time-saved",
      icon: <Activity className="h-4 w-4" />,
      value: 40,
      suffix: "+",
      label: "Hours of UI setup saved",
      description:
        "Instead of wiring navbars, heroes, pricing, FAQs, and footers from scratch, drop in the starter and tweak a few configs.",
      highlight: true,
    },
    {
      id: "boilerplate-removed",
      icon: <Code2 className="h-4 w-4" />,
      value: 1200,
      suffix: "+",
      label: "Lines of boilerplate replaced by config",
      description:
        "Each stat card, section, and CTA is driven by small JavaScript objects instead of hand-written JSX everywhere.",
    },
    {
      id: "projects-shipped",
      icon: <Rocket className="h-4 w-4" />,
      value: 3,
      suffix: "+",
      label: "SaaS projects shipped on this stack",
      description:
        "Use this row to hint at your traction today – then point the same component at real metrics as your product grows.",
    },
  ],
};
