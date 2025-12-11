export const heroSectionConfig = {
  id: "hero",
  layout: "overlay-center",
  align: "center",
  background: {
    type: "image",
    imageSrc: "/images/hero-bg.png", // public/images/hero-image.svg
    imageAlt: "Bazz Blocks hero background",
    imagePosition: "center",
    overlay: "auto", // "dark" | "light" | "none" | "auto"
  },
  eyebrow: "Run your SaaS faster",
  title: "Build beautiful Landing Pages, dashboards, tables and charts in minutes.",
  subtitle:
    "Bazz Blocks gives you production-ready sections for your SaaS starter so you can move from idea to launch faster.",
  primaryCta: {
    label: "Get started free",
    href: "/signup",
  },
  secondaryCta: {
    label: "Browse components",
    href: "/components",
  },
  stats: [
    { label: "Components", value: "30+" },
    { label: "Starter downloads", value: "500+" },
  ],
};



export const logoStripSectionConfig = {
  id: "tech-logos",
  eyebrow: "Show, don’t tell",
  title: "Highlight the tools your product is built on",
  subtitle:
    "Swap in your own stack logos and this infinite marquee instantly becomes a credibility strip for your landing page—perfect for showing developers you speak their language.",
  align: "center",
  speed: "normal", // "slow" | "normal" | "fast"
  logos: [
    {
      src: "/tech-logos/cursor.svg",
      name: "Cursor",
      alt: "Cursor logo",
    },
    {
      src: "/tech-logos/docker.svg",
      name: "Docker",
      alt: "Docker logo",
    },
    {
      src: "/tech-logos/figma.svg",
      name: "Figma",
      alt: "Figma logo",
    },
    {
      src: "/tech-logos/framer-motion.svg",
      name: "Framer Motion",
      alt: "Framer Motion logo",
    },
    {
      src: "/tech-logos/gemini.svg",
      name: "Gemini",
      alt: "Gemini logo",
    },
    {
      src: "/tech-logos/js.svg",
      name: "JavaScript",
      alt: "JavaScript logo",
    },
    {
      src: "/tech-logos/mongodb.svg",
      name: "MongoDB",
      alt: "MongoDB logo",
    },

    {
      src: "/tech-logos/ps.svg",
      name: "Photoshop",
      alt: "Adobe Photoshop logo",
    },
    {
      src: "/tech-logos/tailwind.svg",
      name: "Tailwind CSS",
      alt: "Tailwind CSS logo",
    },
    {
      src: "/tech-logos/ts.svg",
      name: "TypeScript",
      alt: "TypeScript logo",
    },
    {
      src: "/tech-logos/vscode.svg",
      name: "VS Code",
      alt: "Visual Studio Code logo",
    },
  ],
};
