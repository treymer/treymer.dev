import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import Currently from "@/components/Currently";

const aboutCards = [
  {
    title: "Engineering Leader",
    description: "10+ years in cloud, SRE, and datacenter. Building reliable systems at scale.",
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
    iconBg: "bg-[#0D9488]/10",
    iconColor: "text-[#0D9488]",
    hoverBorder: "group-hover:border-[#0D9488]/30",
  },
  purple: {
    iconBg: "bg-[#6D28D9]/10",
    iconColor: "text-[#6D28D9]",
    hoverBorder: "group-hover:border-[#6D28D9]/30",
  },
  crimson: {
    iconBg: "bg-[#991B1B]/10",
    iconColor: "text-[#991B1B]",
    hoverBorder: "group-hover:border-[#991B1B]/30",
  },
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <div className="scroll-smooth">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-16 pt-8 md:pb-20 md:pt-12">
        {/* Subtle geometric pattern background */}
        <div className="geo-pattern absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FAFAF7]/80 to-[#FAFAF7]" />

        <div className="relative mx-auto max-w-4xl">
          {/* Decorative top element */}
          <div className="mb-6 flex items-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-[#991B1B] to-transparent" />
            <span className="rounded-full border border-[#991B1B]/20 bg-[#991B1B]/5 px-4 py-1.5 text-sm font-medium text-[#991B1B]">
              SRE · Leadership · Systems
            </span>
          </div>

          <h1 className="font-display text-5xl font-semibold tracking-tight text-stone-900 sm:text-6xl md:text-7xl lg:text-8xl">
            Tyler Reymer
          </h1>

          <p className="mt-4 text-xl font-medium text-[#0D9488] sm:text-2xl md:text-3xl">
            Engineering Leader & SRE Manager
          </p>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-stone-600 sm:text-xl">
            Engineering reliable systems at scale. Leading teams that ship.
            Riding trails, playing riffs, and raising a family.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-lg bg-[#991B1B] px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-[#7F1D1D] hover:shadow-lg hover:shadow-[#991B1B]/20"
            >
              Read the Blog
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center rounded-lg border border-stone-300 bg-white px-6 py-3 font-semibold text-stone-700 shadow-sm transition-all hover:border-stone-400 hover:bg-stone-50 hover:text-stone-900"
            >
              View Portfolio
            </Link>
          </div>

          {/* Decorative accent line */}
          <div className="mt-12 h-px w-32 bg-gradient-to-r from-[#991B1B]/60 to-transparent" />
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider mx-auto max-w-6xl px-6" />

      {/* Currently */}
      <Currently />

      {/* Section divider */}
      <div className="section-divider mx-auto max-w-6xl px-6" />

      {/* About snapshot */}
      <section id="about" className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-semibold text-stone-900 sm:text-4xl">
            Who I am
          </h2>
          <p className="mt-2 text-stone-500">
            A few things that define me beyond the title
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {aboutCards.map((card) => {
              const styles = accentStyles[card.accent as keyof typeof accentStyles];
              return (
                <div
                  key={card.title}
                  className={`group relative rounded-xl border border-stone-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${styles.hoverBorder}`}
                >
                  <div
                    className={`mb-4 inline-flex rounded-lg p-2.5 ${styles.iconBg} ${styles.iconColor}`}
                  >
                    {card.icon}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-stone-900">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-500">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider mx-auto max-w-6xl px-6" />

      {/* Recent posts */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-semibold text-stone-900 sm:text-4xl">
            Latest Posts
          </h2>
          <p className="mt-2 text-stone-500">
            Recent thoughts on engineering, leadership, and life
          </p>

          {recentPosts.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block rounded-xl border border-stone-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-stone-300 hover:shadow-lg"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        post.category === "Engineering"
                          ? "bg-[#0D9488]/10 text-[#0D9488]"
                          : "bg-[#6D28D9]/10 text-[#6D28D9]"
                      }`}
                    >
                      {post.category}
                    </span>
                    <span className="text-sm text-stone-400">
                      {formatDate(post.date)}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-stone-900 transition-colors group-hover:text-[#991B1B]">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-stone-500">
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
            <div className="mt-10 rounded-xl border border-dashed border-stone-300 bg-white p-12 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#991B1B]/10 text-[#991B1B]">
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
              <p className="text-stone-500">
                No posts yet. Check back soon — I&apos;m cooking something up.
              </p>
              <Link
                href="/blog"
                className="mt-4 inline-block text-sm font-medium text-[#991B1B] hover:underline"
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
