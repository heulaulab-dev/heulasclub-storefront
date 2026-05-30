"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export function EditorialSplit() {
  const reduce = useReducedMotion();

  return (
    <section className="py-24 md:py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/5] bg-[var(--bg-surface)] overflow-hidden order-2 lg:order-1"
          >
            <Image
              src="https://picsum.photos/seed/heulasclub-editorial/1000/1250"
              alt="HEULASCLUB editorial"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--bg-base)]/20" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:pl-12 py-12 lg:py-0 order-1 lg:order-2"
          >
            <p className="text-xs tracking-[0.2em] uppercase text-[var(--accent)] mb-6 font-mono">
              The Archive
</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.05] mb-6">
              Made to last,<br />not to trend.
            </h2>
            <p className="text-base text-[var(--text-secondary)] max-w-[42ch] leading-relaxed mb-8">
              Every HEULASCLUB piece starts with deadstock fabric and ends with a limited run. No restocks. No compromises. The archive is the brand.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/products"
                className="inline-flex items-center px-6 py-3.5 text-xs tracking-[0.15em] uppercase font-bold bg-[var(--accent)] text-[#080808] hover:bg-[var(--accent-dim)] active:translate-y-px transition-all"
              >
                Shop Collection
              </Link>
              <Link
                href="#"
                className="inline-flex items-center px-6 py-3.5 text-xs tracking-[0.15em] uppercase font-bold border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--text-secondary)] active:translate-y-px transition-all"
              >
                Our Story
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}