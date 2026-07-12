// src/components/Footer.tsx
import GoldRule from "@/components/GoldRule";
import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/articles", label: "All Articles" },
  { href: "/about", label: "About" },
];

export default function Footer() {
  return (
    <footer className="mt-24 md:mt-32">
      <GoldRule />
      <div className="content-container py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-display text-display-sm text-mode-white neon-glow-hover hover:text-mode-gold transition-colors duration-200"
            >
              MODE
            </Link>
            <p className="font-body text-sm text-mode-gray-600 mt-2 max-w-xs">
              A curated editorial experience covering fashion, culture, and
              style.
            </p>
          </div>

          {/* Links */}
          <nav>
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {FOOTER_LINKS.map((link) => (
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
          </nav>
        </div>

        {/* Copyright */}
        <p className="font-body text-xs text-mode-gray-700 mt-10">
          &copy; {new Date().getFullYear()} MODE. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
