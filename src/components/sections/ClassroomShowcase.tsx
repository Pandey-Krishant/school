"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import Container from "@/components/Container";
import SplitHeading from "@/components/SplitHeading";
import { usePrefersReducedMotion } from "@/lib/motion";

const SHOW = [
  {
    title: "Montessori Corner",
    copy: "Quiet focus, natural textures, smart storage.",
    image:
      "/images/How_to_Set_Up_Your_Kindergarten_Classroom_Quickly_1512x_f56ba144-2569-4714-87e7-44f9f5c80e7d.webp",
  },
  {
    title: "Activity Zone",
    copy: "Movement-friendly setups with safe edges.",
    image:
      "/images/products-that-boost-physical-activity-of-kids-include-wooden-jungle-gyms-pikers-wooden-balancing-boards-wooden-balancing-beams-and-non-wooden-trampolines-slides-etc.webp",
  },
  {
    title: "Reading Nook",
    copy: "Soft corners and kid-scale comfort.",
    image: "/images/p201705041336284751807.webp",
  },
  {
    title: "Classroom Essentials",
    copy: "Institution-ready furniture trusted by schools.",
    image: "/images/image-of-rubberwood-kindergarten-furniture-setup.webp",
  },
] as const;

export default function ClassroomShowcase() {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

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
        const canPin = window.matchMedia("(min-width: 768px)").matches;
        const panels = Array.from(
          track.querySelectorAll<HTMLElement>("[data-panel]"),
        );

        if (canPin) {
          const scrollDistance = () =>
            Math.max(0, track.scrollWidth - window.innerWidth);

          gsap.to(track, {
            x: () => -scrollDistance(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${scrollDistance()}`,
              scrub: true,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              snap:
                panels.length > 1
                  ? {
                      snapTo: 1 / (panels.length - 1),
                      duration: { min: 0.15, max: 0.35 },
                      ease: "power2.out",
                    }
                  : false,
            },
          });
        }

        const images = Array.from(
          track.querySelectorAll<HTMLElement>("[data-depth]"),
        );
        images.forEach((img) => {
          const depth = Number(img.dataset.depth ?? "1");
          gsap.fromTo(
            img,
            { xPercent: 0 },
            {
              xPercent: depth * -6,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );
        });
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
    <section
      ref={sectionRef}
      id="setups"
      className="relative overflow-hidden py-24"
    >
      <Container>
        <div className="flex items-end justify-between gap-8">
          <div>
            <div className="text-xs font-extrabold tracking-wide text-ink/60">
              Classroom Setups
            </div>
            <SplitHeading
              text="Scroll through a full showcase."
              className="mt-2 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-black tracking-tight text-ink md:text-5xl"
            />
          </div>
          <div className="hidden max-w-md text-sm font-semibold leading-7 text-ink/65 md:block">
            A pinned horizontal experience inspired by awwwards—built with
            ScrollTrigger.
          </div>
        </div>
      </Container>

      <div className="mt-12">
        <div
          ref={trackRef}
          className="flex w-full flex-col gap-6 px-5 md:w-[400vw] md:flex-row md:px-8"
        >
          {SHOW.map((s, idx) => (
            <div key={s.title} data-panel className="w-full shrink-0 md:w-screen">
              <div className="mx-auto max-w-6xl">
                <div className="grid items-center gap-8 md:grid-cols-12">
                  <div
                    className={
                      idx % 2 === 0
                        ? "md:col-span-5"
                        : "md:col-span-5 md:order-2"
                    }
                  >
                    <div className="rounded-3xl border border-ink/10 bg-cream/65 p-7 backdrop-blur">
                      <div className="text-xs font-extrabold tracking-wide text-ink/60">
                        Setup {String(idx + 1).padStart(2, "0")}
                      </div>
                      <div className="mt-2 font-[family-name:var(--font-display)] text-3xl font-black tracking-tight text-ink">
                        {s.title}
                      </div>
                      <div className="mt-3 text-sm font-semibold leading-7 text-ink/65">
                        {s.copy}
                      </div>
                    </div>
                  </div>

                  <div
                    className={
                      idx % 2 === 0
                        ? "md:col-span-7"
                        : "md:col-span-7 md:order-1"
                    }
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-ink/10 bg-cream/60">
                      <div data-depth="1.5" className="absolute inset-0">
                        <Image
                          src={s.image}
                          alt={s.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(22,22,22,0.45),transparent_60%)]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
