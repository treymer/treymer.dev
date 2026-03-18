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
    <footer className="border-t border-[var(--border)] bg-[var(--background-mid)]">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Decorative divider with purple glow */}
        <div
          className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-[#6D28D9]/40 to-transparent"
          style={{ boxShadow: "0 0 8px rgba(109, 40, 217, 0.3)" }}
        />

        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Copyright and flavor */}
          <div className="text-center sm:text-left">
            <p className="text-sm text-[var(--text-secondary)]">
              © {year} Tyler Reymer
            </p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              In tech since 2013 • For the Horde!
            </p>
          </div>

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
                    className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[#D4A017]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Fun footer text */}
        <div className="mt-6 text-center">
          <p className="text-xs text-[var(--text-muted)]">
            Made with Next.js, Terraform, and a little magic
          </p>
          <p className="mt-2 text-[10px] italic text-[#9A8870]">
            Why did the dragon invest in servers? Because it wanted to hoard all the data!
          </p>
        </div>

        {/* Decorative accent line with purple */}
        <div className="mt-6 flex justify-center">
          <div
            className="h-px w-24 bg-gradient-to-r from-transparent via-[#6D28D9]/40 to-transparent"
            style={{ boxShadow: "0 0 6px rgba(109, 40, 217, 0.25)" }}
          />
        </div>
      </div>
    </footer>
  );
}
