// src/components/Header.tsx
"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import Link from "next/link";
import MobileNav from "@/components/MobileNav";

const NAV_LINKS = [
  { href: "/category/runway", label: "Runway" },
  { href: "/category/street-style", label: "Street Style" },
  { href: "/category/culture", label: "Culture" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerRef = useRef<HTMLElement>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 60);
  });

  return (
    <>
      <motion.header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
        style={{
          backgroundColor: isScrolled
            ? "rgba(10, 10, 10, 0.95)"
            : "rgba(10, 10, 10, 0)",
        }}
      >
        <nav className="content-container flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-display-sm text-mode-white neon-glow-hover hover:text-mode-gold transition-colors duration-200"
          >
            MODE
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-sm uppercase tracking-[0.15em] text-mode-gray-400 hover:text-mode-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileOpen(true)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Open menu"
          >
            <span className="block w-6 h-px bg-mode-white" />
            <span className="block w-6 h-px bg-mode-white" />
            <span className="block w-6 h-px bg-mode-white" />
          </button>
        </nav>
      </motion.header>

      {/* Mobile nav overlay */}
      <MobileNav
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        links={NAV_LINKS}
      />
    </>
  );
}
