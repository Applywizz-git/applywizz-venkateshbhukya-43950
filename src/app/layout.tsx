import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Orbitron, Rajdhani, Space_Grotesk, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-rajdhani" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Venkatesh Bhukya | Data Engineer",
  description:
    "Portfolio of Venkatesh Bhukya, a Data Engineer with 5+ years of experience in cloud ETL, data pipelines, and analytics across banking, healthcare, and retail environments.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${orbitron.variable} ${syne.variable} ${space.variable} ${rajdhani.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
