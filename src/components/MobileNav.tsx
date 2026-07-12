// src/components/MobileNav.tsx
"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const panelVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 30 },
  },
  exit: {
    x: "100%",
    transition: { duration: 0.2, ease: "easeIn" as const },
  },
};

const linkVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.1 + i * 0.05, duration: 0.3 },
  }),
};

export default function MobileNav({ isOpen, onClose, links }: MobileNavProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-mode-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.nav
            className="absolute top-0 right-0 bottom-0 w-72 bg-mode-black border-l border-mode-gray-800 p-8 flex flex-col"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="self-end mb-12 p-2 text-mode-gray-400 hover:text-mode-white transition-colors"
              aria-label="Close menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>

            {/* Links */}
            <ul className="space-y-6">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="font-display text-display-sm text-mode-white hover:text-mode-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
