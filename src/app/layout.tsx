import type { Metadata } from "next";
import { Caveat as CaveatFont, Outfit as OutfitFont } from "next/font/google";

import "./globals.css";

const caveat = CaveatFont({
  subsets: ["latin"],
  variable: "--font-caveat",
});

const outfit = OutfitFont({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "My Creative Journal | Portfolio",
  description: "A creative code portfolio inspired by the 'mogra' scrapbook aesthetic.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${caveat.variable} ${outfit.variable} antialiased selection:bg-amber-300 bg-amber-50`}
      >
        {children}
      </body>
    </html>
  );
}
