import type { Metadata } from "next";
import { Cinzel, DM_Sans, JetBrains_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import KonamiCode from "@/components/KonamiCode";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "treymer.dev — Engineering Leader & SRE Manager",
    template: "%s | treymer.dev",
  },
  description:
    "Engineering Leader & SRE Manager. Building reliable systems at scale.",
  openGraph: {
    title: "treymer.dev",
    description: "Engineering Leader & SRE Manager. Building reliable systems at scale.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${cinzel.variable} ${dmSans.variable} ${jetbrainsMono.variable} min-h-screen bg-[#1A0F0A] font-sans text-[#F4E4C1] antialiased`}
      >
        <Nav />
        <main className="min-h-[calc(100vh-8rem)] pt-16">{children}</main>
        <Footer />
        <KonamiCode />
      </body>
    </html>
  );
}
