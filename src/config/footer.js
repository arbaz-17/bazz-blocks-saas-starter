// src/config/landing-page.js
import Image from "next/image";

export const footerSectionConfig = {
  logo: (
    <Image
      src="/logo/logo.svg"
      alt="Bazz Blocks logo"
      width={20}
      height={20}
      className="h-5 w-5"
    />
  ),
  productName: "Bazz Blocks SaaS Starter",
  description:
    "A free, opinionated starting point for SaaS marketing pages and dashboards, built on the same patterns as my internal Bazz Blocks system.",
  navTitle: "Explore",
  navLinks: [
    {
      label: "See the starter sections",
      href: "#hero",
    },
    {
      label: "Upgrade to Bazz Blocks Pro",
      href: "#pricing",
    },
    {
      label: "Learn about NexBolt",
      href: "https://nexbolt.vercel.app/",
    },
    {
      label: "Read the FAQ",
      href: "#faq",
    },
  ],
  newsletter: {
    title: "Build once, reuse everywhere",
    description:
      "This footer ships with a ready-made newsletter slot. Plug it into your email tool and start collecting early users and product updates in minutes.",
    placeholder: "you@example.com",
    ctaLabel: "Join the launch list",
    helperText:
      "Tell visitors what they’ll get — behind-the-scenes dev notes, new component drops, or early discounts on Bazz Blocks Pro and NexBolt.",
  },
};
