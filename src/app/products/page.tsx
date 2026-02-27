"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/Container";
import Button from "@/components/Button";
import SplitHeading from "@/components/SplitHeading";
import { CATALOG, formatInr, type CatalogProduct } from "@/lib/catalog";
import { cn } from "@/lib/cn";
import { useCart } from "@/lib/cart";

export default function ProductsPage() {
  const cart = useCart();
  const [activeCategory, setActiveCategory] = useState<
    null | CatalogProduct["category"]
  >(null);
  const [selectedId, setSelectedId] = useState(CATALOG[0]?.id ?? "");

  const categories = useMemo(() => {
    const set = new Set(CATALOG.map((p) => p.category));
    return Array.from(set);
  }, []);

  const filtered = useMemo(() => {
    return activeCategory
      ? CATALOG.filter((p) => p.category === activeCategory)
      : CATALOG;
  }, [activeCategory]);

  const selected = useMemo(() => {
    return CATALOG.find((p) => p.id === selectedId) ?? CATALOG[0];
  }, [selectedId]);

  return (
    <main className="relative pt-28">
      <section className="py-16">
        <Container>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <div className="text-xs font-extrabold tracking-wide text-ink/60">
                Catalogue
              </div>
              <SplitHeading
                text="Our Products"
                className="mt-2 font-[family-name:var(--font-display)] text-4xl font-black tracking-tight text-ink md:text-5xl"
              />
              <div className="mt-4 text-sm font-semibold leading-7 text-ink/65">
                Pick a product to preview it, then add it to{" "}
                <span className="font-extrabold">My Order</span>.
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setActiveCategory(null)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-xs font-extrabold tracking-wide transition-colors",
                    activeCategory === null
                      ? "border-ink/10 bg-ink text-cream"
                      : "border-ink/10 bg-cream/60 text-ink/70 hover:text-ink",
                  )}
                >
                  All
                </button>
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setActiveCategory(c)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-xs font-extrabold tracking-wide transition-colors",
                      activeCategory === c
                        ? "border-ink/10 bg-ink text-cream"
                        : "border-ink/10 bg-cream/60 text-ink/70 hover:text-ink",
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {selected && (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-xl overflow-hidden rounded-[2rem] border border-ink/10 bg-cream/70 shadow-sm shadow-ink/5"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={selected.image}
                    alt={selected.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(22,22,22,0.55),transparent_60%)] opacity-60" />
                  <div className="absolute left-5 top-5 rounded-full bg-strawberry px-3 py-1 text-xs font-extrabold tracking-wide text-cream">
                    {selected.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="font-[family-name:var(--font-display)] text-2xl font-black tracking-tight text-ink">
                        {selected.name}
                      </div>
                      <div className="mt-1 text-sm font-semibold leading-7 text-ink/65">
                        {selected.blurb}
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <div className="text-xs font-extrabold tracking-wide text-ink/60">
                        Price
                      </div>
                      <div className="mt-1 font-[family-name:var(--font-display)] text-2xl font-black tracking-tight text-ink">
                        {formatInr(selected.priceInr)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button onClick={() => cart.add(selected, 1)}>
                      Add to My Order
                    </Button>
                    <Button href="/checkout" variant="ghost">
                      Go to Checkout
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => {
              const active = p.id === selectedId;
              return (
                <motion.button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedId(p.id)}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  className={cn(
                    "group relative overflow-hidden rounded-[2rem] border bg-cream/70 p-5 text-left shadow-sm shadow-ink/5",
                    active
                      ? "border-strawberry/50 ring-2 ring-ring/60"
                      : "border-ink/10",
                  )}
                >
                  <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-6">
                    <div>
                      <div className="font-[family-name:var(--font-display)] text-xl font-black tracking-tight text-ink">
                        {p.name}
                      </div>
                      <div className="mt-1 text-xs font-extrabold tracking-wide text-ink/55">
                        {p.category}
                      </div>
                    </div>
                    <div className="text-sm font-extrabold text-ink/75">
                      {formatInr(p.priceInr)}
                    </div>
                  </div>
                  <div className="mt-4 text-sm font-semibold text-ink/65">
                    {p.blurb}
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-ink/5 px-3 py-1 text-xs font-extrabold tracking-wide text-ink/70">
                      Click to preview
                    </span>
                    <span className="rounded-full bg-strawberry/10 px-3 py-1 text-xs font-extrabold tracking-wide text-strawberry">
                      Add in preview →
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </Container>
      </section>
    </main>
  );
}

