import Link from "next/link";

export const metadata = {
  title: "Portfolio",
  description:
    "Experience, skills, and work. SRE Engineering Manager at Walt Disney Company. Cloud, infrastructure, reliability engineering.",
};

const skillCategories = [
  {
    label: "Cloud",
    color: "cyan",
    skills: ["AWS", "GCP", "Cloudflare"],
  },
  {
    label: "Infrastructure",
    color: "emerald",
    skills: ["Terraform", "Kubernetes", "Docker"],
  },
  {
    label: "Reliability",
    color: "amber",
    skills: ["SRE", "Incident Management", "Observability"],
  },
  {
    label: "Languages",
    color: "violet",
    skills: ["Python", "Go", "TypeScript"],
  },
  {
    label: "CI/CD",
    color: "rose",
    skills: ["GitHub Actions", "GitLab CI"],
  },
  {
    label: "Currently Learning",
    color: "sky",
    skills: ["Next.js", "React", "Vibe Coding"],
  },
];

const badgeColors: Record<string, string> = {
  cyan: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  emerald: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  amber: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  violet: "bg-violet-500/20 text-violet-400 border-violet-500/30",
  rose: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  sky: "bg-sky-500/20 text-sky-400 border-sky-500/30",
};

export default function PortfolioPage() {
  return (
    <div className="scroll-smooth">
      {/* Page header */}
      <section className="px-6 pb-16 pt-8 md:pb-24 md:pt-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Portfolio
          </h1>
          <p className="mt-3 text-lg text-zinc-400 sm:text-xl">
            A summary of my experience, skills, and work
          </p>
          <div className="mt-8 h-px w-24 bg-linear-to-r from-cyan-500/80 to-transparent" />
        </div>
      </section>

      {/* Experience timeline */}
      <section className="border-t border-white/5 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Experience
          </h2>
          <p className="mt-2 text-zinc-400">Career progression and focus areas</p>

          <div className="mt-10">
            {/* Vertical line */}
            <div className="relative border-l-2 border-white/10 pl-6 sm:pl-8">
              {/* Current role */}
              <div className="relative pb-10">
                <div className="absolute -left-[29px] top-2 h-3 w-3 rounded-full bg-cyan-500 ring-4 ring-cyan-500/20 sm:-left-[33px]" />
                <div className="rounded-xl border border-white/10 bg-white/2 p-6">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="rounded-full bg-cyan-500/20 px-2.5 py-0.5 text-xs font-medium text-cyan-400">
                      Current
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-semibold text-white">
                    SRE Engineering Manager
                  </h3>
                  <p className="text-cyan-400">Walt Disney Company</p>
                  <p className="mt-4 text-zinc-400">
                    Leading SRE teams supporting large scale streaming and theme
                    park technology. Focus on cloud infrastructure, incident
                    management, reliability engineering, and team leadership.
                  </p>
                </div>
              </div>

              {/* Previous roles */}
              <div className="relative">
                <div className="absolute -left-[29px] top-2 h-3 w-3 rounded-full border-2 border-cyan-500/50 bg-zinc-950 sm:-left-[33px]" />
                <div className="rounded-xl border border-white/10 bg-white/2 p-6">
                  <span className="text-sm text-zinc-500">Previously</span>
                  <h3 className="mt-2 font-display text-lg font-semibold text-white">
                    Cloud Engineer / SRE
                  </h3>
                  <p className="mt-1 text-zinc-400">
                    Cloud engineering, data center operations, site reliability.
                    AWS, GCP, infrastructure automation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical skills */}
      <section className="border-t border-white/5 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Technical skills
          </h2>
          <p className="mt-2 text-zinc-400">
            Tools and technologies I work with
          </p>

          <div className="mt-10 space-y-8">
            {skillCategories.map((category) => (
              <div key={category.label}>
                <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-zinc-500">
                  {category.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`rounded-lg border px-3 py-1.5 text-sm font-medium ${badgeColors[category.color]}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Currently building */}
      <section className="border-t border-white/5 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Currently building
          </h2>
          <p className="mt-2 text-zinc-400">Side projects and experiments</p>

          <div className="mt-10">
            <Link
              href="https://github.com/treymer/treymer.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl border border-white/10 bg-white/2 p-6 transition-all hover:border-cyan-500/30 hover:bg-cyan-500/5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-display text-xl font-semibold text-white transition-colors group-hover:text-cyan-400">
                    treymer.dev
                  </h3>
                  <p className="mt-2 text-zinc-400">
                    Personal site and blog built with Next.js, AWS S3/CloudFront,
                    Terraform, GitHub Actions. This site.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Next.js", "AWS", "Terraform", "MDX"].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-cyan-500/20 px-2 py-0.5 text-xs font-medium text-cyan-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-cyan-400 group-hover:underline sm:shrink-0">
                  View on GitHub
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Connect */}
      <section className="border-t border-white/5 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
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
