"use client";

import { useEffect, useRef, useState } from "react";
import { BRAND } from "@/lib/brand";
import { usePrefersReducedMotion } from "@/lib/motion";

export default function Preloader({ onDone }: { onDone?: () => void }) {
  const reduced = usePrefersReducedMotion();
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const wordRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    if (reduced) {
      setDone(true);
      onDone?.();
      return;
    }

    const root = rootRef.current;
    const word = wordRef.current;
    const path = pathRef.current;
    if (!root || !word || !path) return;

    let destroyed = false;
    let cleanup = () => {};

    async function run() {
      const { gsap } = await import("gsap");
      if (destroyed) return;

      const letters = Array.from(word.querySelectorAll<HTMLElement>("[data-letter]"));

      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          setDone(true);
          onDone?.();
        },
      });

      tl.to(path, { strokeDashoffset: 0, duration: 1.0, ease: "power2.out" })
        .fromTo(
          letters,
          { yPercent: 120, opacity: 0 },
          { yPercent: 0, opacity: 1, stagger: 0.03, duration: 0.55 },
          "-=0.35",
        )
        .to(root, { opacity: 0, duration: 0.55, delay: 0.35 })
        .set(root, { display: "none" });

      cleanup = () => tl.kill();
    }

    void run();

    return () => {
      destroyed = true;
      cleanup();
    };
  }, [onDone, reduced]);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[90] grid place-items-center bg-cream"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-6">
        <div className="grid place-items-center">
          <svg
            width="104"
            height="104"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              ref={pathRef}
              d="M50 20c-8 0-14 5-16 12-7 1-12 7-12 14 0 4 1 7 3 10 4 9 13 24 25 24s21-15 25-24c2-3 3-6 3-10 0-7-5-13-12-14-2-7-8-12-16-12Z"
              stroke="#E8274B"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M39 18c3 3 6 5 11 5s8-2 11-5"
              stroke="#2D6A4F"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div
          ref={wordRef}
          className="text-center font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-ink"
        >
          {Array.from(BRAND.name).map((char, i) => (
            <span
              key={`${char}-${i}`}
              data-letter
              className="inline-block"
              aria-hidden="true"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
          <div className="mt-2 text-sm font-bold text-ink/60">
            {BRAND.tagline}
          </div>
        </div>
      </div>
    </div>
  );
}

