"use client";

import Link from "next/link";
import { useState } from "react";
import type { Post } from "@/lib/posts";

type Filter = "All" | "Engineering" | "Personal";

const categoryLabels: Record<string, string> = {
  All: "All Quests",
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
                : "border border-[#8B6914] bg-[#F4E4C1] text-[#5C3D2E] hover:border-[#D4A017] hover:bg-[#F4E4C1] hover:text-[#2D1B0E]"
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
              className="group block rounded-xl border border-[#8B6914] bg-[#F4E4C1] p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#D4A017] hover:shadow-[0_12px_32px_rgba(0,0,0,0.5),0_0_20px_rgba(109,40,217,0.15)]"
            >
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    post.category === "Engineering"
                      ? "bg-[#0D9488]/15 text-[#0D9488]"
                      : "bg-[#6D28D9]/15 text-[#6D28D9]"
                  }`}
                >
                  {categoryLabels[post.category]}
                </span>
                <span className="text-sm text-[#8B7355]">
                  {formatDate(post.date)}
                </span>
                <span className="text-sm text-[#8B7355]">·</span>
                <span className="text-sm text-[#8B7355]">{post.readingTime}</span>
              </div>
              <h2 className="font-display text-lg font-semibold text-[#2D1B0E] transition-colors group-hover:text-[#991B1B]">
                {post.title}
              </h2>
              <p className="mt-2 line-clamp-2 text-sm text-[#5C3D2E]">
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
        <div className="rounded-xl border border-dashed border-[#8B6914] bg-[#F4E4C1] p-12 text-center shadow-lg">
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
            {filter === "All"
              ? "No posts yet. Check back soon."
              : `No ${filter} posts yet. Try another category.`}
          </p>
        </div>
      )}
    </div>
  );
}
