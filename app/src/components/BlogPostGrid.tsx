"use client";

import Link from "next/link";
import { useState } from "react";
import type { Post } from "@/lib/posts";

type Filter = "All" | "Engineering" | "Personal";

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogPostGrid({ posts }: { posts: Post[] }) {
  const [filter, setFilter] = useState<Filter>("All");

  const filteredPosts =
    filter === "All"
      ? posts
      : posts.filter((post) => post.category === filter);

  const filters: Filter[] = ["All", "Engineering", "Personal"];

  return (
    <div>
      {/* Category filter */}
      <div className="mb-10 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              filter === f
                ? "bg-cyan-500 text-zinc-950"
                : "border border-white/10 bg-white/2 text-zinc-400 hover:border-cyan-500/30 hover:bg-cyan-500/5 hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-xl border border-white/10 bg-white/2 p-6 transition-all hover:border-cyan-500/30 hover:bg-cyan-500/5"
            >
              <div className="mb-3 flex flex-wrap items-center gap-3">
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
                <span className="text-sm text-zinc-600">·</span>
                <span className="text-sm text-zinc-500">{post.readingTime}</span>
              </div>
              <h2 className="font-display text-lg font-semibold text-white transition-colors group-hover:text-cyan-400">
                {post.title}
              </h2>
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
        <div className="rounded-xl border border-dashed border-white/20 bg-white/2 p-12 text-center">
          <p className="text-zinc-500">
            {filter === "All"
              ? "No posts yet. Check back soon."
              : `No ${filter} posts yet. Try another category.`}
          </p>
        </div>
      )}
    </div>
  );
}
