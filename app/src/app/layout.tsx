import type { Metadata } from "next";
import { Cinzel, DM_Sans, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import KonamiCode from "@/components/KonamiCode";
import ScrollToTop from "@/components/ScrollToTop";
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
  metadataBase: new URL("https://treymer.dev"),
  title: {
    default: "treymer.dev — Tyler Reymer",
    template: "%s | treymer.dev",
  },
  description:
    "SRE Engineering Leader, cloud architect, guitarist, mountain biker, and dungeon master. Writing about engineering, leadership, and life.",
  keywords: [
    "SRE",
    "site reliability engineering",
    "cloud engineering",
    "AWS",
    "Terraform",
    "engineering leadership",
    "Next.js",
    "Tyler Reymer",
  ],
  authors: [{ name: "Tyler Reymer", url: "https://treymer.dev" }],
  creator: "Tyler Reymer",
  publisher: "Tyler Reymer",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://treymer.dev",
    siteName: "treymer.dev",
    title: "treymer.dev — Tyler Reymer",
    description:
      "SRE Engineering Leader, cloud architect, guitarist, mountain biker, and dungeon master. Writing about engineering, leadership, and life.",
    images: [
      {
        url: "https://treymer.dev/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "treymer.dev — Tyler Reymer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "treymer.dev — Tyler Reymer",
    description:
      "SRE Engineering Leader, cloud architect, guitarist, mountain biker, and dungeon master. Writing about engineering, leadership, and life.",
    images: ["https://treymer.dev/images/og-image.png"],
    creator: "@treymer",
  },
  alternates: {
    canonical: "https://treymer.dev",
  },
  verification: {
    google: "8o7cnHZ0vaqiZ3ePA353FgRhT29NkcAz0jrss7K8i4M",
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
        className={`${cinzel.variable} ${dmSans.variable} ${jetbrainsMono.variable} min-h-screen bg-[#2D1B0E] font-sans text-[#F4E4C1] antialiased`}
      >
        <ScrollToTop />
        <Nav />
        <main className="min-h-[calc(100vh-8rem)] pt-16">{children}</main>
        <Footer />
        <KonamiCode />
        <Script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "4ac77f702da84210a24690f14e4b9237"}'
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
