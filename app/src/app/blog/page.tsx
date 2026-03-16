import { getAllPosts } from "@/lib/posts";
import BlogPostGrid from "@/components/BlogPostGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts on engineering, leadership, and life from Tyler Reymer. Articles on SRE, cloud architecture, team building, and side quests.",
  openGraph: {
    title: "Blog | treymer.dev",
    description:
      "Thoughts on engineering, leadership, and life from Tyler Reymer. Articles on SRE, cloud architecture, team building, and side quests.",
    url: "https://treymer.dev/blog",
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
    title: "Blog | treymer.dev",
    description:
      "Thoughts on engineering, leadership, and life from Tyler Reymer. Articles on SRE, cloud architecture, team building, and side quests.",
    images: ["https://treymer.dev/images/avatar.webp"],
  },
  alternates: {
    canonical: "https://treymer.dev/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="overflow-x-hidden px-6 pb-16 pt-8 md:pb-20 md:pt-12">
      <div className="mx-auto max-w-4xl">
        <header>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-[#F4E4C1] sm:text-5xl">
            Blog
          </h1>
          <p className="mt-3 text-lg text-[#C4A882]">
            Thoughts on engineering, leadership, and life.
          </p>
          <div className="mt-6 h-px w-24 bg-gradient-to-r from-[#6D28D9]/60 to-transparent" />
        </header>

        <div className="mt-10">
          <BlogPostGrid posts={posts} />
        </div>
      </div>
    </div>
  );
}
