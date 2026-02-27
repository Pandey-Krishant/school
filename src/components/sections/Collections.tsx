"use client";

import Image from "next/image";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useLayoutEffect, useRef } from "react";
import Container from "@/components/Container";
import SplitHeading from "@/components/SplitHeading";
import { COLLECTIONS } from "@/lib/brand";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/motion";

function TiltCard({
  title,
  subtitle,
  image,
  tone,
  className,
}: {
  title: string;
  subtitle: string;
  image: string;
  tone: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMove = (e: ReactPointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${py * -6}deg) rotateY(${px * 8}deg) translateZ(0)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={ref}
      data-cursor="link"
      data-collection-card
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn(
        "group relative overflow-hidden rounded-[2rem] border border-ink/10 bg-cream/70 shadow-sm shadow-ink/5 transition-transform duration-200 will-change-transform",
        className,
      )}
    >
      <div className={cn("absolute inset-0", tone)} />
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(22,22,22,0.62),transparent_55%)] opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute bottom-5 left-5 right-5">
        <div className="translate-y-2 rounded-2xl bg-cream/70 p-4 backdrop-blur transition-transform duration-300 group-hover:translate-y-0">
          <div className="text-xs font-extrabold tracking-wide text-ink/60">
            Collection
          </div>
          <div className="mt-1 font-[family-name:var(--font-display)] text-2xl font-black tracking-tight text-ink">
            {title}
          </div>
          <div className="mt-1 text-sm font-semibold text-ink/70">{subtitle}</div>
        </div>
      </div>
    </div>
  );
}

export default function Collections() {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    if (!section) return;

    let destroyed = false;
    let cleanup = () => {};

    async function run() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (destroyed) return;
      gsap.registerPlugin(ScrollTrigger);

      const cards = Array.from(
        section.querySelectorAll<HTMLElement>("[data-collection-card]"),
      );
      const tween = gsap.fromTo(
        cards,
        { y: 24, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: section, start: "top 70%" },
        },
      );

      cleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }

    void run();
    return () => {
      destroyed = true;
      cleanup();
    };
  }, [reduced]);

  return (
    <section ref={sectionRef} id="collections" className="relative py-24">
      <Container>
        <div className="flex items-end justify-between gap-8">
          <div>
            <div className="text-xs font-extrabold tracking-wide text-ink/60">
              Collections
            </div>
            <SplitHeading
              text="Essentials that look premium—and feel playful."
              className="mt-2 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-black tracking-tight text-ink md:text-5xl"
            />
          </div>
          <div className="hidden max-w-md text-sm font-semibold leading-7 text-ink/65 md:block">
            Browse bestselling categories crafted for play schools, Montessori
            classrooms, and kid-friendly homes.
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-12">
          <TiltCard
            {...COLLECTIONS[0]}
            className="md:col-span-7 md:row-span-2 aspect-[16/10] md:aspect-auto min-h-[22rem]"
          />
          <TiltCard
            {...COLLECTIONS[1]}
            className="md:col-span-5 aspect-[16/10] min-h-[16rem]"
          />
          <TiltCard
            {...COLLECTIONS[2]}
            className="md:col-span-5 aspect-[16/10] min-h-[16rem]"
          />
          <TiltCard
            {...COLLECTIONS[3]}
            className="md:col-span-6 aspect-[16/10] min-h-[16rem]"
          />
          <TiltCard
            {...COLLECTIONS[4]}
            className="md:col-span-6 aspect-[16/10] min-h-[16rem]"
          />
          <TiltCard
            {...COLLECTIONS[5]}
            className="md:col-span-12 aspect-[21/9] min-h-[18rem]"
          />
        </div>
      </Container>
    </section>
  );
}
