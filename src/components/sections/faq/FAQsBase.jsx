// src/components/marketing/faq/FAQBase.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeader } from "@/components/layout/SectionHeader";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 0.61, 0.36, 1] },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

/**
 * faqs: Array<{ id?: string | number; question: string; answer: string | React.ReactNode }>
 */
export function FAQBase({
  id,
  eyebrow,
  title = "Frequently asked questions",
  subtitle,
  align = "left",
  maxWidth = "max-w-3xl",
  className,
  faqs = [],
  animateIn = true,
}) {
  if (!faqs.length) return null;

  const MotionSection = animateIn ? motion.div : "div";
  const MotionItem = animateIn ? motion.div : "div";

  const defaultValue =
    faqs[0]?.id != null
      ? String(faqs[0].id)
      : faqs.length > 0
      ? "item-0"
      : undefined;

  return (
    <SectionWrapper id={id} className={className}>
      <MotionSection
        {...(animateIn
          ? {
              variants: sectionVariants,
              initial: "hidden",
              whileInView: "show",
              viewport: { once: true, amount: 0.2 },
            }
          : {})}
        className={cn("mx-auto", maxWidth)}
      >
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          align={align}
        />

        <Accordion
          type="single"
          collapsible
          defaultValue={defaultValue}
          className="mt-8 space-y-2"
        >
          {faqs.map((faq, index) => {
            const value =
              faq.id != null ? String(faq.id) : `item-${index}`;

            return (
              <MotionItem
                key={value}
                {...(animateIn ? { variants: itemVariants } : {})}
              >
                <AccordionItem
                  value={value}
                  className={cn(
                    "group rounded-2xl border border-border/70 bg-card/70",
                    "backdrop-blur-sm shadow-sm",
                    "transition-colors hover:border-primary/60"
                  )}
                >
                  <AccordionTrigger
                    className={cn(
                      "gap-3 px-4 py-3 sm:px-5 sm:py-4",
                      "hover:no-underline"
                    )}
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/40 text-accent-foreground">
                      <HelpCircle className="h-4 w-4" aria-hidden="true" />
                    </span>

                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-foreground sm:text-base">
                        {faq.question}
                      </p>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent
                    className={cn(
                      "px-4 pb-4 pt-0 sm:px-5 sm:pb-5",
                      "text-sm leading-relaxed text-muted-foreground"
                    )}
                  >
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </MotionItem>
            );
          })}
        </Accordion>
      </MotionSection>
    </SectionWrapper>
  );
}
