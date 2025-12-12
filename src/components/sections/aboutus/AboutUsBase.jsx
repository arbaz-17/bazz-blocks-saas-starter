
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

import { cn } from "@/lib/utils";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};


export function AboutBase({
  id,
  eyebrow,
  title = "Meet the people behind this",
  subtitle,
  align = "center",
  maxWidth = "max-w-6xl",
  className,
  people = [],
  animateIn = true,
}) {
  const hasPeople = Array.isArray(people) && people.length > 0;

  const motionProps = animateIn
    ? {
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, amount: 0.2 },
        variants: containerVariants,
      }
    : {};

  return (
    <SectionWrapper id={id} maxWidth={maxWidth} className={className}>
      <div className="flex flex-col gap-8 md:gap-10">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          align={align}
          className="mx-auto max-w-3xl"
        />

        {hasPeople && (
          <motion.div
            {...motionProps}
            className={cn(
              "flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-7"
            )}
          >
            {people.map((person, index) => (
              <motion.article
                key={person.id || person.name || index}
                variants={cardVariants}
                className={cn(
                  "group relative",
                  "w-full max-w-[190px]",
                  "sm:max-w-[200px] md:max-w-[210px]"
                )}
              >
                <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl border bg-muted/40 shadow-sm">
                  <Image
                    src={person.imageSrc}
                    alt={person.imageAlt || person.name || "Team member"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent opacity-90" />

                  <div className="absolute inset-x-3 bottom-3">
                    <div
                      className={cn(
                        "flex items-center justify-between gap-3",
                        "rounded-xl border bg-card/95 px-3 py-2",
                        "shadow-md backdrop-blur-sm"
                      )}
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {person.name}
                        </p>
                        {person.role && (
                          <p className="truncate text-[11px] text-muted-foreground">
                            {person.role}
                          </p>
                        )}
                      </div>

                      {person.linkedinUrl && (
                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="h-8 shrink-0 px-2 text-xs"
                        >
                          <a
                            href={person.linkedinUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <span className="sr-only">
                              {person.socialLabel ||
                                `View ${person.name} on LinkedIn`}
                            </span>
                            <Linkedin
                              className="h-4 w-4"
                              aria-hidden="true"
                            />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </SectionWrapper>
  );
}
