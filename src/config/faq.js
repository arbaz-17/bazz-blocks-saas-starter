// src/config/landing-page.js

export const faqSectionConfig = {
  id: "faq",
  eyebrow: "Questions from other builders",
  title: "Everything you’re probably wondering already",
  subtitle:
    "Use this FAQ block to explain how the free Bazz Blocks SaaS Starter, Bazz Blocks Pro, and NexBolt fit together in your stack.",
  align: "left",
  faqs: [
    {
      id: "what-is-starter",
      question: "What exactly is the Bazz Blocks SaaS Starter?",
      answer:
        "It’s a free, stripped-down version of my internal UI system: opinionated sections like navbar, hero, features, pricing, testimonials, FAQ and more. Everything is config-driven and built for Next.js + Tailwind + ShadCN, so you can wire real content instead of hand-rolling layout every time.",
    },
    {
      id: "difference-pro",
      question: "How is Bazz Blocks Pro different from the free starter?",
      answer:
        "The starter gives you a solid tip of the iceberg: one clean variant per section. Bazz Blocks Pro adds multiple layouts, advanced props, dashboard shells, CRUD table kits, analytics views, and much deeper configuration for production SaaS dashboards and marketing sites.",
    },
    {
      id: "where-nexbolt-fits",
      question: "Where does NexBolt fit into all of this?",
      answer:
        "Bazz Blocks focuses on the UI layer. NexBolt is a full Next.js boilerplate that ships with auth, routing, API patterns, and a database-ready backend. You can use the SaaS Starter on any project, or combine Bazz Blocks Pro + NexBolt to go from idea to real SaaS in days instead of weeks.",
    },
    {
      id: "client-work",
      question: "Can I use the SaaS Starter for client projects?",
      answer:
        "Yes. The free starter is perfect for agencies and freelancers who need a clean, modern SaaS layout fast. You keep full control of the codebase, can customize the sections, and upgrade to Pro later if you want deeper navigation, tables, or analytics components.",
    },
    {
      id: "stack-lockin",
      question: "Am I locked into a special design system or theme?",
      answer:
        "No. Everything is built on plain Tailwind, ShadCN, and Framer Motion. The starter is deliberately minimal so you can drop it into an existing design system or evolve it into your own, without fighting hidden theme layers or magic CSS.",
    },
    {
      id: "next-steps",
      question: "What’s the fastest way to see this FAQ in my own project?",
      answer:
        "Clone the starter, update this FAQ config with your own questions about pricing, onboarding, or product limits, and drop the <FAQBase /> section near the end of your landing page. You’ll have a real, trust-building FAQ in minutes.",
    },
  ],
};
