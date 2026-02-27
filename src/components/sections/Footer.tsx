import Image from "next/image";
import Container from "@/components/Container";
import { BRAND } from "@/lib/brand";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[radial-gradient(900px_520px_at_18%_18%,rgba(232,39,75,0.22),transparent_62%),radial-gradient(860px_520px_at_82%_38%,rgba(255,209,102,0.18),transparent_60%),linear-gradient(to_bottom,#0b0b0b,#121212)] text-cream">
      <div className="absolute inset-0 opacity-25">
        <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-strawberry/35 blur-3xl" />
        <div className="absolute -right-16 top-24 h-72 w-72 rounded-full bg-sun/25 blur-3xl" />
      </div>

      <Container className="relative py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.webp"
                alt=""
                width={44}
                height={44}
                className="h-11 w-11 rounded-full object-cover ring-1 ring-cream/15"
              />
              <div>
                <div className="font-[family-name:var(--font-display)] text-2xl font-black tracking-tight">
                  {BRAND.name}
                </div>
                <div className="text-xs font-semibold text-cream/70">
                  {BRAND.tagline}
                </div>
              </div>
            </div>
            <div className="mt-6 text-sm font-semibold leading-7 text-cream/70">
              ISO 9001:2001 certified · Est. 1990 · New Delhi
              <div className="mt-2 text-xs text-cream/60">
                This is a premium animated concept homepage built with Next.js,
                Tailwind, GSAP, Framer Motion, and Lenis.
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="grid gap-8 sm:grid-cols-3">
              <div>
                <div className="text-xs font-extrabold tracking-wide text-cream/60">
                  Explore
                </div>
                <div className="mt-3 space-y-2 text-sm font-semibold text-cream/75">
                  <a
                    href="#collections"
                    data-cursor="link"
                    className="block hover:text-cream"
                  >
                    Collections
                  </a>
                  <a
                    href="#setups"
                    data-cursor="link"
                    className="block hover:text-cream"
                  >
                    Classroom Setups
                  </a>
                  <a
                    href="#testimonials"
                    data-cursor="link"
                    className="block hover:text-cream"
                  >
                    Testimonials
                  </a>
                </div>
              </div>

              <div>
                <div className="text-xs font-extrabold tracking-wide text-cream/60">
                  Contact
                </div>
                <div className="mt-3 space-y-2 text-sm font-semibold text-cream/75">
                  <a
                    href="tel:+919999999999"
                    data-cursor="link"
                    className="block hover:text-cream"
                  >
                    +91 99999 99999
                  </a>
                  <a
                    href="mailto:hello@strawberrystop.in"
                    data-cursor="link"
                    className="block hover:text-cream"
                  >
                    hello@strawberrystop.in
                  </a>
                  <a
                    href="https://wa.me/919999999999"
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="link"
                    className="block hover:text-cream"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>

              <div>
                <div className="text-xs font-extrabold tracking-wide text-cream/60">
                  Newsletter
                </div>
                <div className="mt-3 text-sm font-semibold text-cream/70">
                  Monthly inspiration for classrooms & play corners.
                </div>
                <form className="mt-4 flex gap-2">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-full bg-cream/10 px-4 py-3 text-sm font-semibold text-cream placeholder:text-cream/40 ring-1 ring-cream/15 outline-none focus:ring-2 focus:ring-cream/35"
                  />
                  <button
                    type="button"
                    data-cursor="button"
                    className="rounded-full bg-strawberry px-5 py-3 text-sm font-extrabold text-cream transition-transform hover:scale-[1.02] active:scale-[0.99]"
                  >
                    Join
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-cream/10 pt-6 text-xs font-semibold text-cream/55">
          © {new Date().getFullYear()} Strawberry Stop. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
