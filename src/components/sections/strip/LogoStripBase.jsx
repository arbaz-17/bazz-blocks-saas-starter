
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeader } from "@/components/layout/SectionHeader";
import "@/styles/logo-strip.css"

const SPEED_MAP = {
  slow: "40s",
  normal: "25s",
  fast: "16s",
};

/**
 * LogoStripBase – infinite scrolling logo marquee section.
 *
 * Props:
 * - id?: string
 * - eyebrow?: string
 * - title?: string
 * - subtitle?: string
 * - align?: "left" | "center" | "right"
 * - logos: { src: string; name?: string; alt?: string; href?: string }[]
 * - speed?: "slow" | "normal" | "fast"
 * - className?: string
 */

export function LogoStripBase({
  id,
  eyebrow,
  title,
  subtitle,
  align = "center",
  logos = [],
  speed = "normal",
  className,
}) {
  if (!logos || logos.length === 0) return null;

  const duration = SPEED_MAP[speed] ?? SPEED_MAP.normal;

  const alignClass =
    align === "left"
      ? "items-start text-left"
      : align === "right"
      ? "items-end text-right"
      : "items-center text-center";

  return (
    <SectionWrapper id={id} className={className}>
      <div className="mx-auto w-full max-w-6xl">
        {(eyebrow || title || subtitle) && (
          <div className={cn("flex flex-col gap-2", alignClass)}>
            <SectionHeader
              eyebrow={eyebrow}
              title={title}
              subtitle={subtitle}
              align={align}
            />
          </div>
        )}

        <div className="mt-6">
          <div className="inline-flex w-full flex-nowrap overflow-hidden py-6 [mask-image:linear-gradient(to_right,transparent_0,black_64px,black_calc(100%-64px),transparent_100%)]">
            <LogosList logos={logos} duration={duration} />
            <LogosList logos={logos} duration={duration} ariaHidden />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

function LogoItem({ logo }) {
  const img = (
    <Image
      src={logo.src}
      alt={logo.alt || `${logo.name ?? "Logo"}`}
      width={180}
      height={64}
      className="h-10 w-auto object-contain sm:h-12"
    />
  );

  if (logo.href) {
    return (
      <Link
        href={logo.href}
        aria-label={logo.name}
        className="inline-flex items-center justify-center"
      >
        {img}
      </Link>
    );
  }

  return (
    <div className="inline-flex items-center justify-center">{img}</div>
  );
}

function LogosList({ logos, duration, ariaHidden = false }) {
  return (
    <ul
      className="flex shrink-0 items-center justify-center md:justify-start [&>li]:mx-4 sm:[&>li]:mx-8 [&_img]:max-w-none animate-infinite-scroll"
      style={{ "--logo-marquee-duration": duration }}
      aria-hidden={ariaHidden || undefined}
    >
      {logos.map((logo, idx) => (
        <li key={`${logo.name ?? "logo"}-${idx}`}>
          <LogoItem logo={logo} />
        </li>
      ))}
    </ul>
  );
}
