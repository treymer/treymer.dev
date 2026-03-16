import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Tyler Reymer's professional experience, technical skills, and projects. 12+ years in SRE, cloud architecture, and engineering leadership at companies like Blizzard, Red Hat, and Edwards Lifesciences.",
  openGraph: {
    title: "Portfolio | treymer.dev",
    description:
      "Tyler Reymer's professional experience, technical skills, and projects. 12+ years in SRE, cloud architecture, and engineering leadership.",
    url: "https://treymer.dev/portfolio",
    type: "website",
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
    title: "Portfolio | treymer.dev",
    description:
      "Tyler Reymer's professional experience, technical skills, and projects. 12+ years in SRE, cloud architecture, and engineering leadership.",
    images: ["https://treymer.dev/images/avatar.webp"],
  },
  alternates: {
    canonical: "https://treymer.dev/portfolio",
  },
};

const skillCategories = [
  {
    label: "Cloud",
    color: "teal",
    skills: ["AWS", "GCP", "Azure", "OpenStack"],
  },
  {
    label: "Automation",
    color: "teal",
    skills: ["Python", "Terraform", "Ansible", "Puppet", "Golang"],
  },
  {
    label: "Containers",
    color: "purple",
    skills: ["Docker", "Kubernetes", "OpenShift", "ECS", "EKS", "GKE"],
  },
  {
    label: "SRE",
    color: "crimson",
    skills: ["Observability", "Disaster Recovery", "Incident Response", "Monitoring", "Cybersecurity"],
  },
  {
    label: "AI",
    color: "purple",
    skills: ["Prompt Engineering", "Claude", "ChatGPT", "Cloud AI Services"],
  },
  {
    label: "Currently Learning",
    color: "teal",
    skills: ["Next.js", "React", "Vibe Coding"],
  },
];

const badgeColors: Record<string, string> = {
  teal: "bg-[#0D9488]/15 text-[#0D9488] border-[#0D9488]/30",
  crimson: "bg-[#991B1B]/15 text-[#991B1B] border-[#991B1B]/30",
  purple: "bg-[#6D28D9]/15 text-[#6D28D9] border-[#6D28D9]/30",
};

const labelColors: Record<string, string> = {
  teal: "text-[#0D9488]",
  crimson: "text-[#991B1B]",
  purple: "text-[#6D28D9]",
};

const workHistory = [
  {
    current: true,
    title: "Manager, Systems Reliability Engineering",
    company: "Major Entertainment & Technology Company",
    location: "Los Angeles, CA",
    dates: "August 2024 — Present",
    bullets: [
      "Leading a globally scalable SRE team with focus on 1:1s, annual reviews, mentoring, goal setting, budgeting, and forecasting",
      "Architect, deploy, monitor, and maintain dozens of globally distributed, resilient, highly available business-critical cloud applications including AI, SAP S/4HANA, Tableau, UiPath, PowerBI, Business Intelligence and Analytics, and Data Science Platforms",
      "Partner with business segment leadership on application strategy including cloud platform, scale, budget, disaster recovery, and user activity using agile and devops methodologies",
      "Public and private cloud computing including AWS, GCP, Azure, Kubernetes, VMware, AI, and serverless technology with infrastructure as code and CI/CD pipelines",
      "Present to and influence executive leadership on SRE roadmaps, strategy, performance, and vendor management",
    ],
  },
  {
    current: false,
    title: "Senior Manager, Cloud & Site Reliability Engineering",
    company: "Edwards Lifesciences",
    location: "Irvine, CA",
    dates: "November 2022 — August 2024",
    bullets: [
      "Led and mentored an Agile global engineering team responsible for AWS cloud infrastructure, SRE, server, file shares, user productivity, and core services across dozens of globally distributed applications",
      "Aligned the business with current cloud technology by transforming cloud practices to meet modern product demand",
      "Built and managed vendor relationships and negotiations between software/hardware vendors and business units",
      "Led cloud spend optimization through modernized AWS architecture while introducing SRE standards for complex manufacturing and product applications",
      "Led team to implement infrastructure as code and configuration management supporting Linux and Windows with containerized architecture using Kubernetes and Docker",
    ],
  },
  {
    current: false,
    title: "Cloud Engineer / Site Reliability Engineer",
    company: "Red Hat",
    location: "Remote",
    dates: "January 2021 — November 2022",
    bullets: [
      "Engineered hybrid cloud infrastructure with automation to develop, integrate, deploy, and maintain internal private and public cloud solutions using Agile delivery",
      "Support and development of AWS, GCP, Azure, OpenStack, and OpenShift IT infrastructure using DevOps and SRE principles with Python, Ansible, Puppet, and Terraform",
      "Architected and supported 400+ OpenShift (Kubernetes) clusters across multiple clouds using Golang, Python, Alert Manager, Prometheus, Splunk, and Grafana",
      "Designed FedRAMP compliant AWS environment while performing CVE analysis in response to security threats",
    ],
  },
  {
    current: false,
    title: "Cloud Engineer / Data Center Administrator",
    company: "Blizzard Entertainment",
    location: "Irvine, CA",
    dates: "May 2015 — January 2021",
    bullets: [
      "AWS, GCP, and OpenStack hybrid cloud engineering of globally distributed systems with automation using Terraform, Puppet, Ansible, Python, and Bash supporting games with millions of concurrent players",
      "Architected Blizzard's cloud governance model for GCP and AWS integration supporting containerization (Kubernetes), CDN networking, and edge computing",
      "Designed, deployed, and supported next generation global data centers hosting thousands of servers, storage, and network equipment",
      "Deployed Blizzard's first DCIM solution for floor plans, rack layouts, network design, IPAM, environmental monitoring, power monitoring, and asset tracking",
    ],
  },
  {
    current: false,
    title: "Lead IT Deskside Support Assistant",
    company: "California State University, Fullerton",
    location: "Fullerton, CA",
    dates: "July 2013 — May 2015",
    bullets: [],
  },
];

