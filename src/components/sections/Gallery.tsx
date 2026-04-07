"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type { GalleryCategory, GalleryItem } from "@/data/gallery";
import { cn } from "@/lib/cn";

export function Gallery(props: { items: GalleryItem[]; categories: GalleryCategory[] }) {
  const { items, categories } = props;
  const [active, setActive] = useState<GalleryCategory>(categories[0] ?? "Highlights");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return items.filter((i) => i.category === active);
  }, [active, items]);

  const openItem = items.find((i) => i.id === openId) ?? null;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => {
              setActive(c);
              setOpenId(null);
            }}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-white/20",
              active === c
                ? "border-[rgba(180,20,27,.40)] bg-[rgba(180,20,27,.14)] text-white"
                : "border-white/10 bg-white/5 text-white/75 hover:text-white"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <button
            key={item.id}
            onClick={() => setOpenId(item.id)}
            className="group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left focus:outline-none focus:ring-2 focus:ring-[var(--ember-300)]/40"
          >
            <div className="relative aspect-[16/10] w-full">
              {item.type === "image" ? (
                <Image
                  src={item.thumb ?? item.src}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <video
                  className="h-full w-full object-cover"
                  src={item.src}
                  muted
                  playsInline
                  preload="metadata"
                  autoPlay
                  loop
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/60" />
            </div>
            <div
              className="absolute inset-0 opacity-0 transition group-hover:opacity-100"
              style={{ background: "radial-gradient(700px 260px at 30% 20%, rgba(180,20,27,.16), transparent 65%)" }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="text-xs uppercase tracking-[0.22em] text-white/75">
                {item.year ? `${item.year} · ` : ""}
                {item.category}
              </div>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {openItem ? (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-safe py-10 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenId(null)}
          >
            <motion.div
              className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_0_0_1px_rgba(180,20,27,.12),0_0_64px_rgba(180,20,27,.10)]"
              initial={{ y: 18, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 18, scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-[0.22em] text-white/75">
                    {openItem.year ? `${openItem.year} · ` : ""}
                    {openItem.category}
                  </div>
                </div>
                <button
                  onClick={() => setOpenId(null)}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  Close
                </button>
              </div>

              <div className="bg-black">
                <div className="relative aspect-[16/9] w-full">
                  {openItem.type === "image" ? (
                    <Image
                      src={openItem.src}
                      alt={openItem.title}
                      fill
                      sizes="100vw"
                      className="object-contain"
                      priority
                    />
                  ) : (
                    <video
                      className="h-full w-full bg-black object-contain"
                      src={openItem.src}
                      controls
                      playsInline
                      preload="metadata"
                    />
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
