"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import Container from "@/components/Container";
import SplitHeading from "@/components/SplitHeading";
import { usePrefersReducedMotion } from "@/lib/motion";

export default function ActivitySplit() {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const img = imageRef.current;
    const text = textRef.current;
    if (!section || !img || !text) return;

    let destroyed = false;
    let ctx: null | { revert: () => void } = null;

    async function run() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      const section = sectionRef.current;
      const img = imageRef.current;
      const text = textRef.current;
      if (destroyed) return;
      if (!section || !img || !text) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.set(img, {
          clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "bottom 40%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(img, {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          ease: "power2.out",
          duration: 1,
        }).fromTo(
          text,
          { x: -18, opacity: 0 },
          { x: 0, opacity: 1, ease: "power3.out", duration: 0.8 },
          0.1,
        );
      }, section);
    }

    void run();
    return () => {
      destroyed = true;
      ctx?.revert();
      ctx = null;
    };
  }, [reduced]);

  return (
    <section ref={sectionRef} className="relative py-24">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div ref={textRef} className="md:col-span-5">
            <div className="text-xs font-extrabold tracking-wide text-ink/60">
              Outdoor & Indoor Activity
            </div>
            <SplitHeading
              text="Designed for movement—built for safety."
              className="mt-2 font-[family-name:var(--font-display)] text-4xl font-black tracking-tight text-ink md:text-5xl"
            />
            <p className="mt-5 text-sm font-semibold leading-7 text-ink/65">
              From balance beams to indoor climbers, our activity essentials are
              crafted with child-safe edges, premium materials, and playful
              proportions.
            </p>
            <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-forest/10 px-4 py-2 text-xs font-extrabold tracking-wide text-forest">
              GSAP clip-path reveal ✦ Scroll-linked
            </div>
          </div>

          <div className="md:col-span-7">
            <div
              ref={imageRef}
              className="relative aspect-[16/10] overflow-hidden rounded-[2.25rem] border border-ink/10 bg-cream/60"
            >
              <Image
                src="/images/products-that-boost-physical-activity-of-kids-include-wooden-jungle-gyms-pikers-wooden-balancing-boards-wooden-balancing-beams-and-non-wooden-trampolines-slides-etc.webp"
                alt="Outdoor activity essentials"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(22,22,22,0.45),transparent_60%)]" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
