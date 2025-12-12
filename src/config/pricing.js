

export const pricingSectionConfig = {
  id: "pricing",
  eyebrow: "Start Free. Upgrade When You Ship.",
  title: "A Free Starter Template — With Clear Upgrade Paths",
  subtitle:
    "Free includes one version of each section plus a simple dashboard. Go Pro for more variants and configs, or choose NexBolt for the full SaaS backend (auth, billing, multi-tenancy, database, integrations).",
  align: "center",
  note:
    "Need team licensing or custom terms? Leave a note in the contact form and we’ll sort it out.",
  plans: [
    {
      id: "free-starter",
      badge: "Free Template",
      title: "Free Starter",
      price: "$0",
      priceSuffix: "/forever",
      description:
        "A clean, ready-to-deploy starter with core marketing sections and a lightweight dashboard—built to help you launch fast.",
      emphasis:
        "Includes the essentials (single-variant sections + a simple dashboard). Pro unlocks the full system.",
      features: [
        "Single-Version Landing Sections (Hero, Features, Steps, Logos, Pricing, FAQ)",
        "Config-Driven Content (edit simple JS objects, not hard-coded JSX)",
        "Simple Dashboard Shell With KPI Cards + Basic Charts",
        "Demo Table (starter layout for your first dataset)",
        "Next.js App Router + Tailwind CSS v4 Ready",
        "shadcn/ui Primitives Wired In (buttons, badges, layout basics)",
        "Responsive By Default (mobile → desktop)",
        "Optional Motion With Simple Toggles (Framer Motion ready)",
      ],
      ctaLabel: "Get The Free Starter",
      ctaHref: "#get-free-starter",
      featured: false,
    },
    {
      id: "bazz-blocks-pro",
      badge: "Most Popular",
      title: "Bazz Blocks Pro",
      price: "$89",
      priceSuffix: "one-time",
      discountLabel: "Early-Access Founder Pricing",
      description:
        "Unlock the full Bazz Blocks UI system: multiple variants per section, deeper configs, and a dashboard toolkit built for real SaaS.",
      emphasis:
        "Best For Builders Who Want Speed + Flexibility Across Multiple Products.",
      features: [
        "Multiple Variants Per Section (more heroes, feature layouts, CTAs, FAQs, etc.)",
        "Deeper, More Granular Config Controls (layout, spacing, tone, content)",
        "Dashboard-Ready Components (shells, filters, analytics blocks, chart wrappers)",
        "Upgraded CRUD Table Patterns (more controls, richer UX, more extensible)",
        "More Chart Options + Configurable Variants (beyond the basics)",
        "Production-Ready Layouts For SaaS (onboarding, support, analytics, billing UI)",
        "Tight Integration With Next.js, Tailwind v4, shadcn/ui, Framer Motion, Recharts",
        "Ongoing Updates As New Sections + Patterns Ship",
      ],
      ctaLabel: "Unlock Bazz Blocks Pro",
      ctaHref: "#bazz-blocks-pro",
      featured: true,
      highlightLabel: "Best For SaaS Builders",
    },
    {
      id: "nexbolt",
      badge: "Full-Stack",
      title: "NexBolt SaaS Boilerplate",
      price: "$249",
      priceSuffix: "one-time",
      description:
        "A complete SaaS foundation that pairs perfectly with Bazz Blocks—so your UI and backend ship together from day one.",
      emphasis:
        "Best If You Want Auth, Multi-Tenancy, Billing, Database, And Integrations Pre-Wired.",
      features: [
        "Opinionated App Structure Built For Real Products (not demos)",
        "Pre-Wired Authentication + Protected Routes",
        "Multi-Tenant-Ready Architecture (teams/orgs from the start)",
        "Database-Ready Backend Layer (plug in your SQL stack cleanly)",
        "Subscription + Metered Billing Support Hooks",
        "API Layer + Integration Scaffolding (webhooks, third-party flows)",
        "Starter Dashboard + Layout That Drops In Bazz Blocks Components Cleanly",
        "Environment-Based Setup For Local, Staging, And Production",
      ],
      ctaLabel: "Explore NexBolt",
      ctaHref: "https://nexbolt.vercel.app/",
      featured: false,
    },
  ],
};
