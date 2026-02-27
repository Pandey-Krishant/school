"use client";

import { ReactNode, useEffect, useState } from "react";
import Header from "@/components/Header";
import Preloader from "@/components/Preloader";
import PageTransition from "@/components/PageTransition";
import { CartProvider } from "@/lib/cart";

export default function AppChrome({ children }: { children: ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [loaded]);

  return (
    <CartProvider>
      <Preloader onDone={() => setLoaded(true)} />
      {loaded && <Header />}
      <PageTransition>{children}</PageTransition>
    </CartProvider>
  );
}
