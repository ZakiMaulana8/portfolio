import type { Metadata } from "next";
import { 
  Cormorant_Garamond as SerifFont, 
  Plus_Jakarta_Sans as SansFont,
  Mrs_Saint_Delafield as ScriptFont
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

const script = ScriptFont({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: "PONGO | Design & Creative Code",
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
