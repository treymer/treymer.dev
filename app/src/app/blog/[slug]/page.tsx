import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeExternalLinks from "rehype-external-links";
import ImageZoom from "@/components/ImageZoom";
import ShareButtons from "@/components/ShareButtons";
import {
  getAllPosts,
  getPostBySlug,
  type Post,
} from "@/lib/posts";

const siteUrl = "https://treymer.dev";

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
        url: `https://treymer.dev/blog/${slug}`,
        type: "article",
        publishedTime: post.date,
        authors: ["Tyler Reymer"],
        images: [
          {
            url: "https://treymer.dev/images/og-image.png",
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description,
        images: ["https://treymer.dev/images/og-image.png"],
      },
      alternates: {
        canonical: `https://treymer.dev/blog/${slug}`,
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

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  const postUrl = `${siteUrl}/blog/${slug}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;

  const { content } = await compileMDX({
    source: post.content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight, rehypeSlug, [rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] }]],
      },
    },
    components: { img: ImageZoom },
  });

  return (
    <article className="overflow-x-hidden px-6 pb-20 pt-8 md:pb-28 md:pt-12">
      <div className="mx-auto max-w-3xl">
        {/* Back button */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#A08060] transition-colors hover:text-[#D4A017]"
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
        <h1 className="font-display text-4xl font-bold tracking-tight text-[#F4E4C1] sm:text-5xl">
          {post.title}
        </h1>

        {/* Meta line */}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
          <span
            className={`rounded-full px-2.5 py-0.5 font-medium ${
              post.category === "Engineering"
                ? "bg-[#0EA89A]/15 text-[#0EA89A]"
                : "bg-[#6D28D9]/15 text-[#6D28D9]"
            }`}
          >
            {post.category === "Engineering" ? "⚙️ Technomancer" : "🎲 Side Quest"}
          </span>
          <span className="text-[#A08060]">{formatDate(post.date)}</span>
          <span className="text-[#5C3D2E]">·</span>
          <span className="text-[#A08060]">{post.readingTime}</span>
        </div>

        {/* MDX content with prose - parchment scroll styling */}
        <div className="mt-12 rounded-xl border border-[#8B6914] bg-[#F4E4C1] p-8 shadow-lg md:p-10">
          <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-[#2D1B0E] prose-p:text-[#5C3D2E] prose-a:text-[#0EA89A] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#2D1B0E] prose-code:rounded prose-code:bg-[#2D1B0E]/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[#0EA89A] prose-code:before:content-none prose-code:after:content-none prose-pre:border prose-pre:border-[#8B6914] prose-pre:bg-[#2D1B0E] prose-blockquote:border-l-[#6D28D9] prose-blockquote:bg-[#6D28D9]/5 prose-blockquote:text-[#5C3D2E] prose-li:text-[#5C3D2E] prose-ul:text-[#5C3D2E] prose-ol:text-[#5C3D2E] prose-hr:border-[#8B6914]">
            {content}
          </div>
        </div>

        <ShareButtons url={postUrl} linkedInUrl={linkedInUrl} />

        {/* Prev / Next navigation */}
        {(prevPost || nextPost) && (
          <nav className="mt-8 grid gap-4 sm:grid-cols-2">
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="group rounded-xl border border-[#8B6914] bg-[#F4E4C1] p-5 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D4A017]"
              >
                <span className="text-xs font-medium uppercase tracking-wide text-[#A08060]">
                  ← Previous
                </span>
                <p className="mt-1 font-display font-semibold text-[#2D1B0E] transition-colors group-hover:text-[#CC2222]">
                  {prevPost.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
            {nextPost ? (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="group rounded-xl border border-[#8B6914] bg-[#F4E4C1] p-5 text-right shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D4A017]"
              >
                <span className="text-xs font-medium uppercase tracking-wide text-[#A08060]">
                  Next →
                </span>
                <p className="mt-1 font-display font-semibold text-[#2D1B0E] transition-colors group-hover:text-[#CC2222]">
                  {nextPost.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        )}
      </div>
    </article>
  );
}
