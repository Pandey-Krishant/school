"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import Container from "@/components/Container";
import SplitHeading from "@/components/SplitHeading";
import { usePrefersReducedMotion } from "@/lib/motion";

export default function PlayArea() {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const overlay = overlayRef.current;
    if (!section || !overlay) return;

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
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "bottom 45%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(overlay, { opacity: 0 }, { opacity: 1, ease: "none" });
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
      <div className="relative overflow-hidden rounded-[2.75rem] border border-ink/10 bg-[radial-gradient(900px_520px_at_18%_18%,rgba(232,39,75,0.24),transparent_62%),radial-gradient(860px_520px_at_82%_38%,rgba(45,106,79,0.18),transparent_60%),linear-gradient(to_bottom,#0b0b0b,#151515)]">
        <div className="absolute inset-0">
          <Image
            src="/images/How_to_Set_Up_Your_Kindergarten_Classroom_Quickly_1512x_f56ba144-2569-4714-87e7-44f9f5c80e7d.webp"
            alt="Play area setup"
            fill
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-[radial-gradient(800px_360px_at_30%_25%,rgba(232,39,75,0.35),transparent_65%),radial-gradient(800px_360px_at_70%_65%,rgba(255,209,102,0.30),transparent_65%)]" />
          <div className="absolute inset-0 bg-black/55" />
          <div ref={overlayRef} className="absolute inset-0 bg-black/35 opacity-0" />
        </div>

        <Container className="relative py-20 md:py-24">
          <div className="max-w-2xl">
            <div className="text-xs font-extrabold tracking-wide text-cream/70">
              Play Area Setups
            </div>
            <SplitHeading
              text="Immersive spaces, built to last."
              className="mt-2 font-[family-name:var(--font-display)] text-4xl font-black tracking-tight text-cream md:text-5xl"
            />
            <p className="mt-6 text-sm font-semibold leading-7 text-cream/75">
              Use a video background here later—this section is wired for
              scroll-linked overlays and premium readability.
            </p>
            <div className="mt-7 inline-flex items-center gap-3 rounded-full bg-cream/10 px-4 py-2 text-xs font-extrabold tracking-wide text-cream/80">
              Scroll-linked opacity ✦ Cinematic overlay
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
