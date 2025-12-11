export const viewportConfig = {
  once: true,
  amount: 0.2, // how much of the element must be visible to trigger
};

/**
 * Basic fade-in with no vertical movement.
 * Good for headlines, section headers, simple elements.
 */
export const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

/**
 * Fade-in + slight upward motion.
 * Great for cards, list items, feature blocks, etc.
 */
export const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

/**
 * Staggered children inside a section or container.
 * Use on a parent <motion.div> or <motion.section>.
 */
export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

/**
 * Default motion props we can spread onto motion components.
 * This keeps our components cleaner.
 */
export const defaultMotionProps = {
  initial: "hidden",
  whileInView: "show",
  viewport: viewportConfig,
};
