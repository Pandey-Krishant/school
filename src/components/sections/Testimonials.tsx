import Container from "@/components/Container";
import Marquee from "@/components/Marquee";
import SplitHeading from "@/components/SplitHeading";

const TESTIMONIALS = [
  "★★★★★ · Little Steps Montessori, Delhi",
  "★★★★★ · Sunshine Play School, Gurgaon",
  "★★★★★ · Happy Minds Preschool, Noida",
  "★★★★★ · The Learning Tree, New Delhi",
  "★★★★★ · Tiny Tots Academy, Faridabad",
  "★★★★★ · Maple Kids Campus, Delhi NCR",
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24">
      <Container>
        <div className="text-xs font-extrabold tracking-wide text-ink/60">
          Social Proof
        </div>
        <SplitHeading
          text="Trusted by schools that care about quality."
          className="mt-2 max-w-4xl font-[family-name:var(--font-display)] text-4xl font-black tracking-tight text-ink md:text-5xl"
        />
      </Container>

      <div className="mt-12 space-y-4 border-y border-ink/10 bg-cream/55 py-6 backdrop-blur">
        <Marquee items={TESTIMONIALS} duration={24} />
        <Marquee
          items={TESTIMONIALS}
          reverse
          duration={22}
          className="opacity-80"
        />
      </div>
    </section>
  );
}

