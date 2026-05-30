"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { List, X, ShoppingBag, User } from "@phosphor-icons/react";
import { useCartStore } from "@/lib/store";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, openCart } = useCartStore();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/products", label: "Shop" },
    { href: "/products?category=Tops", label: "Tops" },
    { href: "/products?category=Bottoms", label: "Bottoms" },
    { href: "/products?category=Outerwear", label: "Outerwear" },
    { href: "/products?category=Accessories", label: "Accessories" },
  ];

  return (
    <>
      <header
        className="sticky top-0 z-50 h-16 flex items-center border-b transition-all duration-300"
        style={{
          borderColor: scrolled ? "var(--border)" : "transparent",
          background: scrolled ? "rgb(8 8 8 / 0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
        }}
      >
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-sm font-bold tracking-[0.2em] uppercase hover:text-[var(--accent)] transition-colors"
          >
            HEULASCLUB
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs tracking-[0.12em] uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              aria-label="Account"
              className="hidden md:flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <User size={18} weight="light" strokeWidth={1.5} />
            </button>
            <button
              onClick={openCart}
              aria-label={`Cart, ${totalItems()} items`}
              className="relative flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <ShoppingBag size={18} weight="light" strokeWidth={1.5} />
              {totalItems() > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[var(--accent)] text-[#080808] text-[10px] font-bold flex items-center justify-center rounded-none">
                  {totalItems()}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="lg:hidden text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <List size={20} weight="light" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[var(--bg-base)] flex flex-col"
          >
            <div className="h-16 flex items-center justify-between px-6 border-b" style={{ borderColor: "var(--border)" }}>
              <span className="text-sm font-bold tracking-[0.2em] uppercase">HEULASCLUB</span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <X size={20} weight="light" strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex-1 flex flex-col justify-center px-6 gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={reduce ? false : { opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-3xl font-bold tracking-tight hover:text-[var(--accent)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}