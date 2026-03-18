import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Tyler Reymer — SRE Engineering Leader with 12+ years in cloud, infrastructure, and reliability engineering. Guitar player, mountain biker, dungeon master.",
  openGraph: {
    title: "About Tyler Reymer",
    description:
      "Learn about Tyler Reymer — SRE Engineering Leader with 12+ years in cloud, infrastructure, and reliability engineering. Guitar player, mountain biker, dungeon master.",
    url: "https://treymer.dev/about",
    type: "profile",
    images: [
      {
        url: "https://treymer.dev/images/avatar.webp",
        width: 600,
        height: 800,
        alt: "Tyler Reymer — Cloud Paladin, SRE Guild Master",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Tyler Reymer",
    description:
      "Learn about Tyler Reymer — SRE Engineering Leader with 12+ years in cloud, infrastructure, and reliability engineering.",
    images: ["https://treymer.dev/images/avatar.webp"],
  },
  alternates: {
    canonical: "https://treymer.dev/about",
  },
};

// Section divider component with diamond
function SectionDivider() {
  return (
    <div className="section-divider mx-auto max-w-3xl px-6">
      <div className="section-divider-diamond" />
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="scroll-smooth overflow-x-hidden">
      {/* Hero / Intro */}
      <section className="hero-section relative px-6 pb-12 pt-8 md:pb-16 md:pt-12">
        <div className="hero-purple-glow" />
        <div className="mx-auto max-w-3xl relative">
          <h1 className="font-display text-4xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-5xl md:text-6xl">
            Tyler Reymer
          </h1>
          <p className="mt-3 text-xl font-medium text-[#0EA89A] sm:text-2xl">
            Engineering Leader & SRE Manager
          </p>
          <p className="mt-6 text-lg leading-relaxed text-[var(--text-secondary)]">
            I&apos;ve spent over a decade in cloud engineering, site reliability,
            and data center operations. These days I lead SRE teams focused on
            keeping large-scale systems running reliably. I&apos;m passionate
            about building systems that don&apos;t break, growing teams that ship
            with confidence, and the messy, human side of technology leadership.
          </p>
          <div className="mt-8 h-px w-24 bg-gradient-to-r from-[#6D28D9]/60 to-transparent" />
        </div>
      </section>

      <SectionDivider />

      {/* Professional Background */}
      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="title-purple-glow inline-block">
            <h2 className="font-display text-2xl font-semibold text-[var(--text-primary)] sm:text-3xl">
              Professional background
            </h2>
          </div>
          <p className="mt-2 text-[var(--text-muted)]">
            How I got here, and what I do now
          </p>

          <div className="mt-8 space-y-6">
            {/* Current role */}
            <div className="relative pl-6">
              <div
                className="absolute left-0 top-2 h-3 w-3 rounded-full bg-[#D4A017]"
                style={{ boxShadow: "0 0 12px rgba(109, 40, 217, 0.5), 0 0 4px rgba(212, 160, 23, 0.5)" }}
              />
              <div className="rounded-xl border border-[#8B6914] bg-[#F4E4C1] p-6 shadow-lg">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="inline-block rounded-full bg-[#6D28D9]/15 px-2.5 py-0.5 text-xs font-medium text-[#6D28D9]">
                    Current
                  </span>
                  <span className="text-sm text-[var(--text-muted)]">2024 — Present</span>
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold text-[#2D1B0E]">
                  Manager, Systems Reliability Engineering
                </h3>
                <p className="text-[#0EA89A]">The Walt Disney Company</p>
                <p className="mt-3 text-[#5C3D2E]">
                  Leading a globally scalable SRE team supporting business-critical
                  cloud applications including AI platforms, SAP, Tableau, and data
                  science infrastructure. Partnering with executive leadership on
                  strategy, budgets, and roadmaps.
                </p>
              </div>
            </div>

            {/* Edwards Lifesciences */}
            <div className="relative pl-6">
              <div
                className="absolute left-0 top-2 h-3 w-3 rounded-full border-2 border-[#D4A017] bg-[var(--background)]"
                style={{ boxShadow: "0 0 8px rgba(109, 40, 217, 0.3)" }}
              />
              <div className="rounded-xl border border-[#8B6914] bg-[#F4E4C1] p-6 shadow-lg">
                <span className="text-sm text-[var(--text-muted)]">2022 — 2024</span>
                <h3 className="mt-2 font-display text-lg font-semibold text-[#2D1B0E]">
                  Senior Manager, Cloud & Site Reliability Engineering
                </h3>
                <p className="text-[#0EA89A]">Edwards Lifesciences</p>
                <p className="mt-2 text-[#5C3D2E]">
                  Led a global engineering team responsible for AWS infrastructure,
                  SRE practices, and cloud spend optimization for complex manufacturing
                  and product applications.
                </p>
              </div>
            </div>

            {/* Red Hat */}
            <div className="relative pl-6">
              <div
                className="absolute left-0 top-2 h-3 w-3 rounded-full border-2 border-[#D4A017] bg-[var(--background)]"
                style={{ boxShadow: "0 0 8px rgba(109, 40, 217, 0.3)" }}
              />
              <div className="rounded-xl border border-[#8B6914] bg-[#F4E4C1] p-6 shadow-lg">
                <span className="text-sm text-[var(--text-muted)]">2021 — 2022</span>
                <h3 className="mt-2 font-display text-lg font-semibold text-[#2D1B0E]">
                  Cloud Engineer / Site Reliability Engineer
                </h3>
                <p className="text-[#0EA89A]">Red Hat</p>
                <p className="mt-2 text-[#5C3D2E]">
                  Architected and supported 400+ OpenShift clusters across multiple
                  clouds. Designed FedRAMP compliant AWS environments and hybrid
                  cloud infrastructure.
                </p>
              </div>
            </div>

            {/* Blizzard */}
            <div className="relative pl-6">
              <div
                className="absolute left-0 top-2 h-3 w-3 rounded-full border-2 border-[#D4A017] bg-[var(--background)]"
                style={{ boxShadow: "0 0 8px rgba(109, 40, 217, 0.3)" }}
              />
              <div className="rounded-xl border border-[#8B6914] bg-[#F4E4C1] p-6 shadow-lg">
                <span className="text-sm text-[var(--text-muted)]">2015 — 2021</span>
                <h3 className="mt-2 font-display text-lg font-semibold text-[#2D1B0E]">
                  Cloud Engineer / Data Center Administrator
                </h3>
                <p className="text-[#0EA89A]">Blizzard Entertainment</p>
                <p className="mt-2 text-[#5C3D2E]">
                  Hybrid cloud engineering supporting games with millions of concurrent
                  players. Architected cloud governance for GCP and AWS, and designed
                  next-generation global data centers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Hobbies & Life Outside Work */}
      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="title-purple-glow inline-block">
            <h2 className="font-display text-2xl font-semibold text-[var(--text-primary)] sm:text-3xl">
              Life outside work
            </h2>
          </div>
          <p className="mt-2 text-[var(--text-muted)]">The things that keep me grounded</p>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-[#8B6914] bg-[#F4E4C1] p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#6D28D9] hover:shadow-[0_12px_32px_rgba(0,0,0,0.5),0_0_20px_rgba(109,40,217,0.15)]">
              <div className="inline-flex rounded-lg bg-[#6D28D9]/20 p-2.5 text-[#6D28D9]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-7 w-7"
                >
                  <path d="m11.035 15.493 8.507 8.507" />
                  <path d="M19 4.583 4.583 19" />
                  <path d="M12 3a4 4 0 0 1 4 4c0 .938-.338 1.804-.9 2.475l-5.575 5.575a4 4 0 0 1-5.65-5.65L9.525 6.9A4 4 0 0 1 12 3Z" />
                  <path d="m16 9 5-5" />
                </svg>
              </div>
              <h3 className="mt-4 font-display font-semibold text-[#2D1B0E]">
                Guitar
              </h3>
              <p className="mt-2 text-sm text-[#5C3D2E]">
                Playing, learning, and the occasional jam session. It&apos;s
                meditative in a way that nothing else is.
              </p>
            </div>

            <div className="rounded-xl border border-[#8B6914] bg-[#F4E4C1] p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#0EA89A] hover:shadow-[0_12px_32px_rgba(0,0,0,0.5),0_0_20px_rgba(13,148,136,0.15)]">
              <div className="inline-flex rounded-lg bg-[#0EA89A]/20 p-2.5 text-[#0EA89A]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-7 w-7"
                >
                  <circle cx="5.5" cy="17.5" r="3.5" />
                  <circle cx="18.5" cy="17.5" r="3.5" />
                  <path d="M12 17.5V4l-4 7h4" />
                  <path d="m12 4 3 7 5 6.5" />
                </svg>
              </div>
              <h3 className="mt-4 font-display font-semibold text-[#2D1B0E]">
                Mountain biking
              </h3>
              <p className="mt-2 text-sm text-[#5C3D2E]">
                Trail riding and single track. The climbs are brutal, the
                descents make it worth it.
              </p>
            </div>

            <div className="rounded-xl border border-[#8B6914] bg-[#F4E4C1] p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#CC2222] hover:shadow-[0_12px_32px_rgba(0,0,0,0.5),0_0_20px_rgba(153,27,27,0.15)]">
              <div className="inline-flex rounded-lg bg-[#CC2222]/20 p-2.5 text-[#CC2222]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-7 w-7"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <h3 className="mt-4 font-display font-semibold text-[#2D1B0E]">
                Husband & father
              </h3>
              <p className="mt-2 text-sm text-[#5C3D2E]">
                Family first. Everything else — work, hobbies, side projects —
                comes after.
              </p>
            </div>
          </div>

          <p className="mt-8 text-lg leading-relaxed text-[var(--text-secondary)]">
            The common thread? I like getting lost in something — whether
            it&apos;s a riff, a trail, or time with my people. That same focus
            shows up in how I approach engineering and leadership: deep work,
            real connections, and doing things that matter.
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* Connect */}
      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="title-purple-glow inline-block">
            <h2 className="font-display text-2xl font-semibold text-[var(--text-primary)] sm:text-3xl">
              Let&apos;s connect
            </h2>
          </div>
          <p className="mt-2 text-[var(--text-muted)]">
            Always happy to chat about SRE, leadership, or the best trails in
            SoCal
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-6">
            <Link
              href="https://github.com/treymer"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-3 rounded-xl border border-[#8B6914] bg-[#F4E4C1] px-8 py-4 font-semibold text-[#2D1B0E] shadow-lg transition-all hover:-translate-y-0.5 hover:border-[#D4A017] hover:shadow-[0_12px_32px_rgba(0,0,0,0.5),0_0_20px_rgba(109,40,217,0.15)]"
            >
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              GitHub
            </Link>
            <Link
              href="https://www.linkedin.com/in/tyler-reymer/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex flex-1 items-center justify-center gap-3 rounded-xl px-8 py-4 font-semibold shadow-md transition-all hover:-translate-y-0.5"
            >
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
