// src/config/landing-page.js

export const testimonialsSectionConfig = {
  id: "testimonials",
  eyebrow: "Social proof, wired by config",
  title: "What other developers ship with this testimonial carousel",
  subtitle:
    "This section is powered entirely by a simple array of testimonials. Swap in your own quotes, names, and avatars to turn it into instant proof that real people trust your product.",
  align: "center",
  testimonials: [
    {
      id: 1,
      quote:
        "I didn’t have to design a testimonials section from scratch. I just dropped this carousel into my page, pasted three objects into a config file, and suddenly my landing felt like a real SaaS instead of a blank template.",
      name: "Sara Malik",
      role: "Indie SaaS founder",
      avatarSrc: "/person/t1.jpg",
      avatarAlt: "Photo of Sara Malik",
    },
    {
      id: 2,
      quote:
        "The nicest part is that this isn’t locked to dummy lorem ipsum. The carousel, dots, arrows and autoplay all come from the component – I only maintain a tiny list of customer stories in one place. It feels like plugging real data into a UI system, not fiddling with JSX.",
      name: "Jonathan Reyes",
      role: "Full-stack engineer at a seed-stage startup",
      avatarSrc: "/person/t1.jpg",
      avatarAlt: "Photo of Jonathan Reyes",
    },
    {
      id: 3,
      quote:
        "For client work, this testimonial block is a cheat code. I clone the starter, update the config with my client’s logos and quotes, and they think I custom-designed the carousel just for them. Under the hood, it’s the same clean Bazz Blocks + NexBolt stack every time.",
      name: "Emily Chen",
      role: "Freelance product developer",
      avatarSrc: "/person/t1.jpg",
      avatarAlt: "Photo of Emily Chen",
    },
  ],
};
