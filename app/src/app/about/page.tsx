import Link from "next/link";

export const metadata = {
  title: "About",
  description:
    "Tyler Reymer — SRE Engineering Manager at Walt Disney Company. 10+ years in cloud, SRE, and datacenter. Guitar, mountain biking, husband and father.",
};

export default function AboutPage() {
  return (
    <div className="scroll-smooth">
      {/* Hero / Intro */}
      <section className="px-6 pb-16 pt-8 md:pb-24 md:pt-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Tyler Reymer
          </h1>
          <p className="mt-3 text-xl font-medium text-cyan-400 sm:text-2xl">
            SRE Engineering Manager at Walt Disney Company
          </p>
          <p className="mt-6 text-lg leading-relaxed text-zinc-400">
            I&apos;ve spent over a decade in cloud engineering, site reliability,
            and data center operations. These days I lead SRE teams at Disney —
            helping keep the magic running behind the scenes. I&apos;m passionate
            about building systems that don&apos;t break, growing teams that ship
            with confidence, and the messy, human side of technology leadership.
          </p>
          <div className="mt-10 h-px w-24 bg-linear-to-r from-cyan-500/80 to-transparent" />
        </div>
      </section>

      {/* Professional Background */}
      <section className="border-t border-white/5 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Professional background
          </h2>
          <p className="mt-2 text-zinc-400">
            How I got here, and what I do now
          </p>

          <div className="mt-10 space-y-8">
            {/* Current role */}
            <div className="relative pl-6">
              <div className="absolute left-0 top-2 h-3 w-3 rounded-full bg-cyan-500 ring-4 ring-cyan-500/20" />
              <div className="rounded-lg border border-white/10 bg-white/2 p-6">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="inline-block rounded-full bg-cyan-500/20 px-2.5 py-0.5 text-xs font-medium text-cyan-400">
                    Current
                  </span>
                  <span className="text-sm text-zinc-500">2023 — Present</span>
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold text-white">
                  SRE Engineering Manager
                </h3>
                <p className="text-cyan-400">Walt Disney Company</p>
                <p className="mt-3 text-zinc-400">
                  Leading SRE teams focused on incident management, cloud
                  infrastructure, and reliability engineering. My days are a mix
                  of unblocking engineers, designing for resilience, and building
                  teams that care about the systems they run.
                </p>
              </div>
            </div>

            {/* Previous roles */}
            <div className="relative pl-6">
              <div className="absolute left-0 top-2 h-3 w-3 rounded-full border-2 border-cyan-500/50 bg-zinc-950" />
              <div className="rounded-lg border border-white/10 bg-white/2 p-6">
                <span className="text-sm text-zinc-500">Previously</span>
                <h3 className="mt-2 font-display text-lg font-semibold text-white">
                  Cloud Engineering · SRE · Data Center
                </h3>
                <p className="mt-2 text-zinc-400">
                  Years of hands-on work across cloud platforms, data center
                  operations, and SRE practices before moving into leadership.
                  I&apos;ve been in the trenches — I know what it takes to keep
                  systems up and teams sane.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hobbies & Life Outside Work */}
      <section className="border-t border-white/5 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Life outside work
          </h2>
          <p className="mt-2 text-zinc-400">The things that keep me grounded</p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-white/2 p-6">
              <div className="text-cyan-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8"
                >
                  <path d="m11.035 15.493 8.507 8.507" />
                  <path d="M19 4.583 4.583 19" />
                  <path d="M12 3a4 4 0 0 1 4 4c0 .938-.338 1.804-.9 2.475l-5.575 5.575a4 4 0 0 1-5.65-5.65L9.525 6.9A4 4 0 0 1 12 3Z" />
                  <path d="m16 9 5-5" />
                </svg>
              </div>
              <h3 className="mt-4 font-display font-semibold text-white">
                Guitar
              </h3>
              <p className="mt-2 text-sm text-zinc-400">
                Playing, learning, and the occasional jam session. It&apos;s
                meditative in a way that nothing else is.
              </p>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/2 p-6">
              <div className="text-cyan-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8"
                >
                  <circle cx="5.5" cy="17.5" r="3.5" />
                  <circle cx="18.5" cy="17.5" r="3.5" />
                  <path d="M12 17.5V4l-4 7h4" />
                  <path d="m12 4 3 7 5 6.5" />
                </svg>
              </div>
              <h3 className="mt-4 font-display font-semibold text-white">
                Mountain biking
              </h3>
              <p className="mt-2 text-sm text-zinc-400">
                Trail riding and single track. The climbs are brutal, the
                descents make it worth it.
              </p>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/2 p-6">
              <div className="text-cyan-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  <path d="M12 11v6" />
                  <path d="M9 14h6" />
                </svg>
              </div>
              <h3 className="mt-4 font-display font-semibold text-white">
                Husband & father
              </h3>
              <p className="mt-2 text-sm text-zinc-400">
                Family first. Everything else — work, hobbies, side projects —
                comes after.
              </p>
            </div>
          </div>

          <p className="mt-10 text-lg leading-relaxed text-zinc-400">
            The common thread? I like getting lost in something — whether
            it&apos;s a riff, a trail, or time with my people. That same focus
            shows up in how I approach engineering and leadership: deep work,
            real connections, and doing things that matter.
          </p>
        </div>
      </section>

      {/* Connect */}
      <section className="border-t border-white/5 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Let&apos;s connect
          </h2>
          <p className="mt-2 text-zinc-400">
            Always happy to chat about SRE, leadership, or the best trails in
            SoCal
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-6">
            <Link
              href="https://github.com/treymer"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/2 px-8 py-4 font-semibold text-white transition-all hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-400"
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
              className="flex flex-1 items-center justify-center gap-3 rounded-xl bg-cyan-500 px-8 py-4 font-semibold text-zinc-950 transition-all hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/25"
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
