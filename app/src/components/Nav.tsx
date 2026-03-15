"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/portfolio", label: "Portfolio" },
];

export default function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-stone-200 bg-[#FAFAF7]/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="group relative font-display text-xl font-bold tracking-tight text-stone-900 transition-colors hover:text-[#991B1B]"
          title="Cloud Paladin • SRE Guild Master • Horde Warrior"
        >
          <span className="mr-1.5 inline-block transition-transform group-hover:rotate-[20deg]">🎲</span>
          treymer<span className="text-[#991B1B]">.dev</span>
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
                  className={`relative font-medium transition-colors ${
                    isActive
                      ? "text-[#991B1B]"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-[#991B1B]" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-stone-200 bg-white transition-colors hover:border-stone-300 hover:bg-stone-50 md:hidden"
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
        >
          <span
            className={`h-0.5 w-5 bg-stone-700 transition-all ${
              mobileOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-5 bg-stone-700 transition-all ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-5 bg-stone-700 transition-all ${
              mobileOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-stone-200 bg-white transition-all duration-300 ease-out md:hidden ${
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
                  className={`block border-l-2 py-3 pl-4 font-medium transition-colors ${
                    isActive
                      ? "border-[#991B1B] text-[#991B1B]"
                      : "border-transparent text-stone-600 hover:border-stone-300 hover:text-stone-900"
                  }`}
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
