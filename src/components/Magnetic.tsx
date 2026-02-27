"use client";

import { ReactNode, useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

type Props = {
  children: ReactNode;
  strength?: number;
  className?: string;
};

export default function Magnetic({ children, strength = 0.22, className }: Props) {
  const reduced = usePrefersReducedMotion();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reduced) return;

    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner) return;

    let quickX: ((v: number) => void) | null = null;
    let quickY: ((v: number) => void) | null = null;

    let cleanup = () => {};
    let destroyed = false;

    async function setup() {
      const { gsap } = await import("gsap");
      if (destroyed) return;
      quickX = gsap.quickTo(inner, "x", { duration: 0.35, ease: "power3.out" });
      quickY = gsap.quickTo(inner, "y", { duration: 0.35, ease: "power3.out" });

      const onMove = (e: PointerEvent) => {
        const r = wrapper.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
        const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
        quickX?.(dx * r.width * strength);
        quickY?.(dy * r.height * strength);
      };

      const onLeave = () => {
        quickX?.(0);
        quickY?.(0);
      };

      wrapper.addEventListener("pointermove", onMove);
      wrapper.addEventListener("pointerleave", onLeave);

      cleanup = () => {
        wrapper.removeEventListener("pointermove", onMove);
        wrapper.removeEventListener("pointerleave", onLeave);
      };
    }

    void setup();

    return () => {
      destroyed = true;
      cleanup();
    };
  }, [reduced, strength]);

  return (
    <div ref={wrapperRef} className={className}>
      <div ref={innerRef}>{children}</div>
    </div>
  );
}

