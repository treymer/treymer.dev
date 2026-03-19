"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/adventure", label: "Adventure" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-[var(--background-mid)]/95 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="group relative inline-flex items-center font-display text-xl font-bold tracking-tight text-[var(--text-primary)] transition-colors hover:text-[#D4A017]"
          title="Cloud Paladin • SRE Guild Master • Horde Warrior"
        >
          <Image
            src="/icons/d20.svg"
            alt="d20"
            width={20}
            height={20}
            className="mr-1.5 transition-transform group-hover:rotate-[20deg]"
          />
          treymer<span className="text-[#CC2222]">.dev</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative font-medium transition-all ${
                    isActive
                      ? "text-[#CC2222]"
                      : "text-[var(--text-secondary)] hover:text-[#D4A017]"
                  }`}
                  style={isActive ? { textShadow: "0 0 12px rgba(109, 40, 217, 0.5)" } : undefined}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-[#CC2222]"
                      style={{ boxShadow: "0 0 8px rgba(109, 40, 217, 0.6)" }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Theme toggle + Hamburger */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--background)] transition-colors hover:border-[#D4A017] hover:bg-[var(--background-mid)] md:hidden"
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            <span className={`h-0.5 w-5 bg-[var(--text-secondary)] transition-all ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-5 bg-[var(--text-secondary)] transition-all ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-5 bg-[var(--text-secondary)] transition-all ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-[var(--border)] bg-[var(--background-mid)] transition-all duration-300 ease-out md:hidden ${
          mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-0 px-6 py-4">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block border-l-2 py-3 pl-4 font-medium transition-all ${
                    isActive
                      ? "border-[#CC2222] text-[#CC2222]"
                      : "border-transparent text-[var(--text-secondary)] hover:border-[#D4A017] hover:text-[#D4A017]"
                  }`}
                  style={isActive ? { textShadow: "0 0 12px rgba(109, 40, 217, 0.5)" } : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
