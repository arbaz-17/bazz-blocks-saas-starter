// src/config/landing-page.js

export const pricingSectionConfig = {
  id: "pricing",
  eyebrow: "Start light, scale when it pays off",
  title: "Choose how deep you want to go with Bazz Blocks & NexBolt",
  subtitle:
    "Begin with the free starter to explore the components, then upgrade to Bazz Blocks Pro or NexBolt when you’re ready to ship serious SaaS.",
  align: "center",
  note:
    "Need team licensing or custom terms? Add a note in your contact form and we’ll work something out.",
  plans: [
    {
      id: "free-starter",
      badge: "Free",
      title: "Free Starter",
      price: "$0",
      priceSuffix: "/forever",
      description:
        "Use the base Bazz Blocks SaaS starter to ship a clean landing page without paying a cent.",
      emphasis:
        "Perfect if you just want to try the core components before committing to Pro.",
      features: [
        "Navbar, hero, features, steps, logo strip, and pricing sections included",
        "Config-driven content with simple JavaScript objects instead of hard-coded JSX",
        "Built for Next.js App Router and Tailwind CSS v4 out of the box",
        "Shadcn/ui buttons and layout primitives already wired in",
        "Responsive defaults that look good on mobile, tablet, and desktop without extra tuning",
        "Subtle Framer Motion animations you can turn on or off with a single prop",
        "Clean, commented code you can treat as a learning resource or starting point",
      ],
      ctaLabel: "Download free starter",
      ctaHref: "#get-free-starter",
      featured: false,
    },
    {
      id: "bazz-blocks-pro",
      badge: "Most popular",
      title: "Bazz Blocks Pro",
      price: "$89",
      priceSuffix: "one-time",
      discountLabel: "Early-access founder pricing",
      description:
        "Unlock the full library of config-driven UI sections, advanced variants, and production-ready layouts.",
      emphasis:
        "Best choice if you’re serious about shipping multiple SaaS products and dashboards fast.",
      features: [
        "Dozens of marketing sections: heroes, feature grids, FAQs, testimonials, CTAs, and more",
        "Dashboard-ready components: CRUD tables, filters, analytics shells, and chart wrappers",
        "Multiple layout variants per section (alignments, column ratios, media positions, etc.)",
        "Deeper configuration options for typography, spacing, and visual tone",
        "Tight integration with Next.js, Tailwind v4, shadcn/ui, Framer Motion, and Recharts",
        "Example configs for typical SaaS use cases: subscription billing, analytics, onboarding, and support",
        "Ongoing updates as new sections and patterns are added to the Bazz Blocks system",
      ],
      ctaLabel: "Join Bazz Blocks Pro waitlist",
      ctaHref: "#bazz-blocks-pro",
      featured: true,
      highlightLabel: "Best for SaaS builders",
    },
    {
      id: "nexbolt",
      badge: "Full-stack boilerplate",
      title: "NexBolt SaaS Boilerplate",
      price: "$249",
      priceSuffix: "one-time",
      description:
        "A complete Next.js SaaS boilerplate that pairs perfectly with Bazz Blocks for end-to-end shipping.",
      emphasis:
        "Start from a real SaaS foundation: auth, billing, dashboards, and backend APIs wired in from day one.",
      features: [
        "Opinionated Next.js App Router project structure for serious products, not demos",
        "Pre-wired authentication flow with protected routes and role-aware navigation",
        "Database-ready backend layer so you can plug in Postgres or your preferred SQL stack",
        "Built-in support for subscriptions and metered billing integrations",
        "Starter dashboard with layout, sidebar, and analytics placeholders ready for Bazz Blocks Pro",
        "Environment-driven configuration for local, staging, and production environments",
        "Designed to drop in Bazz Blocks components so UI and backend grow together cleanly",
      ],
      ctaLabel: "Explore NexBolt",
      ctaHref: "#nexbolt",
      featured: false,
    },
  ],
};
