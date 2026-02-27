import type { Metadata } from "next";
import { Fredoka, JetBrains_Mono, Nunito } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import WhatsAppFab from "@/components/WhatsAppFab";

const bodyFont = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const displayFont = Fredoka({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const monoFont = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Strawberry Stop — Kids’ Furniture & Montessori Toys (Est. 1990)",
    template: "%s — Strawberry Stop",
  },
  description:
    "Strawberry Stop is a New Delhi-based brand for kids’ furniture, Montessori toys, and play school essentials — ISO 9001:2001 certified, est. 1990.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable} ss-grain antialiased bg-cream text-ink`}
      >
        <SmoothScroll>
          <CustomCursor />
          {children}
          <WhatsAppFab />
        </SmoothScroll>
      </body>
    </html>
  );
}