const education = [
  {
    degree: "MBA, IT Management",
    school: "Florida Institute of Technology",
    year: "2022",
    honor: "Summa Cum Laude",
  },
  {
    degree: "BS Business Information Systems, Minor Computer Science",
    school: "CSU Fullerton",
    year: "2016",
    honor: "Dean's List",
  },
  {
    degree: "AS Social & Behavioral Science",
    school: "Irvine Valley College",
    year: "2013",
    honor: "Dean's List",
  },
];

const certifications = [
  {
    name: "Registered Product Owner",
    issuer: "Scrum Inc.",
    id: "RPO-7556942",
  },
  {
    name: "Registered Scrum Master",
    issuer: "Scrum Inc.",
    id: "RSM-6312562",
  },
];

// Section divider component with diamond
function SectionDivider() {
  return (
    <div className="section-divider mx-auto max-w-4xl px-6">
      <div className="section-divider-diamond" />
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <div className="scroll-smooth overflow-x-hidden">
      {/* Page header */}
      <section className="hero-section relative px-6 pb-12 pt-8 md:pb-16 md:pt-12">
        <div className="hero-purple-glow" />
        <div className="mx-auto max-w-4xl relative">
          <h1 className="font-display text-4xl font-semibold tracking-tight text-[#F4E4C1] sm:text-5xl md:text-6xl">
            Portfolio
          </h1>
          <p className="mt-3 text-lg text-[#C4A882] sm:text-xl">
            A summary of my experience, skills, and work
          </p>
          <div className="mt-6 h-px w-24 bg-gradient-to-r from-[#6D28D9]/60 to-transparent" />
        </div>
      </section>

      <SectionDivider />

      {/* Experience timeline */}
      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="title-purple-glow inline-block">
            <h2 className="font-display text-2xl font-semibold text-[#F4E4C1] sm:text-3xl">
              Adventure Log
            </h2>
          </div>
          <p className="mt-2 text-[#8B7355]">Quests completed and dungeons cleared</p>

          <div className="mt-8">
            {/* Vertical line */}
            <div className="relative border-l-2 border-[#5C3D2E] pl-6 sm:pl-8">
              {workHistory.map((job, index) => (
                <div key={index} className={`relative ${index < workHistory.length - 1 ? "pb-8" : ""}`}>
                  <div
                    className={`absolute -left-[29px] top-2 h-3 w-3 rounded-full sm:-left-[33px] ${
                      job.current
                        ? "bg-[#D4A017]"
                        : "border-2 border-[#D4A017] bg-[#2D1B0E]"
                    }`}
                    style={{ boxShadow: job.current ? "0 0 12px rgba(109, 40, 217, 0.5), 0 0 4px rgba(212, 160, 23, 0.5)" : "0 0 8px rgba(109, 40, 217, 0.3)" }}
                  />
                  <div className="rounded-xl border border-[#8B6914] bg-[#F4E4C1] p-6 shadow-lg">
                    <div className="flex flex-wrap items-baseline gap-2">
                      {job.current && (
                        <span className="rounded-full bg-[#6D28D9]/15 px-2.5 py-0.5 text-xs font-medium text-[#6D28D9]">
                          Current
                        </span>
                      )}
                      <span className="text-sm text-[#8B7355]">{job.dates}</span>
                    </div>
                    <h3 className="mt-2 font-display text-lg font-semibold text-[#2D1B0E] sm:text-xl">
                      {job.title}
                    </h3>
                    <p className="text-[#0D9488]">{job.company}</p>
                    <p className="text-sm text-[#8B7355]">{job.location}</p>
                    {job.bullets.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {job.bullets.map((bullet, i) => (
                          <li key={i} className="flex gap-2 text-sm text-[#5C3D2E]">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6D28D9]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Education */}
      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="title-purple-glow inline-block">
            <h2 className="font-display text-2xl font-semibold text-[#F4E4C1] sm:text-3xl">
              Lore & Knowledge
            </h2>
          </div>
          <p className="mt-2 text-[#8B7355]">Training grounds and academies</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {education.map((edu, index) => (
              <div
                key={index}
                className="rounded-xl border border-[#8B6914] bg-[#F4E4C1] p-5 shadow-lg"
              >
                <p className="text-sm font-medium text-[#0D9488]">{edu.year}</p>
                <h3 className="mt-1 font-display font-semibold text-[#2D1B0E]">
                  {edu.degree}
                </h3>
                <p className="mt-1 text-sm text-[#5C3D2E]">{edu.school}</p>
                <span className="mt-2 inline-block rounded-full bg-[#6D28D9]/15 px-2 py-0.5 text-xs font-medium text-[#6D28D9]">
                  {edu.honor}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Certifications */}
      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="title-purple-glow inline-block">
            <h2 className="font-display text-2xl font-semibold text-[#F4E4C1] sm:text-3xl">
              Achievements Unlocked
            </h2>
          </div>
          <p className="mt-2 text-[#8B7355]">Badges earned along the way</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="rounded-xl border border-[#8B6914] bg-[#F4E4C1] p-5 shadow-lg"
              >
                <h3 className="font-display font-semibold text-[#2D1B0E]">
                  {cert.name}
                </h3>
                <p className="mt-1 text-sm text-[#0D9488]">{cert.issuer}</p>
                <p className="mt-1 text-xs text-[#8B7355]">ID: {cert.id}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Technical skills */}
      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="title-purple-glow inline-block">
            <h2 className="font-display text-2xl font-semibold text-[#F4E4C1] sm:text-3xl">
              Skill Tree
            </h2>
          </div>
          <p className="mt-2 text-[#8B7355]">
            Abilities unlocked and talents trained
          </p>

          <div className="mt-8 space-y-6">
            {skillCategories.map((category) => (
              <div key={category.label}>
                <h3 className={`mb-3 text-sm font-medium uppercase tracking-wider ${labelColors[category.color]}`}>
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

      <SectionDivider />

      {/* Currently building */}
      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="title-purple-glow inline-block">
            <h2 className="font-display text-2xl font-semibold text-[#F4E4C1] sm:text-3xl">
              Currently Crafting
            </h2>
          </div>
          <p className="mt-2 text-[#8B7355]">Side quests and experiments</p>

          <div className="mt-8">
            <Link
              href="https://github.com/treymer/treymer.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl border border-[#8B6914] bg-[#F4E4C1] p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#D4A017] hover:shadow-[0_12px_32px_rgba(0,0,0,0.5),0_0_20px_rgba(109,40,217,0.15)]"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-display text-xl font-semibold text-[#2D1B0E] transition-colors group-hover:text-[#991B1B]">
                    treymer.dev
                  </h3>
                  <p className="mt-2 text-[#5C3D2E]">
                    Personal site and blog built with Next.js, AWS S3/CloudFront,
                    Terraform, GitHub Actions. This site.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Next.js", "AWS", "Terraform", "MDX"].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-[#0D9488]/15 px-2 py-0.5 text-xs font-medium text-[#0D9488]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-[#991B1B] sm:shrink-0">
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

      <SectionDivider />

      {/* Connect */}
      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="title-purple-glow inline-block">
            <h2 className="font-display text-2xl font-semibold text-[#F4E4C1] sm:text-3xl">
              Party Up
            </h2>
          </div>
          <p className="mt-2 text-[#8B7355]">
            Looking for group — always happy to chat about SRE, leadership, or the best trails in SoCal
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
