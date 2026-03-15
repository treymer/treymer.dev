import { getAllPosts } from "@/lib/posts";
import BlogPostGrid from "@/components/BlogPostGrid";

export const metadata = {
  title: "Blog",
  description:
    "Thoughts on engineering, leadership, and life. Tyler Reymer's blog.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="px-6 pb-20 pt-8 md:pb-28 md:pt-12">
      <div className="mx-auto max-w-4xl">
        <header>
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Blog
          </h1>
          <p className="mt-3 text-lg text-zinc-400">
            Thoughts on engineering, leadership, and life.
          </p>
          <div className="mt-8 h-px w-24 bg-linear-to-r from-cyan-500/80 to-transparent" />
        </header>

        <div className="mt-12">
          <BlogPostGrid posts={posts} />
        </div>
      </div>
    </div>
  );
}
