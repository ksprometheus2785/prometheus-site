"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { team } from "@/data/team";

const ease = [0.22, 1, 0.36, 1] as const;

export function HomeHero() {
  return (
    <section className="relative -mt-20 min-h-[100dvh] overflow-hidden pt-20">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/media/brand/Timeline%202.mov"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,8,27,.55),rgba(5,8,27,.80))]" />
      <Container className="relative flex min-h-[100dvh] items-center justify-center px-safe pb-28 pt-12 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease }}
          className="text-center -translate-y-3 md:-translate-y-4"
        >
          <div
            className="font-display text-[clamp(8rem,26vw,28rem)] leading-[0.74] tracking-[-0.02em] text-white"
            style={{ textShadow: "0 0 60px rgba(122, 13, 18, 0.14)" }}
          >
            {team.number}
          </div>
          <div className="mt-6 px-4 font-display text-[clamp(1.5rem,3.2vw,2.75rem)] uppercase tracking-[0.28em] text-white/85 md:mt-8">
            {team.name}
          </div>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute bottom-6 left-0 right-0 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6, ease }}
        >
          <div className="text-[11px] uppercase tracking-[0.46em] text-white/55">Scroll to discover</div>
          <motion.div
            className="h-14 w-px bg-white/45"
            animate={{ opacity: [0.15, 0.85, 0.15] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </Container>
    </section>
  );
}
