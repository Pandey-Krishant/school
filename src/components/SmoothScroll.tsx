"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "@/lib/motion";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reduced) return;

    let rafId = 0;
    let destroyed = false;

    async function setup() {
      const [{ ScrollTrigger }, { gsap }] = await Promise.all([
        import("gsap/ScrollTrigger"),
        import("gsap"),
      ]);

      if (destroyed) return;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.15,
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.2,
      });
      lenisRef.current = lenis;

      lenis.on("scroll", () => ScrollTrigger.update());
      ScrollTrigger.refresh();

      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);
      void (document as unknown as { fonts?: { ready?: Promise<unknown> } }).fonts?.ready?.then?.(
        () => ScrollTrigger.refresh(),
      );

      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      ScrollTrigger.defaults({
        markers: false,
      });

      return () => window.removeEventListener("load", onLoad);
    }

    let teardownLoad: null | (() => void) = null;
    void setup().then((t) => {
      teardownLoad = typeof t === "function" ? t : null;
    });

    return () => {
      destroyed = true;
      cancelAnimationFrame(rafId);
      lenisRef.current?.destroy();
      lenisRef.current = null;
      teardownLoad?.();
    };
  }, [reduced]);

  return <>{children}</>;
}
