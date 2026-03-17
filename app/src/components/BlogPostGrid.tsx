"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
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
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    let results = posts;

    // Filter by category
    if (filter !== "All") {
      results = results.filter((post) => post.category === filter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      results = results.filter((post) => {
        const titleMatch = post.title.toLowerCase().includes(query);
        const descriptionMatch = post.description.toLowerCase().includes(query);
        const categoryMatch = post.category.toLowerCase().includes(query);
        const categoryLabelMatch = categoryLabels[post.category]
          .toLowerCase()
          .includes(query);
        const contentMatch = post.searchContent.toLowerCase().includes(query);
        return titleMatch || descriptionMatch || categoryMatch || categoryLabelMatch || contentMatch;
      });
    }

    return results;
  }, [posts, filter, searchQuery]);

  const filters: Filter[] = ["All", "Engineering", "Personal"];

  const hasSearchQuery = searchQuery.trim().length > 0;

  return (
    <div>
      {/* Search input */}
      <div className="mb-6">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <svg
              className="h-5 w-5 text-[#A08060]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search the archives..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-[#8B6914] bg-[#3D2314] py-3 pl-12 pr-4 text-[#F4E4C1] placeholder-[#A08060] transition-all focus:border-[#D4A017] focus:outline-none focus:ring-2 focus:ring-[#D4A017]/20"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#A08060] hover:text-[#D4A017]"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Category filter */}
      <div className="mb-10 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              filter === f
                ? "bg-[#CC2222] text-white shadow-md shadow-[#CC2222]/20"
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
                      ? "bg-[#0EA89A]/15 text-[#0EA89A]"
                      : "bg-[#6D28D9]/15 text-[#6D28D9]"
                  }`}
                >
                  {categoryLabels[post.category]}
                </span>
                <span className="text-sm text-[#A08060]">
                  {formatDate(post.date)}
                </span>
                <span className="text-sm text-[#A08060]">·</span>
                <span className="text-sm text-[#A08060]">{post.readingTime}</span>
              </div>
              <h2 className="font-display text-lg font-semibold text-[#2D1B0E] transition-colors group-hover:text-[#CC2222]">
                {post.title}
              </h2>
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
            {hasSearchQuery
              ? "No scrolls found matching your search. Try different keywords."
              : filter === "All"
                ? "No posts yet. Check back soon."
                : `No ${categoryLabels[filter]} quests yet. Try another category.`}
          </p>
          {hasSearchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setFilter("All");
              }}
              className="mt-4 text-sm font-medium text-[#CC2222] hover:underline"
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  );
}
