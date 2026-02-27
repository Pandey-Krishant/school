"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function WhatsAppFab() {
  return (
    <motion.a
      href="https://wa.me/919999999999"
      target="_blank"
      rel="noreferrer"
      data-cursor="button"
      className="fixed bottom-5 right-5 z-[60] grid h-14 w-14 place-items-center rounded-full bg-forest shadow-lg shadow-forest/25 ring-1 ring-cream/30"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.6 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.98 }}
      aria-label="Chat on WhatsApp"
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{ boxShadow: ["0 0 0 0 rgba(45,106,79,0.0)", "0 0 0 18px rgba(45,106,79,0.12)"] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
      />
      <Image
        src="/images/WhatsApp_Image_2025-12-15_at_13.16.19.webp"
        alt=""
        width={28}
        height={28}
        className="h-7 w-7 rounded-sm object-cover opacity-95"
      />
    </motion.a>
  );
}

