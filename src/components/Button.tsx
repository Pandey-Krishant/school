"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/cn";
import Magnetic from "@/components/Magnetic";

type Props = {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "ghost";
};

export default function Button({
  href,
  onClick,
  children,
  className,
  variant = "primary",
}: Props) {
  const base =
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-3 text-sm font-extrabold tracking-wide ring-1 ring-ring/60 transition-transform duration-200 will-change-transform";
  const styles =
    variant === "primary"
      ? "bg-strawberry text-cream shadow-sm shadow-strawberry/25"
      : "bg-cream/40 text-ink ring-ink/10 backdrop-blur";

  const inner = (
    <Magnetic className="inline-block" strength={0.18}>
      <span
        data-cursor="button"
        className={cn(
          base,
          styles,
          "hover:scale-[1.02] active:scale-[0.99]",
          className,
        )}
      >
        <span className="relative z-10">{children}</span>
        <span className="absolute inset-0 -translate-x-[105%] bg-cream/22 transition-transform duration-300 group-hover:translate-x-0" />
      </span>
    </Magnetic>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className="inline-block">
      {inner}
    </button>
  );
}

