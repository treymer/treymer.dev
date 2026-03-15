import Link from "next/link";

const socialLinks = [
  {
    href: "https://github.com/treymer",
    label: "GitHub",
    ariaLabel: "GitHub profile",
  },
  {
    href: "https://www.linkedin.com/in/tyler-reymer/",
    label: "LinkedIn",
    ariaLabel: "LinkedIn profile",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Decorative divider */}
        <div className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-stone-200 to-transparent" />

        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Copyright */}
          <p className="text-sm text-stone-500">
            © {year} Tyler Reymer
          </p>

          {/* Social links */}
          <nav aria-label="Social links">
            <ul className="flex items-center gap-6">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.ariaLabel}
                    className="text-sm font-medium text-stone-500 transition-colors hover:text-[#991B1B]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Decorative accent line */}
        <div className="mt-8 flex justify-center">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#991B1B]/40 to-transparent" />
        </div>
      </div>
    </footer>
  );
}
