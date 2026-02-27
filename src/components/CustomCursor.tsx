"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type CursorVariant = "default" | "link" | "button" | "drag" | "invert";

const DOTS = 9;

export default function CustomCursor() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const dotRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);

  const state = useMemo(
    () => ({
      targetX: 0,
      targetY: 0,
      x: 0,
      y: 0,
      dots: Array.from({ length: DOTS }, () => ({ x: 0, y: 0 })),
    }),
    [],
  );

  useEffect(() => {
    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (!isFine) return;

    const onMove = (e: PointerEvent) => {
      state.targetX = e.clientX;
      state.targetY = e.clientY;
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };

    const onOver = (e: Event) => {
      const el = (e.target as HTMLElement | null)?.closest?.("[data-cursor]");
      const next = (el?.getAttribute("data-cursor") as CursorVariant | null) ?? null;
      if (!next) return setVariant("default");
      setVariant(next);
    };

    const onDown = () => setVariant((v) => (v === "drag" ? v : "drag"));
    const onUp = () => setVariant((v) => (v === "drag" ? "default" : v));

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });

    let rafId = 0;
    const tick = () => {
      const root = rootRef.current;
      if (root) {
        state.x += (state.targetX - state.x) * 0.22;
        state.y += (state.targetY - state.y) * 0.22;
        root.style.transform = `translate3d(${state.x}px, ${state.y}px, 0)`;
      }

      for (let i = 0; i < DOTS; i += 1) {
        const prev = i === 0 ? { x: state.x, y: state.y } : state.dots[i - 1];
        const d = state.dots[i];
        d.x += (prev.x - d.x) * 0.28;
        d.y += (prev.y - d.y) * 0.28;
        const dotEl = dotRefs.current[i];
        if (dotEl) {
          dotEl.style.transform = `translate3d(${d.x}px, ${d.y}px, 0)`;
        }
      }

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      cancelAnimationFrame(rafId);
    };
  }, [state]);

  return (
    <>
      <div
        ref={rootRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-[80] hidden will-change-transform md:block",
          visible ? "opacity-100" : "opacity-0",
        )}
      >
        <div
          className={cn(
            "h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/20 bg-cream/30 backdrop-blur transition-[transform,background-color,border-color,filter] duration-200",
            variant === "link" && "scale-125 border-strawberry/60 bg-pink/50",
            variant === "button" && "scale-150 border-strawberry bg-strawberry/15",
            variant === "drag" && "scale-[1.85] border-forest/60 bg-forest/15",
            variant === "invert" &&
              "scale-125 border-cream/50 bg-ink/35 mix-blend-difference",
          )}
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[70] hidden md:block"
      >
        {Array.from({ length: DOTS }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              dotRefs.current[i] = el;
            }}
            className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-strawberry/35"
            style={{ opacity: 1 - i / (DOTS + 2) }}
          />
        ))}
      </div>
    </>
  );
}
