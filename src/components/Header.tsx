"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/Container";
import Button from "@/components/Button";
import { BRAND } from "@/lib/brand";

const NAV = [
  { label: "Collections", href: "#collections" },
  { label: "Setups", href: "#setups" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
] as const;

export default function Header() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      <Container className="pt-4">
        <div className="flex items-center justify-between rounded-2xl border border-ink/10 bg-cream/60 px-4 py-3 backdrop-blur-md">
          <a
            href="#top"
            data-cursor="link"
            className="flex items-center gap-3"
            aria-label={BRAND.name}
          >
            <Image
              src="/images/logo.webp"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover ring-1 ring-ink/10"
              priority
            />
            <div className="leading-tight">
              <div className="font-[family-name:var(--font-display)] text-lg font-extrabold tracking-tight text-ink">
                Strawberry Stop
              </div>
              <div className="text-xs font-semibold text-ink/60">
                Est. 1990 · New Delhi
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                data-cursor="link"
                className="text-sm font-bold text-ink/75 transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button href="#contact" variant="ghost">
              Get a Quote
            </Button>
          </motion.div>
        </div>
      </Container>
    </header>
  );
}

