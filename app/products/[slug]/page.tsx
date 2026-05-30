"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { getProductBySlug, products } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/store";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const reduce = useReducedMotion();

  const product = getProductBySlug(slug);

  if (!product) notFound();

  const related = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const handleAddToCart = async () => {
    if (!selectedSize || product.tags.includes("sold-out")) return;
    setAdding(true);
    await new Promise((r) => setTimeout(r, 600));
    useCartStore.getState().addItem(product, selectedSize);
    useCartStore.getState().openCart();
    setAdding(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen">
      <div className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="h-12 flex items-center">
            <Link
              href="/products"
              className="flex items-center gap-2 text-xs tracking-[0.12em] uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <ArrowLeft size={14} weight="light" strokeWidth={1.5} />
              Back to Shop
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Images */}
          <div className="space-y-4">
            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[4/5] bg-[var(--bg-surface)] overflow-hidden"
            >
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                priority
                className="object-cover"
              />
            </motion.div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-20 h-24 bg-[var(--bg-surface)] overflow-hidden border-2 transition-all ${
                      activeImage === i ? "border-[var(--accent)]" : "border-transparent"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              {product.tags.map((tag) => (
                <Badge key={tag} variant={tag} />
              ))}
              <span className="text-xs text-[var(--text-tertiary)] tracking-[0.1em] uppercase">
                {product.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{product.name}</h1>
            <p className="text-2xl font-mono font-medium mb-6">{formatPrice(product.price)}</p>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8 max-w-[50ch]">
              {product.description}
            </p>

            <div className="mb-8">
              <p className="text-xs tracking-[0.12em] uppercase text-[var(--text-secondary)] mb-3">
                Select Size
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    disabled={product.tags.includes("sold-out")}
                    className={`px-4 py-2.5 text-xs tracking-[0.1em] uppercase border transition-all ${
                      selectedSize === size
                        ? "border-[var(--accent)] bg-[var(--accent)] text-[#080808] font-bold"
                        : product.tags.includes("sold-out")
                        ? "border-[var(--border)] text-[var(--text-tertiary)] line-through"
                        : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-secondary)]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              loading={adding}
              disabled={!selectedSize || product.tags.includes("sold-out")}
              onClick={handleAddToCart}
              className="w-full"
            >
              {added ? "Added to Cart" : product.tags.includes("sold-out") ? "Sold Out" : "Add to Cart"}
            </Button>

            <div
              className="mt-10 pt-8 space-y-4 text-sm"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              {[
                { label: "Material", value: "Heavyweight cotton, deadstock sourced" },
                { label: "Origin", value: "Made in Portugal" },
                { label: "Fit", value: "Oversized, size down for regular fit" },
                { label: "Care", value: "Cold wash, hang dry" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start justify-between gap-4">
                  <span className="text-xs tracking-[0.1em] uppercase text-[var(--text-tertiary)] flex-shrink-0 pt-0.5">
                    {label}
                  </span>
                  <span className="text-[var(--text-secondary)] text-right">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {related.length > 0 && (
          <div className="mt-24 pt-12 border-t" style={{ borderColor: "var(--border)" }}>
            <h2 className="text-2xl font-bold tracking-tight mb-8">You may also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.id} href={`/products/${p.slug}`} className="group block">
                  <div className="relative aspect-[4/5] bg-[var(--bg-surface)] mb-3 overflow-hidden">
                    <Image src={p.images[0]} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium">{p.name}</p>
                    <p className="text-sm font-mono">{formatPrice(p.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}