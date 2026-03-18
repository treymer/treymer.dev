import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const postsDir = path.join(__dirname, "../src/content/blog");
const outputPath = path.join(__dirname, "../public/rss.xml");
const siteUrl = "https://treymer.dev";

const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));

const posts = files
  .map((file) => {
    const content = fs.readFileSync(path.join(postsDir, file), "utf8");
    const { data } = matter(content);
    return { ...data, slug: file.replace(/\.mdx$/, "") };
  })
  .filter((p) => p.published !== false)
  .sort((a, b) => (a.date < b.date ? 1 : -1));

const items = posts
  .map(
    (post) => `
  <item>
    <title><![CDATA[${post.title}]]></title>
    <link>${siteUrl}/blog/${post.slug}/</link>
    <guid isPermaLink="true">${siteUrl}/blog/${post.slug}/</guid>
    <description><![CDATA[${post.description}]]></description>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <category>${post.category}</category>
  </item>`
  )
  .join("");

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>treymer.dev</title>
    <link>${siteUrl}</link>
    <description>Engineering, leadership, and life — by Tyler Reymer</description>
    <language>en-us</language>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

fs.writeFileSync(outputPath, rss);
console.log(`RSS feed generated at ${outputPath}`);
