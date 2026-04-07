import type { Metadata } from "next";
import { Anton, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/nav/Navbar";
import { SiteFooter } from "@/components/nav/SiteFooter";
import { RouteTransitions } from "@/components/motion/RouteTransitions";

const display = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
  display: "swap"
});

const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap"
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "FRC 2785 Prometheus",
  description: "Kent School FRC Team 2785 — Prometheus.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#002147] font-sans">
        <div className="fixed inset-0 -z-50 bg-[#002147]" />
        <div className="fixed inset-0 -z-40 opacity-[0.22] noise" />
        <div className="fixed inset-0 -z-30 opacity-[0.16] gridlines" />
        <Navbar />
        <RouteTransitions>{children}</RouteTransitions>
        <SiteFooter />
      </body>
    </html>
  );
}
