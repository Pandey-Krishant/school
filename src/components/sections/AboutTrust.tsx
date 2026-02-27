"use client";

import Image from "next/image";
import { useLayoutEffect, useMemo, useRef } from "react";
import Container from "@/components/Container";
import SplitHeading from "@/components/SplitHeading";
import { BRAND } from "@/lib/brand";
import { usePrefersReducedMotion } from "@/lib/motion";

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-3xl border border-ink/10 bg-cream/65 p-6 backdrop-blur">
      <div className="font-[family-name:var(--font-display)] text-5xl font-black tracking-tight text-ink">
        <span data-counter>{value}</span>
      </div>
      <div className="mt-2 text-sm font-bold text-ink/65">{label}</div>
    </div>
  );
}

export default function AboutTrust() {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const stats = useMemo(
    () => [
      { value: "30+", label: "Years of joyful classrooms" },
      { value: "500+", label: "Schools & institutions served" },
      { value: "10,000+", label: "Products across categories" },
    ],
    [],
  );

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
        const total = panels.length;

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
                total > 1
                  ? {
                      snapTo: 1 / (total - 1),
                      duration: { min: 0.15, max: 0.35 },
                      ease: "power2.out",
                    }
                  : false,
            },
          });
        }

        const counters = Array.from(
          section.querySelectorAll<HTMLElement>("[data-counter]"),
        );
        counters.forEach((el) => {
          const text = el.textContent ?? "";
          const num = Number(text.replace(/[^\d]/g, ""));
          const suffix = text.replace(/[\d,]/g, "");
          const obj = { v: 0 };
          gsap.fromTo(
            obj,
            { v: 0 },
            {
              v: num,
              duration: 1.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                once: true,
              },
              onUpdate: () => {
                const rounded = Math.round(obj.v);
                el.textContent = `${rounded}${suffix}`;
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
    <section ref={sectionRef} className="relative overflow-hidden py-20">
      <Container>
        <div className="flex items-end justify-between gap-8">
          <div>
            <div className="text-xs font-extrabold tracking-wide text-ink/60">
              About & Trust
            </div>
            <SplitHeading
              text="Built for play. Designed for trust."
              className="mt-2 max-w-2xl font-[family-name:var(--font-display)] text-4xl font-black tracking-tight text-ink md:text-5xl"
            />
          </div>
          <div className="hidden max-w-md text-sm font-semibold leading-7 text-ink/65 md:block">
            Since 1990, Strawberry Stop has helped schools and families create
            child-safe, premium learning environments—delivered with care and
            certified quality.
          </div>
        </div>
      </Container>

      <div className="mt-12">
        <div
          ref={trackRef}
          className="flex w-full flex-col gap-6 px-5 md:w-[400vw] md:flex-row md:px-8"
          aria-label="Trust highlights"
        >
          <div data-panel className="w-full shrink-0 md:w-screen">
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-6 md:grid-cols-3">
                {stats.map((s) => (
                  <Stat key={s.label} value={s.value} label={s.label} />
                ))}
              </div>
            </div>
          </div>

          <div data-panel className="w-full shrink-0 md:w-screen">
            <div className="mx-auto max-w-6xl">
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div className="rounded-3xl border border-ink/10 bg-cream/65 p-7 backdrop-blur">
                  <div className="flex items-center gap-4">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-forest/10">
                      <div className="h-9 w-9 rounded-full border-2 border-forest/60" />
                    </div>
                    <div>
                      <div className="text-xs font-extrabold tracking-wide text-ink/60">
                        ISO 9001:2001
                      </div>
                      <div className="font-[family-name:var(--font-display)] text-2xl font-black tracking-tight text-ink">
                        Certified Quality Systems
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm font-semibold leading-7 text-ink/65">
                    Reliable procurement, consistent build quality, and
                    institution-first support—without losing the magic of play.
                  </p>
                </div>

                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-ink/10 bg-cream/60">
                  <Image
                    src="/images/How_to_Set_Up_Your_Kindergarten_Classroom_Quickly_1512x_f56ba144-2569-4714-87e7-44f9f5c80e7d.webp"
                    alt="Kindergarten classroom overview"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <div data-panel className="w-full shrink-0 md:w-screen">
            <div className="mx-auto max-w-6xl">
              <div className="grid items-center gap-8 md:grid-cols-12">
                <div className="md:col-span-5">
                  <div className="rounded-3xl border border-ink/10 bg-cream/65 p-7 backdrop-blur">
                    <div className="text-xs font-extrabold tracking-wide text-ink/60">
                      From the founder
                    </div>
                    <div className="mt-2 font-[family-name:var(--font-display)] text-3xl font-black tracking-tight text-ink">
                      “When learning feels like play, it lasts.”
                    </div>
                    <div className="mt-4 text-sm font-semibold leading-7 text-ink/65">
                      {BRAND.name} started in New Delhi with one mission: build
                      durable, child-first essentials that help every classroom
                      feel welcoming—day after day, year after year.
                    </div>
                  </div>
                </div>
                <div className="md:col-span-7">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-ink/10 bg-cream/60">
                    <Image
                      src="/images/image-of-rubberwood-kindergarten-furniture-setup.webp"
                      alt="Classroom furniture detail"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(22,22,22,0.55),transparent_55%)]" />
                    <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-cream/70 p-4 backdrop-blur">
                      <div className="text-xs font-extrabold tracking-wide text-ink/60">
                        Trusted by institutions
                      </div>
                      <div className="mt-1 text-sm font-semibold text-ink/70">
                        Play schools · Montessori classrooms · Activity centers
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div data-panel className="w-full shrink-0 md:w-screen">
            <div className="mx-auto max-w-6xl">
              <div className="rounded-[2.5rem] border border-ink/10 bg-strawberry px-8 py-12 text-cream shadow-xl shadow-strawberry/25">
                <div className="text-xs font-extrabold tracking-wide text-cream/70">
                  The Strawberry Stop promise
                </div>
                <div className="mt-2 max-w-2xl font-[family-name:var(--font-display)] text-4xl font-black tracking-tight md:text-5xl">
                  Premium materials, joyful design, reliable delivery.
                </div>
                <div className="mt-5 max-w-2xl text-sm font-semibold leading-7 text-cream/80">
                  Whether you’re building a new play school or refreshing a
                  learning corner at home, we bring a premium experience—from
                  product selection to after-sales support.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
