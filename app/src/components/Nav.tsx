"use client";

import Image from "next/image";
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
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#5C3D2E] bg-[#3D2314]/95 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="group relative inline-flex items-center font-display text-xl font-bold tracking-tight text-[#F4E4C1] transition-colors hover:text-[#D4A017]"
          title="Cloud Paladin • SRE Guild Master • Horde Warrior"
        >
          <Image
            src="/icons/d20.svg"
            alt="d20"
            width={20}
            height={20}
            className="mr-1.5 transition-transform group-hover:rotate-[20deg]"
          />
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
                  className={`relative font-medium transition-all ${
                    isActive
                      ? "text-[#991B1B]"
                      : "text-[#C4A882] hover:text-[#D4A017]"
                  }`}
                  style={isActive ? { textShadow: "0 0 12px rgba(109, 40, 217, 0.5)" } : undefined}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-[#991B1B]"
                      style={{ boxShadow: "0 0 8px rgba(109, 40, 217, 0.6)" }}
                    />
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
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-[#5C3D2E] bg-[#2D1B0E] transition-colors hover:border-[#D4A017] hover:bg-[#3D2314] md:hidden"
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
        >
          <span
            className={`h-0.5 w-5 bg-[#C4A882] transition-all ${
              mobileOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-5 bg-[#C4A882] transition-all ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-5 bg-[#C4A882] transition-all ${
              mobileOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-[#5C3D2E] bg-[#3D2314] transition-all duration-300 ease-out md:hidden ${
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
                      ? "border-[#991B1B] text-[#991B1B]"
                      : "border-transparent text-[#C4A882] hover:border-[#D4A017] hover:text-[#D4A017]"
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
