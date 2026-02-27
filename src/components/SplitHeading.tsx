"use client";

import { ElementType, useLayoutEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/motion";

type Props = {
  as?: ElementType;
  text: string;
  className?: string;
  once?: boolean;
};

function splitToChars(text: string) {
  return Array.from(text).map((char, idx) => {
    const isSpace = char === " ";
    return (
      <span
        key={`${char}-${idx}`}
        className={cn(
          "char inline-block will-change-transform",
          isSpace ? "w-[0.35em]" : "",
        )}
        aria-hidden="true"
      >
        {isSpace ? "\u00A0" : char}
      </span>
    );
  });
}

export default function SplitHeading({
  as: As = "h2",
  text,
  className,
  once = true,
}: Props) {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLElement | null>(null);
  const chars = useMemo(() => splitToChars(text), [text]);

  useLayoutEffect(() => {
    if (reduced) return;
    const el = rootRef.current;
    if (!el) return;

    let ctxCleanup = () => {};
    let destroyed = false;

    async function setup() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      const el = rootRef.current;
      if (destroyed) return;
      if (!el) return;
      gsap.registerPlugin(ScrollTrigger);

      const targets = Array.from(el.querySelectorAll<HTMLElement>(".char"));
      gsap.set(targets, { yPercent: 110, rotate: 6, opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          once,
        },
      });

      tl.to(targets, {
        yPercent: 0,
        rotate: 0,
        opacity: 1,
        stagger: 0.018,
        duration: 0.85,
      });

      ctxCleanup = () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    }

    void setup();

    return () => {
      destroyed = true;
      ctxCleanup();
    };
  }, [once, reduced, text]);

  return (
    <As ref={rootRef as never} className={cn("leading-[0.95]", className)}>
      <span className="sr-only">{text}</span>
      {chars}
    </As>
  );
}

