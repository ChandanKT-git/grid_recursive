import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

/**
 * Using Inter for a clean, modern look that works well
 * with the minimal grid aesthetic.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Recursive Grid",
  description:
    "Interactive 3×3 grid with click-driven ripple propagation, built with Next.js and TypeScript.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
