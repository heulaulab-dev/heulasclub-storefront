"use client";

import { useState, useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";

const categories = ["All", "Tops", "Bottoms", "Outerwear", "Accessories"];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const reduce = useReducedMotion();

  const filtered = useMemo(() => {
    if (activeCategory === "All") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div
        className="border-b py-12 md:py-16"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-2"
          >
            Shop
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-sm text-[var(--text-secondary)]"
          >
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          </motion.p>
        </div>
      </div>

      {/* Filters */}
      <div
        className="sticky top-16 z-40 border-b"
        style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-0 overflow-x-auto py-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-5 py-2 text-xs tracking-[0.12em] uppercase transition-all border mr-2 ${
                  activeCategory === cat
                    ? "bg-[var(--accent)] text-[#080808] border-[var(--accent)] font-bold"
                    : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 md:py-16">
        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-sm text-[var(--text-secondary)]">No products in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={reduce ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: (i % 3) * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href={`/products/${product.slug}`} className="group block">
                  <div className="relative aspect-[4/5] bg-[var(--bg-surface)] mb-4 overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.tags.map((tag) => (
                        <Badge key={tag} variant={tag} />
                      ))}
                    </div>
                    {product.tags.includes("sold-out") && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <span className="text-xs tracking-[0.15em] uppercase text-[var(--text-primary)]">Sold Out</span>
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
        )}
      </div>
    </div>
  );
}