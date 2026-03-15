import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import {
  getAllPosts,
  getPostBySlug,
  type Post,
} from "@/lib/posts";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post: Post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
    return {
      title: post.title,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
      },
    };
  } catch {
    return {};
  }
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const { content } = await compileMDX({
    source: post.content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight, rehypeSlug],
      },
    },
    components: {},
  });

  return (
    <article className="px-6 pb-20 pt-8 md:pb-28 md:pt-12">
      <div className="mx-auto max-w-3xl">
        {/* Back button */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-cyan-400"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Blog
        </Link>

        {/* Title */}
        <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {post.title}
        </h1>

        {/* Meta line */}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
          <span
            className={`rounded-full px-2.5 py-0.5 font-medium ${
              post.category === "Engineering"
                ? "bg-cyan-500/20 text-cyan-400"
                : "bg-amber-500/20 text-amber-400"
            }`}
          >
            {post.category}
          </span>
          <span className="text-zinc-500">{formatDate(post.date)}</span>
          <span className="text-zinc-600">·</span>
          <span className="text-zinc-500">{post.readingTime}</span>
        </div>

        {/* MDX content with prose */}
        <div className="prose prose-lg prose-invert prose-zinc mt-12 max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-code:rounded prose-code:bg-zinc-800/80 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-cyan-300 prose-code:before:content-none prose-code:after:content-none prose-pre:border prose-pre:border-white/10 prose-pre:bg-zinc-900/50">
          {content}
        </div>
      </div>
    </article>
  );
}
