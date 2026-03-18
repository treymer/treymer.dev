import type { Heading } from "@/lib/posts";

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  if (headings.length < 3) return null;

  return (
    <div className="mt-8 rounded-xl border border-[#8B6914] bg-[#F4E4C1] p-6 shadow-lg">
      <p className="font-display text-sm font-semibold uppercase tracking-wide text-[#A08060]">
        Contents
      </p>
      <ul className="mt-3 space-y-1.5">
        {headings.map((h) => (
          <li key={h.slug} className={h.depth === 3 ? "pl-4" : ""}>
            <a
              href={`#${h.slug}`}
              className="text-sm text-[#5C3D2E] transition-colors hover:text-[#CC2222]"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
