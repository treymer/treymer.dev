import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import Currently from "@/components/Currently";

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
    accent: "gold",
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
    iconBg: "bg-[#0D9488]/15",
    iconColor: "text-[#0D9488]",
    hoverBorder: "group-hover:border-[#0D9488]/40",
  },
  gold: {
    iconBg: "bg-[#D4A017]/15",
    iconColor: "text-[#D4A017]",
    hoverBorder: "group-hover:border-[#D4A017]/40",
  },
  crimson: {
    iconBg: "bg-[#991B1B]/15",
    iconColor: "text-[#991B1B]",
    hoverBorder: "group-hover:border-[#991B1B]/40",
  },
};

const categoryLabels: Record<string, string> = {
  Engineering: "⚙️ Technomancer",
  Personal: "🎲 Side Quest",
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
    <div className="scroll-smooth">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-16 pt-8 md:pb-20 md:pt-12">
        {/* Subtle geometric pattern background */}
        <div className="geo-pattern absolute inset-0" />
        {/* Warm candlelight glow behind title */}
        <div className="hero-glow" />

        <div className="relative mx-auto max-w-4xl">
          {/* Decorative top element */}
          <div className="mb-6 flex items-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-[#D4A017] to-transparent" />
            <span className="rounded-full border border-[#D4A017]/30 bg-[#D4A017]/10 px-4 py-1.5 text-sm font-medium text-[#D4A017]">
              SRE · Leadership · Systems
            </span>
          </div>

          <h1 className="font-display text-5xl font-semibold tracking-tight text-[#F4E4C1] sm:text-6xl md:text-7xl lg:text-8xl">
            Tyler Reymer
          </h1>

          <p className="mt-4 text-xl font-medium text-[#0D9488] sm:text-2xl md:text-3xl">
            Engineering Leader & SRE Manager
          </p>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#C4A882] sm:text-xl">
            Engineering reliable systems at scale. Leading teams that ship.
            Riding trails, playing riffs, and raising a family.
          </p>

          {/* RPG stat line */}
          <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#8B7355]">
            <span>⚔️ Lv.12 Engineer</span>
            <span className="hidden sm:inline">•</span>
            <span>🎸 Bard Multiclass</span>
            <span className="hidden sm:inline">•</span>
            <span>🚵 Ranger Subclass</span>
            <span className="hidden sm:inline">•</span>
            <span>🎲 Forever DM</span>
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
          <div className="mt-12 h-px w-32 bg-gradient-to-r from-[#D4A017]/60 to-transparent" />
        </div>
      </section>

      <SectionDivider />

      {/* Currently */}
      <Currently />

      <SectionDivider />

      {/* About snapshot */}
      <section id="about" className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-semibold text-[#D4A017] sm:text-4xl">
            Who I am
          </h2>
          <p className="mt-2 text-[#8B7355]">
            A few things that define me beyond the title
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {aboutCards.map((card) => {
              const styles = accentStyles[card.accent as keyof typeof accentStyles];
              return (
                <div
                  key={card.title}
                  className={`group relative rounded-xl border border-[#5C3D2E] bg-[#3D2314] p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${styles.hoverBorder}`}
                >
                  <div
                    className={`mb-4 inline-flex rounded-lg p-2.5 ${styles.iconBg} ${styles.iconColor}`}
                  >
                    {card.icon}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[#F4E4C1]">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#C4A882]">
                    {card.description}
                  </p>
                  {/* RPG stats badge */}
                  <p className="mt-3 font-mono text-xs tracking-wide text-[#8B7355]">
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
          <h2 className="font-display text-3xl font-semibold text-[#D4A017] sm:text-4xl">
            Latest Posts
          </h2>
          <p className="mt-2 text-[#8B7355]">
            Recent thoughts on engineering, leadership, and life
          </p>

          {recentPosts.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block rounded-xl border border-[#5C3D2E] bg-[#3D2314] p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#D4A017]/40 hover:shadow-lg"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        post.category === "Engineering"
                          ? "bg-[#0D9488]/15 text-[#0D9488]"
                          : "bg-[#D4A017]/15 text-[#D4A017]"
                      }`}
                    >
                      {categoryLabels[post.category]}
                    </span>
                    <span className="text-sm text-[#8B7355]">
                      {formatDate(post.date)}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[#F4E4C1] transition-colors group-hover:text-[#D4A017]">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-[#C4A882]">
                    {post.description}
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-[#991B1B]">
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
            <div className="mt-10 rounded-xl border border-dashed border-[#5C3D2E] bg-[#3D2314] p-12 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#D4A017]/15 text-[#D4A017]">
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
              <p className="text-[#C4A882]">
                No posts yet. Check back soon — I&apos;m cooking something up.
              </p>
              <Link
                href="/blog"
                className="mt-4 inline-block text-sm font-medium text-[#D4A017] hover:underline"
              >
                View blog →
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
