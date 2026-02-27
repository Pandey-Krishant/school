"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo } from "react";
import Container from "@/components/Container";
import SplitHeading from "@/components/SplitHeading";
import { FEATURED_PRODUCTS } from "@/lib/brand";

export default function FeaturedProducts() {
  const items = useMemo(() => {
    const base = FEATURED_PRODUCTS.map((p, idx) => ({
      ...p,
      image:
        idx % 2 === 0
          ? "/images/81TQHtP_4ZL._SY741.webp"
          : "/images/p201705041336284751807.webp",
    }));
    return [...base, ...base];
  }, []);

  return (
    <section className="relative py-24">
      <Container>
        <div className="flex items-end justify-between gap-8">
          <div>
            <div className="text-xs font-extrabold tracking-wide text-ink/60">
              Featured
            </div>
            <SplitHeading
              text="A carousel you’ll want to drag forever."
              className="mt-2 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-black tracking-tight text-ink md:text-5xl"
            />
          </div>
          <div className="hidden max-w-md text-sm font-semibold leading-7 text-ink/65 md:block">
            Smooth momentum, premium cards, and just enough delight. (Drag on
            desktop—swipe on mobile.)
          </div>
        </div>
      </Container>

      <div className="mt-10 overflow-hidden">
        <motion.div
          data-cursor="drag"
          className="flex gap-6 px-5 md:px-8"
          drag="x"
          dragConstraints={{ left: -1200, right: 0 }}
          whileTap={{ cursor: "grabbing" }}
        >
          {items.map((p, i) => (
            <motion.div
              key={`${p.name}-${i}`}
              className="group relative h-[22rem] w-[17rem] shrink-0 overflow-hidden rounded-[2rem] border border-ink/10 bg-cream/70 shadow-sm shadow-ink/5"
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
            >
              <div className="absolute left-4 top-4 z-10 rounded-full bg-strawberry px-3 py-1 text-xs font-extrabold tracking-wide text-cream">
                {p.badge}
              </div>
              <div className="relative h-[60%] w-full overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(22,22,22,0.55),transparent_60%)] opacity-70" />
              </div>
              <div className="flex h-[40%] flex-col justify-between p-5">
                <div>
                  <div className="font-[family-name:var(--font-display)] text-xl font-black tracking-tight text-ink">
                    {p.name}
                  </div>
                  <div className="mt-1 text-sm font-extrabold text-ink/65">
                    {p.price}
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-full border border-ink/10 bg-cream/70 py-3 text-center text-sm font-extrabold text-ink/80 transition-colors duration-300 group-hover:bg-ink group-hover:text-cream">
                  <span className="relative z-10">Add to Cart</span>
                  <span className="absolute inset-0 translate-y-[105%] bg-strawberry transition-transform duration-300 group-hover:translate-y-0" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

