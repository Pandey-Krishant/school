"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Preloader from "@/components/Preloader";
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
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Preloader onDone={() => setLoaded(true)} />
      {loaded && <Header />}
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

