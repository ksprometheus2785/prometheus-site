"use client";

import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export type RevealFrom = "left" | "right" | "up";
export type RevealEffect = "slide" | "pop" | "fade";

export function Reveal({
  from = "up",
  effect = "slide",
  delay = 0,
  className,
  children
}: {
  from?: RevealFrom;
  effect?: RevealEffect;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 1.05", "start 0.55"]
  });

  const progress = useTransform(scrollYProgress, (v) => {
    const d = Math.min(Math.max(delay, 0), 0.18);
    const t = (v - d) / (1 - d);
    return Math.min(1, Math.max(0, t));
  });

  const x = useTransform(progress, [0, 1], [
    effect === "slide" ? (from === "left" ? "-28vw" : from === "right" ? "28vw" : "0vw") : "0vw",
    "0vw"
  ]);
  const y = useTransform(progress, [0, 1], [
    effect === "slide" ? (from === "up" ? 26 : 0) : effect === "pop" ? 16 : 10,
    0
  ]);
  const scale = useTransform(progress, [0, 1], [effect === "pop" ? 0.96 : 1, 1]);
  const opacity = useTransform(progress, [0, 1], [0, 1]);
  const filter = useTransform(progress, [0, 1], [effect === "fade" ? "blur(10px)" : "blur(12px)", "blur(0px)"]);

  return (
    <motion.div ref={ref} className={className} style={{ x, y, scale, opacity, filter }}>
      {children}
    </motion.div>
  );
}

export function Section({
  eyebrow,
  title,
  subtitle,
  children,
  animateTitle = true,
  hideHeader = false,
  className
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  animateTitle?: boolean;
  hideHeader?: boolean;
  className?: string;
}) {
  return (
    <section className={cn("py-14 md:py-20", className)}>
      {hideHeader ? null : (
        <Container className="mb-10">
          {animateTitle ? (
            <Reveal from="left" effect="slide">
              {eyebrow ? (
                <div className="text-xs uppercase tracking-[0.32em] text-white/55">{eyebrow}</div>
              ) : null}
              <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.05] text-white md:text-6xl">{title}</h1>
              {subtitle ? <p className="mt-4 max-w-3xl text-base text-white/75 md:text-lg">{subtitle}</p> : null}
            </Reveal>
          ) : (
            <>
              {eyebrow ? <div className="text-xs uppercase tracking-[0.32em] text-white/55">{eyebrow}</div> : null}
              <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.05] text-white md:text-6xl">{title}</h1>
              {subtitle ? <p className="mt-4 max-w-3xl text-base text-white/75 md:text-lg">{subtitle}</p> : null}
            </>
          )}
        </Container>
      )}
      {children}
    </section>
  );
}
