"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import { usePrefersReducedMotion } from "@/lib/motion";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, reduced]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={reduced ? false : { opacity: 0, y: 10, filter: "blur(6px)" }}
        animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8, filter: "blur(6px)" }}
        transition={{ duration: 0.45, ease: [0.2, 0.9, 0.2, 1] }}
      >
        <div id="top" />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
