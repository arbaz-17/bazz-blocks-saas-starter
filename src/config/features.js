// src/config/landing-page.js

export const featuresSectionConfig = {
  id: "features",
  eyebrow: "Build once, reuse everywhere",
  title: "Turn product ideas into reusable feature sections",
  subtitle:
    "Describe each feature in a small config object—title, copy, image, CTA—and this section handles layout, responsiveness, and motion for you.",
  align: "left",
  layout: "columns", // default for all features ("columns" | "stacked")
  features: [
    {
      badge: "Config-first",
      eyebrow: "Describe, don’t hand-code",
      title: "Define features as data, not JSX noise",
      description:
        "Each card is powered by a simple config object, so you can tweak titles, descriptions, and CTAs without digging through markup. Perfect for quickly iterating on your SaaS landing page.",
      image: "/images/hero-logo.png",
      mediaSide: "right",
      cta: {
        label: "See feature config",
        href: "#",
      },
    },
    {
      badge: "Layout aware",
      eyebrow: "Columns or stacked",
      title: "Switch layouts without rewriting components",
      description:
        "Use a columns layout when you want side-by-side storytelling, or flip a single feature to stacked when you need a tall, storytelling block. All of it is controlled from the config.",
      image: "/images/hero-logo.png",
      mediaSide: "left",
      cta: {
        label: "Try stacked layout",
        href: "#",
      },
    },
    {
      badge: "Launch-ready",
      eyebrow: "Copy + paste friendly",
      title: "Drop into any Next.js SaaS starter",
      description:
        "Built for App Router, Tailwind, and shadcn/ui, this section plugs straight into your existing layout and plays nicely with dark mode, responsive breakpoints, and your design tokens.",
      image: "/images/hero-logo.png",
      layout: "stacked",
      cta: {
        label: "Use in your project",
        href: "#",
      },
    },
  ],
};



export const stepsSectionConfig = {
  id: "how-it-works",
  eyebrow: "Explain the journey",
  title: "Turn your onboarding into a clear, 3-step story",
  subtitle:
    "Describe each step of your product journey in a small config object, and this timeline turns it into an easy-to-scan “how it works” section for your landing page.",
  align: "left",
  stepsAlign: "left",
  steps: [
    {
      step: "01",
      eyebrow: "Define your flow",
      title: "Describe each step as data, not hard-coded JSX",
      meta: "1–2 minutes",
      description:
        "Give each step a title, description, and optional meta label like “Day 1” or “5–10 min”. The component handles numbering, spacing, and timeline connectors automatically.",
    },
    {
      step: "02",
      eyebrow: "Map your product journey",
      title: "Show users how they move from idea to value",
      meta: "At a glance",
      description:
        "Use the steps to walk through sign-up, setup, and first value. This reduces friction for new visitors and makes your product feel more approachable.",
      highlight: true,
    },
    {
      step: "03",
      eyebrow: "Iterate fast",
      title: "Reorder, add, or remove steps without touching layout code",
      meta: "Config only",
      description:
        "Because everything is config-driven, you can update the story as your product evolves—no need to rebuild the design or fight with CSS each time.",
    },
  ],
};
