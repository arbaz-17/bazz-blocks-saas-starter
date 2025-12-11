export const navItems = [
  {
    label: "Product",
    href: "/product",
    children: [
      {
        label: "Overview",
        href: "/product",
        description: "See how it works",
      },
      {
        label: "Pricing",
        href: "/pricing",
        description: "Simple plans for growing teams",
      },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Blog", href: "/blog" },
      { label: "Docs", href: "/docs" },
    ],
  },
  {
    label: "Customers",
    href: "/customers",
  },
];

export const cta = {
  label: "Get started",
  href: "/signup",
};