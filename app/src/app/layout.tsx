import type { Metadata } from "next";
import { Syne, JetBrains_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "treymer.dev — SRE Engineering Manager",
    template: "%s | treymer.dev",
  },
  description:
    "SRE Engineering Manager at Walt Disney Company. Building reliable systems at scale.",
  openGraph: {
    title: "treymer.dev",
    description: "SRE Engineering Manager at Walt Disney Company",
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
        className={`${syne.variable} ${jetbrainsMono.variable} min-h-screen bg-zinc-950 font-sans text-zinc-100 antialiased`}
      >
        <Nav />
        <main className="min-h-[calc(100vh-8rem)] pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
