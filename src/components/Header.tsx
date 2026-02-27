"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Container from "@/components/Container";
import Button from "@/components/Button";
import { BRAND } from "@/lib/brand";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/cn";

const NAV = [
  { label: "Collections", href: "/#collections" },
  { label: "Setups", href: "/#setups" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
] as const;

export default function Header() {
  const pathname = usePathname();
  const cart = useCart();
  const orderCount = cart.totalItems;
  const onHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      <Container className="pt-4">
        <div className="flex items-center justify-between rounded-2xl border border-ink/10 bg-cream/60 px-4 py-3 backdrop-blur-md">
          <Link
            href="/"
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
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/products"
              data-cursor="link"
              className="text-sm font-extrabold text-ink/85 transition-colors hover:text-ink"
            >
              Our Products
            </Link>
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-cursor="link"
                className="text-sm font-bold text-ink/75 transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/checkout"
              data-cursor="link"
              className="relative text-sm font-bold text-ink/75 transition-colors hover:text-ink"
            >
              My Order
              {orderCount > 0 && (
                <span className="ml-2 inline-flex items-center rounded-full bg-strawberry px-2 py-0.5 text-[11px] font-extrabold tracking-wide text-cream">
                  {orderCount}
                </span>
              )}
            </Link>
          </nav>

          <div className="flex items-center gap-3 md:hidden">
            <Link
              href="/checkout"
              data-cursor="link"
              className="relative rounded-full border border-ink/10 bg-cream/60 px-3 py-2 text-xs font-extrabold tracking-wide text-ink/80 backdrop-blur transition-colors hover:text-ink"
              aria-label="My Order"
            >
              Order
              {orderCount > 0 && (
                <span className="ml-2 inline-flex items-center rounded-full bg-strawberry px-2 py-0.5 text-[11px] font-extrabold tracking-wide text-cream">
                  {orderCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="rounded-full border border-ink/10 bg-cream/60 px-4 py-2 text-xs font-extrabold tracking-wide text-ink/80 backdrop-blur transition-colors hover:text-ink"
              aria-expanded={menuOpen}
              aria-controls="ss-mobile-menu"
            >
              Menu
            </button>
          </div>

          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {onHome ? (
              <Button href="/#contact" variant="ghost">
                Get a Quote
              </Button>
            ) : (
              <Button href="/products" variant="ghost">
                Browse Products
              </Button>
            )}
          </motion.div>
        </div>

        <motion.div
          id="ss-mobile-menu"
          initial={false}
          animate={menuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.2, 0.9, 0.2, 1] }}
          className={cn(
            "md:hidden overflow-hidden",
            menuOpen ? "pointer-events-auto" : "pointer-events-none",
          )}
        >
          <div className="mt-3 rounded-2xl border border-ink/10 bg-cream/70 p-3 backdrop-blur-md">
            <div className="flex flex-col gap-2">
              <Link
                href="/products"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-extrabold tracking-wide text-ink/85 transition-colors hover:bg-ink/5"
              >
                Our Products
              </Link>
              <Link
                href="/checkout"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-extrabold tracking-wide text-ink/85 transition-colors hover:bg-ink/5"
              >
                My Order
              </Link>
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-extrabold tracking-wide text-ink/75 transition-colors hover:bg-ink/5 hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-1">
                {onHome ? (
                  <Button href="/#contact" variant="ghost">
                    Get a Quote
                  </Button>
                ) : (
                  <Button href="/products" variant="ghost">
                    Browse Products
                  </Button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </header>
  );
}
