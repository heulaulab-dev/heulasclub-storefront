"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";

export function FeaturedDrops() {
  const reduce = useReducedMotion();
  const featured = products.filter((p) => p.tags.includes("new")).slice(0, 4);

  return (
    <section className="py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">New Drops</h2>
            <p className="text-sm text-[var(--text-secondary)] mt-2">SS26 Collection</p>
          </div>
          <Link
            href="/products"
            className="hidden md:flex items-center gap-2 text-xs tracking-[0.12em] uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors border-b border-[var(--border)] hover:border-[var(--text-secondary)] pb-0.5"
          >
            View All
          </Link>
        </div>

        {/* Horizontal scroll strip */}
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 md:-mx-0 md:px-0 scrollbar-none">
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={reduce ? false : { opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex-shrink-0 w-64 md:w-72"
            >
              <Link href={`/products/${product.slug}`} className="group block">
                <div className="relative aspect-[4/5] bg-[var(--bg-surface)] mb-4 overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.tags.includes("new") && (
                    <div className="absolute top-3 left-3">
                      <Badge variant="new" />
                    </div>
                  )}
                </div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium leading-tight">{product.name}</p>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">{product.category}</p>
                  </div>
                  <p className="text-sm font-mono font-medium flex-shrink-0">{formatPrice(product.price)}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <Link
          href="/products"
          className="md:hidden mt-8 flex items-center justify-center gap-2 text-xs tracking-[0.12em] uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors border border-[var(--border)] py-4"
        >
          View All Products
        </Link>
      </div>
    </section>
  );
}