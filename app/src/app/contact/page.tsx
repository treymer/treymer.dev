import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Tyler Reymer. Send a message about engineering, collaboration, or just to say hello.",
  openGraph: {
    title: "Contact | treymer.dev",
    description:
      "Get in touch with Tyler Reymer. Send a message about engineering, collaboration, or just to say hello.",
    url: "https://treymer.dev/contact",
    images: [
      {
        url: "https://treymer.dev/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contact Tyler Reymer",
      },
    ],
  },
  twitter: {
    title: "Contact | treymer.dev",
    description:
      "Get in touch with Tyler Reymer. Send a message about engineering, collaboration, or just to say hello.",
    images: ["https://treymer.dev/images/og-image.png"],
  },
  alternates: {
    canonical: "https://treymer.dev/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="overflow-x-hidden px-6 pb-16 pt-8 md:pb-20 md:pt-12">
      <div className="mx-auto max-w-2xl">
        <header>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-[#F4E4C1] sm:text-5xl">
            Contact
          </h1>
          <p className="mt-3 text-lg text-[#C4A882]">
            Send a raven, or just fill out this form.
          </p>
          <div className="mt-6 h-px w-24 bg-gradient-to-r from-[#6D28D9]/60 to-transparent" />
        </header>

        <div className="mt-10">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
