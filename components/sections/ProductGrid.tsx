"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";

export function ProductGrid() {
  const reduce = useReducedMotion();

  return (
    <section className="py-24 md:py-32 border-t" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">All Products</h2>
            <p className="text-sm text-[var(--text-secondary)] mt-2">{products.length} pieces in the drop</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: (i % 3) * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/products/${product.slug}`} className="group block">
                {/* Image */}
                <div className="relative aspect-[4/5] bg-[var(--bg-surface)] mb-4 overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Hover overlay with quick-add */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  {/* Tags */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.tags.map((tag) => (
                      <Badge key={tag} variant={tag} />
                    ))}
                  </div>
                  {/* Quick add (future) */}
                  {product.tags.includes("sold-out") && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <span className="text-xs tracking-[0.15em] uppercase text-[var(--text-primary)]">Sold Out</span>
                    </div>
                  )}
                </div>

                {/* Info */}
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
      </div>
    </section>
  );
}