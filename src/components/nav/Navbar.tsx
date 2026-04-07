"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { team } from "@/data/team";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const transparent = pathname === "/";

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="sticky top-0 z-50">
        <div
          className={cn(
            "transition",
            transparent ? "bg-transparent" : "bg-[rgba(7,12,40,.12)] backdrop-blur-xl"
          )}
        >
          <div className="flex w-full items-center justify-between py-4 pl-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))]">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                className="rounded-xl bg-white/0 p-2 text-white/85 transition hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/20"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>

              <Link href="/" className="inline-flex items-center gap-3">
                <Image
                  src="/media/brand/logo.svg"
                  alt="FRC 2785 Prometheus logo"
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-lg"
                  priority
                />
              </Link>
            </div>

            <Link
              href="/"
              className="text-xs uppercase tracking-[0.36em] text-white/75 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              Home
            </Link>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[80] bg-[rgba(5,8,27,.92)] px-safe backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mx-auto flex h-full max-w-6xl flex-col">
              <div className="flex items-center justify-between py-5">
                <div className="flex items-center gap-3">
                  <Image
                    src="/media/brand/logo.svg"
                    alt="FRC 2785 Prometheus logo"
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-xl"
                  />
                  <div className="font-display text-base tracking-[0.08em] text-white">
                    {team.number} <span className="text-white/70">{team.name}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="rounded-xl bg-white/0 px-4 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  Close
                </button>
              </div>

              <div className="flex flex-1 items-center">
                <nav className="w-full">
                  <div className="grid gap-4 md:gap-6">
                    {[
                      { href: "/", label: "Home" },
                      { href: "/about", label: "About" },
                      { href: "/seasons", label: "Seasons" },
                      { href: "/gallery", label: "Gallery" },
                      { href: "/sponsors", label: "Sponsors" },
                      { href: "/contact", label: "Contact" }
                    ].map((item) => {
                      const active = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "group flex items-baseline justify-between py-2 font-display text-5xl leading-[0.9] text-white transition focus:outline-none md:py-3 md:text-7xl",
                            active ? "text-white" : "text-white/80 hover:text-white"
                          )}
                        >
                          <span>{item.label}</span>
                          <span className="text-[var(--ember-300)] opacity-0 transition group-hover:opacity-100">
                            →
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </nav>
              </div>

              <div className="pb-8 text-xs uppercase tracking-[0.36em] text-white/55">
                Kent School · FRC Team {team.number}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
