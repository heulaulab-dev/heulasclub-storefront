"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import Image from "next/image";

const words = ["The", "Club", "Is", "Open."];

export function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-end pb-16 md:pb-24 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://picsum.photos/seed/heulasclub-hero/1600/1200"
          alt="HEULASCLUB drop"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] via-[var(--bg-base)]/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 w-full">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-xs tracking-[0.2em] uppercase text-[var(--accent)] mb-6 font-mono"
          >
            SS26 Drop&mdash; Now Live
          </motion.p>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-8">
            {words.map((word, i) => (
              <motion.span
                key={word}
                initial={reduce ? false : { opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2 + i * 0.08,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block mr-4 md:mr-6"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subtext */}
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-base md:text-lg text-[var(--text-secondary)] max-w-[42ch] mb-10 leading-relaxed"
          >
            Limited pieces for the collective. Heavyweight fabric, deadstock materials, made in Portugal.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/products"
              className="inline-flex items-center px-8 py-4 text-xs tracking-[0.15em] uppercase font-bold bg-[var(--accent)] text-[#080808] hover:bg-[var(--accent-dim)] active:translate-y-px transition-all"
            >
              Shop the Drop
            </Link>
            <Link
              href="/products?category=Accessories"
              className="inline-flex items-center px-8 py-4 text-xs tracking-[0.15em] uppercase font-bold border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--text-secondary)] active:translate-y-px transition-all"
            >
              Accessories
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 w-full mt-16"
      >
        <div className="flex items-center gap-4 text-xs text-[var(--text-tertiary)] font-mono tracking-wider">
          <span className="w-8 h-px bg-[var(--border)]" />
          SCROLL
        </div>
      </motion.div>
    </section>
  );
}