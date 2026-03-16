import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import Currently from "@/components/Currently";

export const metadata: Metadata = {
  title: "treymer.dev — Tyler Reymer",
  description:
    "SRE Engineering Leader, cloud architect, guitarist, mountain biker, and dungeon master. Writing about engineering, leadership, and life.",
  alternates: {
    canonical: "https://treymer.dev",
  },
};

const aboutCards = [
  {
    title: "Engineering Leader",
    description: "10+ years in cloud, SRE, and datacenter. Building reliable systems at scale.",
    stats: "INT +10  WIS +8",
    icon: (
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
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
      </svg>
    ),
    accent: "teal",
  },
  {
    title: "Guitar player",
    description: "Strings, riffs, and the occasional jam session.",
    stats: "CHA +5  DEX +4",
    icon: (
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
    ),
    accent: "purple",
  },
  {
    title: "Mountain biker",
    description: "Single track, climbs, and the reward of the descent.",
    stats: "STR +6  CON +7",
    icon: (
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
    ),
    accent: "teal",
  },
  {
    title: "Husband & father",
    description: "Family first. Everything else follows.",
    stats: "WIS +10  CHA +8",
    icon: (
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
    ),
    accent: "crimson",
  },
];

const accentStyles = {
  teal: {
    iconBg: "bg-[#0EA89A]/20",
    iconColor: "text-[#0EA89A]",
    hoverBorder: "group-hover:border-[#0EA89A]",
    hoverShadow: "group-hover:shadow-[0_0_20px_rgba(13,148,136,0.2)]",
  },
  purple: {
    iconBg: "bg-[#6D28D9]/20",
    iconColor: "text-[#6D28D9]",
    hoverBorder: "group-hover:border-[#6D28D9]",
    hoverShadow: "group-hover:shadow-[0_0_20px_rgba(109,40,217,0.2)]",
  },
  crimson: {
    iconBg: "bg-[#CC2222]/20",
    iconColor: "text-[#CC2222]",
    hoverBorder: "group-hover:border-[#CC2222]",
    hoverShadow: "group-hover:shadow-[0_0_20px_rgba(153,27,27,0.2)]",
  },
};

