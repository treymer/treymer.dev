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
    <div className="px-6 pb-16 pt-8 md:pb-20 md:pt-12">
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
