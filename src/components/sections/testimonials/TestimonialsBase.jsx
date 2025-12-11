// src/components/marketing/testimonials/TestimonialsBase.jsx
"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 0.61, 0.36, 1] },
  },
};

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
    scale: 0.98,
  }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (direction) => ({
    x: direction > 0 ? -40 : 40,
    opacity: 0,
    scale: 0.98,
  }),
};

function TestimonialSlide({ testimonial }) {
  const { quote, name, role, avatarSrc, avatarAlt } = testimonial;

  return (
    <div className="w-full">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
          “{quote}”
        </p>

        {avatarSrc && (
          <div className="mt-6 h-14 w-14 overflow-hidden rounded-full bg-accent/20">
            <Image
              src={avatarSrc}
              alt={avatarAlt || `${name} avatar`}
              width={56}
              height={56}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="mt-3">
          <p className="text-sm font-semibold text-foreground">{name}</p>
          {role && (
            <p className="mt-0.5 text-xs text-muted-foreground">{role}</p>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * TestimonialsBase – simple single-quote carousel for customer quotes.
 */
export function TestimonialsBase({
  id,
  eyebrow,
  title = "What customers say",
  subtitle,
  align = "center",
  maxWidth = "max-w-4xl",
  className,
  testimonials = [],
  autoplay = true,
  autoplayInterval = 5000,
  animateIn = true,
}) {
  const slideCount = testimonials.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const goTo = useCallback(
    (index) => {
      if (!slideCount) return;
      const next = ((index % slideCount) + slideCount) % slideCount;
      setDirection(next > currentIndex ? 1 : -1);
      setCurrentIndex(next);
    },
    [currentIndex, slideCount]
  );

  const goNext = useCallback(() => {
    goTo(currentIndex + 1);
  }, [currentIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo(currentIndex - 1);
  }, [currentIndex, goTo]);

  useEffect(() => {
    if (!autoplay || slideCount <= 1 || isHovered) return;

    const timer = setInterval(() => {
      goNext();
    }, autoplayInterval);

    return () => clearInterval(timer);
  }, [autoplay, autoplayInterval, slideCount, isHovered, goNext]);

  if (!slideCount) return null;

  const sectionContent = (
    <div
      className="mt-8 rounded-2xl border bg-card/50 px-4 py-8 sm:px-6 sm:py-10 lg:px-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative mx-auto flex max-w-3xl items-center justify-center"
        aria-roledescription="carousel"
        aria-label={title}
      >
        {/* Prev */}
        {slideCount > 1 && (
          <div className="absolute left-0 z-10 hidden sm:block">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-full shadow-sm"
              onClick={goPrev}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        )}

        {/* Slide */}
        <div className="w-full px-1 sm:px-6">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 30,
                mass: 0.9,
              }}
            >
              <TestimonialSlide
                testimonial={testimonials[currentIndex]}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next */}
        {slideCount > 1 && (
          <div className="absolute right-0 z-10 hidden sm:block">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-full shadow-sm"
              onClick={goNext}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        )}
      </div>

      {/* Dots */}
      {slideCount > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((t, index) => {
            const isActive = index === currentIndex;
            const label = t?.name
              ? `Go to testimonial from ${t.name}`
              : `Go to slide ${index + 1}`;

            return (
              <button
                key={t.id ?? index}
                type="button"
                onClick={() => goTo(index)}
                aria-label={label}
                aria-current={isActive ? "true" : "false"}
                className={cn(
                  "h-2 w-2 rounded-full bg-muted transition-all duration-200",
                  isActive && "w-5 bg-primary"
                )}
              />
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <SectionWrapper id={id} className={className}>
      <div className={cn("mx-auto", maxWidth)}>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          align={align}
        />

        {animateIn ? (
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {sectionContent}
          </motion.div>
        ) : (
          sectionContent
        )}
      </div>
    </SectionWrapper>
  );
}
