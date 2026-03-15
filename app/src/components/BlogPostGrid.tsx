"use client";

import Link from "next/link";
import { useState } from "react";
import type { Post } from "@/lib/posts";

type Filter = "All" | "Engineering" | "Personal";

const categoryLabels: Record<string, string> = {
  All: "All Quests",
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
                ? "bg-[#991B1B] text-white shadow-md shadow-[#991B1B]/20"
                : "border border-[#5C3D2E] bg-[#3D2314] text-[#C4A882] hover:border-[#7A5040] hover:bg-[#4a2d1a] hover:text-[#F4E4C1]"
            }`}
          >
            {categoryLabels[f]}
          </button>
        ))}
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-xl border border-[#5C3D2E] bg-[#3D2314] p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#D4A017]/40 hover:shadow-lg"
            >
              <div className="mb-3 flex flex-wrap items-center gap-3">
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
                <span className="text-sm text-[#5C3D2E]">·</span>
                <span className="text-sm text-[#8B7355]">{post.readingTime}</span>
              </div>
              <h2 className="font-display text-lg font-semibold text-[#F4E4C1] transition-colors group-hover:text-[#D4A017]">
                {post.title}
              </h2>
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
        <div className="rounded-xl border border-dashed border-[#5C3D2E] bg-[#3D2314] p-12 text-center shadow-sm">
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
            {filter === "All"
              ? "No posts yet. Check back soon."
              : `No ${filter} posts yet. Try another category.`}
          </p>
        </div>
      )}
    </div>
  );
}
