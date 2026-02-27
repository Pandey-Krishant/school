"use client";

import Container from "@/components/Container";
import Button from "@/components/Button";
import SplitHeading from "@/components/SplitHeading";

export default function ContactCTA() {
  return (
    <section id="contact" className="relative py-28">
      <Container>
        <div className="rounded-[2.75rem] border border-ink/10 bg-[radial-gradient(700px_360px_at_25%_25%,rgba(232,39,75,0.22),transparent_65%),radial-gradient(800px_420px_at_80%_60%,rgba(255,209,102,0.22),transparent_65%)] px-7 py-12 md:px-12 md:py-16">
          <div className="grid gap-10 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <div className="text-xs font-extrabold tracking-wide text-ink/60">
                Contact
              </div>
              <SplitHeading
                text="Let’s Build Your Dream Classroom"
                className="mt-2 font-[family-name:var(--font-display)] text-4xl font-black tracking-tight text-ink md:text-6xl"
              />
              <p className="mt-5 max-w-xl text-sm font-semibold leading-7 text-ink/65">
                Share your space and budget—we’ll recommend a setup that feels
                premium, playful, and durable enough for daily school life.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href="#collections">Browse Collections</Button>
                <a
                  href="tel:+919999999999"
                  data-cursor="link"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-cream/55 px-5 py-3 text-sm font-extrabold text-ink/75 backdrop-blur transition-colors hover:bg-cream/75"
                >
                  Call: +91 99999 99999
                </a>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="rounded-3xl border border-ink/10 bg-cream/60 p-6 backdrop-blur">
                <div className="text-xs font-extrabold tracking-wide text-ink/60">
                  Quick details
                </div>
                <div className="mt-3 grid gap-3 text-sm font-semibold text-ink/70">
                  <div className="flex items-center justify-between">
                    <span>Location</span>
                    <span className="font-extrabold text-ink">New Delhi</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Certification</span>
                    <span className="font-extrabold text-ink">
                      ISO 9001:2001
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Since</span>
                    <span className="font-extrabold text-ink">1990</span>
                  </div>
                </div>
                <div className="mt-6 rounded-2xl bg-strawberry px-5 py-4 text-cream">
                  <div className="text-xs font-extrabold tracking-wide text-cream/75">
                    WhatsApp
                  </div>
                  <div className="mt-1 text-sm font-semibold text-cream/90">
                    Fast replies for catalogue, pricing, and bulk orders.
                  </div>
                  <a
                    href="https://wa.me/919999999999"
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="button"
                    className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-cream px-5 py-3 text-sm font-extrabold text-ink transition-transform hover:scale-[1.01] active:scale-[0.99]"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

