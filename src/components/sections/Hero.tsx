"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLayoutEffect, useRef } from "react";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Marquee from "@/components/Marquee";
import SplitHeading from "@/components/SplitHeading";
import { BRAND, TICKER_ITEMS } from "@/lib/brand";
import { usePrefersReducedMotion } from "@/lib/motion";

export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (reduced) return;
    const root = rootRef.current;
    if (!root) return;

    let destroyed = false;
    let ctx: null | { revert: () => void } = null;

    async function run() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (destroyed) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const layers = Array.from(
          root.querySelectorAll<HTMLElement>("[data-parallax]"),
        );
        layers.forEach((layer) => {
          const depth = Number(layer.dataset.parallax ?? "1");
          gsap.fromTo(
            layer,
            { y: 0 },
            {
              y: depth * -42,
              ease: "none",
              scrollTrigger: {
                trigger: root,
                start: "top top",
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );
        });

        const fadeIns = Array.from(
          root.querySelectorAll<HTMLElement>("[data-fade]"),
        );
        gsap.fromTo(
          fadeIns,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            delay: 0.35,
          },
        );
      }, root);
    }

    void run();
    return () => {
      destroyed = true;
      ctx?.revert();
      ctx = null;
    };
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative min-h-[100svh] overflow-hidden pt-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_20%,rgba(232,39,75,0.18),transparent_55%),radial-gradient(900px_560px_at_80%_30%,rgba(255,209,102,0.18),transparent_55%),radial-gradient(900px_560px_at_60%_90%,rgba(45,106,79,0.16),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,248,240,0.92),rgba(255,248,240,0.62),rgba(255,248,240,0.92))] dark:bg-[linear-gradient(to_bottom,rgba(11,11,11,0.92),rgba(11,11,11,0.58),rgba(11,11,11,0.92))]" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div
              data-fade
              className="inline-flex items-center gap-3 rounded-full border border-ink/10 bg-cream/70 px-4 py-2 text-xs font-extrabold tracking-wide text-ink/70 backdrop-blur"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-strawberry" />
              {BRAND.metaLine}
            </div>

            <div className="mt-7 space-y-3">
              <SplitHeading
                as="h1"
                text="Where Kids"
                className="font-[family-name:var(--font-display)] text-6xl font-black tracking-tight text-ink sm:text-7xl"
              />
              <SplitHeading
                as="h1"
                text="Come to Play"
                className="font-[family-name:var(--font-display)] text-6xl font-black tracking-tight text-ink sm:text-7xl"
              />
            </div>

            <p
              data-fade
              className="mt-7 max-w-xl text-base font-semibold leading-7 text-ink/70 md:text-lg"
            >
              {BRAND.tagline}. From Montessori learning to classroom-ready
              furniture, we craft joyful spaces trusted by schools and loved by
              kids.
            </p>

            <div data-fade className="mt-9 flex flex-wrap items-center gap-4">
              <Button href="#collections">Explore Our World</Button>
              <a
                href="#contact"
                data-cursor="link"
                className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-cream/55 px-5 py-3 text-sm font-extrabold text-ink/75 backdrop-blur transition-colors hover:bg-cream/75"
              >
                Request Catalogue <span className="text-strawberry">→</span>
              </a>
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <motion.div
              data-parallax="1"
              className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2.25rem] border border-ink/10 bg-cream/60 shadow-xl shadow-strawberry/10 backdrop-blur"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              <Image
                src="/images/image-of-rubberwood-kindergarten-furniture-setup.webp"
                alt="Colorful classroom furniture setup"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(22,22,22,0.55),transparent_55%)]" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="rounded-2xl bg-cream/75 p-4 backdrop-blur">
                  <div className="text-xs font-extrabold tracking-wide text-ink/60">
                    Premium · Child-safe · Institutional grade
                  </div>
                  <div className="mt-1 font-[family-name:var(--font-display)] text-2xl font-black tracking-tight text-ink">
                    Playful, yet trusted.
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              data-parallax="2"
              className="pointer-events-none absolute -right-6 -top-8 hidden w-40 rotate-6 rounded-[1.75rem] border border-ink/10 bg-cream/65 p-3 shadow-lg shadow-forest/10 backdrop-blur md:block"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src="/images/81TQHtP_4ZL._SY741.webp"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-2 text-xs font-extrabold text-ink/70">
                Montessori-ready
              </div>
            </motion.div>
          </div>
        </div>
      </Container>

      <div className="relative mt-14 border-y border-ink/10 bg-cream/55 py-4 backdrop-blur">
        <Marquee
          items={TICKER_ITEMS as unknown as string[]}
          className="opacity-95"
          duration={26}
        />
      </div>
    </section>
  );
}
