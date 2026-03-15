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
    <footer className="border-t border-white/5 bg-zinc-950">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Copyright */}
          <p className="text-sm text-zinc-500">
            © {year} treymer.dev — SRE Engineering Manager at Walt Disney Company
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
                    className="text-sm font-medium text-zinc-500 transition-colors hover:text-cyan-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Decorative line */}
        <div className="mt-8 h-px w-24 bg-linear-to-r from-transparent via-cyan-500/50 to-transparent" />
      </div>
    </footer>
  );
}
