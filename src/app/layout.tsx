import type { Metadata } from "next";
import { 
  Cormorant_Garamond as SerifFont, 
  Plus_Jakarta_Sans as SansFont,
  Instrument_Serif as AccentFont
} from "next/font/google";

import "./globals.css";

const serif = SerifFont({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
});

const sans = SansFont({
  subsets: ["latin"],
  variable: "--font-sans",
});

const script = AccentFont({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic", "normal"],
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: "ZAKI | Design & Creative Code",
  description: "A premium digital journal of selected works and experiments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${serif.variable} ${sans.variable} ${script.variable} antialiased selection:bg-amber-300 bg-[#fffcf0]`}
      >
        {children}
      </body>
    </html>
  );
}
