import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

const aboutCards = [
  {
    title: "SRE Manager at Disney",
    description: "10+ years in cloud, SRE, and datacenter. Keeping the magic running.",
    icon: (
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
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
      </svg>
    ),
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
    ),
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
    ),
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
    ),
  },
];

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
      <section className="relative overflow-hidden px-6 pb-24 pt-12 md:pb-32 md:pt-20">
        {/* Background gradient + grid texture */}
        <div className="absolute inset-0 bg-linear-to-b from-cyan-500/5 via-transparent to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative mx-auto max-w-4xl">
          <div className="mb-6 inline-block rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-1.5 text-sm font-medium text-cyan-400">
            SRE · Leadership · Systems
          </div>

          <h1 className="font-display text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            Tyler Reymer
          </h1>

          <p className="mt-4 text-xl font-medium text-cyan-400 sm:text-2xl md:text-3xl">
            SRE Engineering Manager at Walt Disney Company
          </p>

          <p className="mt-4 max-w-2xl text-lg text-zinc-400 sm:text-xl">
            Engineering reliable systems at scale. Leading teams that ship.
            Riding trails, playing riffs, and raising a family — in that order.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-zinc-950 transition-all hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/25"
            >
              Read the Blog
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur transition-all hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-400"
            >
              View Portfolio
            </Link>
          </div>

          {/* Decorative accent line */}
          <div className="mt-16 h-px w-32 bg-linear-to-r from-cyan-500/80 to-transparent" />
        </div>
      </section>

      {/* About snapshot */}
      <section id="about" className="border-t border-white/5 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Who I am
          </h2>
          <p className="mt-2 text-zinc-400">
            A few things that define me beyond the title
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {aboutCards.map((card) => (
              <div
                key={card.title}
                className="group relative rounded-xl border border-white/10 bg-white/2 p-6 transition-all hover:border-cyan-500/30 hover:bg-cyan-500/5"
              >
                <div className="mb-4 text-cyan-400 transition-colors group-hover:text-cyan-300">
                  {card.icon}
                </div>
                <h3 className="font-display text-lg font-semibold text-white">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent posts */}
      <section className="border-t border-white/5 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Latest Posts
          </h2>
          <p className="mt-2 text-zinc-400">
            Recent thoughts on engineering, leadership, and life
          </p>

          {recentPosts.length > 0 ? (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block rounded-xl border border-white/10 bg-white/2 p-6 transition-all hover:border-cyan-500/30 hover:bg-cyan-500/5"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        post.category === "Engineering"
                          ? "bg-cyan-500/20 text-cyan-400"
                          : "bg-amber-500/20 text-amber-400"
                      }`}
                    >
                      {post.category}
                    </span>
                    <span className="text-sm text-zinc-500">
                      {formatDate(post.date)}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white transition-colors group-hover:text-cyan-400">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-zinc-400">
                    {post.description}
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-cyan-400 group-hover:underline">
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
            <div className="mt-12 rounded-xl border border-dashed border-white/20 bg-white/2 p-12 text-center">
              <p className="text-zinc-500">
                No posts yet. Check back soon — I&apos;m cooking something up.
              </p>
              <Link
                href="/blog"
                className="mt-4 inline-block text-sm font-medium text-cyan-400 hover:text-cyan-300"
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