const categoryLabels: Record<string, string> = {
  Engineering: "Technomancer",
  Personal: "Side Quest",
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Section divider component with diamond
function SectionDivider() {
  return (
    <div className="section-divider mx-auto max-w-6xl px-6">
      <div className="section-divider-diamond" />
    </div>
  );
}

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <div className="scroll-smooth overflow-x-hidden">
      {/* Hero - D&D Character Sheet Style */}
      <section className="hero-section relative overflow-hidden px-6 pb-16 pt-8 md:pb-20 md:pt-12">
        {/* Background glows */}
        {/* Left side warm glow behind text */}
        <div
          className="pointer-events-none absolute left-0 top-1/2 hidden -translate-y-1/2 lg:block"
          style={{
            width: "50%",
            height: "120%",
            background: "radial-gradient(ellipse at 30% 50%, rgba(212, 160, 23, 0.08) 0%, rgba(153, 27, 27, 0.05) 40%, transparent 70%)",
          }}
        />
        {/* Right side purple glow behind avatar */}
        <div
          className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 lg:block"
          style={{
            width: "50%",
            height: "120%",
            background: "radial-gradient(ellipse at 70% 50%, rgba(109, 40, 217, 0.15) 0%, rgba(109, 40, 217, 0.05) 50%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-12">
            {/* Left column - Stats & Info (55%) */}
            <div className="lg:w-[55%]">
              {/* Decorative top element */}
              <div className="mb-6 flex items-center gap-4">
                <div className="h-px w-12 bg-gradient-to-r from-[#6D28D9] to-transparent" />
                <span className="rounded-full border border-[#6D28D9]/30 bg-[#6D28D9]/10 px-4 py-1.5 text-sm font-medium text-[#C4A882]">
                  SRE · Leadership · Systems
                </span>
              </div>

              <h1 className="font-display text-5xl font-semibold tracking-tight text-[#F4E4C1] sm:text-6xl md:text-7xl">
                Tyler Reymer
              </h1>

              <p className="mt-4 text-xl font-medium text-[#0EA89A] sm:text-2xl md:text-3xl">
                Engineering Leader & SRE Manager
              </p>

              <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#C4A882] sm:text-xl">
                Engineering reliable systems at scale. Leading teams that ship.
                Riding trails, playing riffs, and raising a family.
              </p>

              {/* RPG stat line */}
              <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#A08060]">
                <span>Lv.12 Engineer</span>
                <span className="hidden sm:inline">•</span>
                <span>Bard Multiclass</span>
                <span className="hidden sm:inline">•</span>
                <span>Ranger Subclass</span>
                <span className="hidden sm:inline">•</span>
                <span>Forever DM</span>
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/blog"
                  className="btn-primary inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold shadow-md"
                >
                  Read the Blog
                </Link>
                <Link
                  href="/portfolio"
                  className="btn-secondary inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold"
                >
                  View Portfolio
                </Link>
              </div>

              {/* Decorative accent line */}
              <div className="mt-10 hidden h-px w-32 bg-gradient-to-r from-[#6D28D9]/60 to-transparent lg:block" />
            </div>

            {/* Right column - Character Portrait (45%) */}
            <div className="relative lg:w-[45%]">
              {/* Purple arcane glow container */}
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <Image
                  src="/images/avatar-optimized.webp"
                  alt="Tyler Reymer — Cloud Paladin, SRE Guild Master"
                  width={600}
                  height={600}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={true}
                  className="h-auto max-h-[400px] w-full rounded-2xl object-cover object-top lg:max-h-[500px]"
                  style={{
                    boxShadow: "0 0 40px rgba(109, 40, 217, 0.3), 0 0 80px rgba(109, 40, 217, 0.15)",
                    border: "1px solid rgba(212, 160, 23, 0.3)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Currently */}
      <Currently />

      <SectionDivider />

      {/* About snapshot */}
      <section id="about" className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="title-purple-glow inline-block">
            <h2 className="font-display text-3xl font-semibold text-[#F4E4C1] sm:text-4xl">
              Who I am
            </h2>
          </div>
          <p className="mt-2 text-[#A08060]">
            A few things that define me beyond the title
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {aboutCards.map((card) => {
              const styles = accentStyles[card.accent as keyof typeof accentStyles];
              return (
                <div
                  key={card.title}
                  className={`group relative rounded-xl border border-[#8B6914] bg-[#F4E4C1] p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 ${styles.hoverBorder} ${styles.hoverShadow}`}
                >
                  <div
                    className={`mb-4 inline-flex rounded-lg p-2.5 ${styles.iconBg} ${styles.iconColor}`}
                  >
                    {card.icon}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[#2D1B0E]">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5C3D2E]">
                    {card.description}
                  </p>
                  {/* RPG stats badge */}
                  <p className="mt-3 font-mono text-xs tracking-wide text-[#A08060]">
                    {card.stats}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Recent posts */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="title-purple-glow inline-block">
            <h2 className="font-display text-3xl font-semibold text-[#F4E4C1] sm:text-4xl">
              Latest Posts
            </h2>
          </div>
          <p className="mt-2 text-[#A08060]">
            Recent thoughts on engineering, leadership, and life
          </p>

          {recentPosts.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block rounded-xl border border-[#8B6914] bg-[#F4E4C1] p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#D4A017] hover:shadow-[0_12px_32px_rgba(0,0,0,0.5),0_0_20px_rgba(109,40,217,0.15)]"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        post.category === "Engineering"
                          ? "bg-[#0EA89A]/15 text-[#0EA89A]"
                          : "bg-[#6D28D9]/15 text-[#6D28D9]"
                      }`}
                    >
                      {categoryLabels[post.category]}
                    </span>
                    <span className="text-sm text-[#A08060]">
                      {formatDate(post.date)}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[#2D1B0E] transition-colors group-hover:text-[#CC2222]">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-[#5C3D2E]">
                    {post.description}
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-[#CC2222]">
                    Read more
                    <svg
                      className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-xl border border-[#8B6914] bg-[#F4E4C1] p-12 text-center shadow-lg">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#6D28D9]/15 text-[#6D28D9]">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <p className="text-[#5C3D2E]">
                No posts yet. Check back soon — I&apos;m cooking something up.
              </p>
              <Link
                href="/blog"
                className="mt-4 inline-block text-sm font-medium text-[#CC2222] hover:underline"
              >
                View blog
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
