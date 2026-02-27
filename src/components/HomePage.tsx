"use client";

import AboutTrust from "@/components/sections/AboutTrust";
import ActivitySplit from "@/components/sections/ActivitySplit";
import ClassroomShowcase from "@/components/sections/ClassroomShowcase";
import Collections from "@/components/sections/Collections";
import ContactCTA from "@/components/sections/ContactCTA";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import PlayArea from "@/components/sections/PlayArea";
import Testimonials from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <>
      <main className="relative">
        <Hero />
        <AboutTrust />
        <Collections />
        <FeaturedProducts />
        <ClassroomShowcase />
        <ActivitySplit />
        <PlayArea />
        <Testimonials />
        <ContactCTA />
        <Footer />
      </main>
    </>
  );
}
