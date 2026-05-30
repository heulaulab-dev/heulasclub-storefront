"use client";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { X, Minus, Plus, Trash } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCartStore();
  const reduce = useReducedMotion();

  return (
<AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[200] bg-black/60"
          />

          {/* Drawer */}
          <motion.aside
            initial={reduce ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed right-0 top-0 bottom-0 z-[201] w-full max-w-md flex flex-col"
            style={{ background: "var(--bg-surface)" }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 h-16 border-b"
              style={{ borderColor: "var(--border)" }}
            >
              <p className="text-sm font-bold tracking-[0.15em] uppercase">Cart</p>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <X size={18} weight="light" strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
                  <div className="w-16 h-16 border flex items-center justify-center" style={{ borderColor: "var(--border)" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--text-tertiary)]">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 01-8 0" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Your cart is empty</p>
                    <p className="text-xs text-[var(--text-secondary)]">Add pieces from the drop to get started.</p>
                  </div>
                  <Link
                    href="/products"
                    onClick={closeCart}
                    className="text-xs tracking-[0.12em] uppercase border px-6 py-3 hover:bg-[var(--accent)] hover:text-[#080808] transition-colors"
                    style={{ borderColor: "var(--border)" }}
                  >
                    Shop the Drop
                  </Link>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <li key={`${item.product.id}-${item.size}`} className="flex gap-4">
                      <div className="w-20 h-24 flex-shrink-0 bg-[var(--bg-elevated)] relative overflow-hidden">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-medium leading-tight">{item.product.name}</p>
                            <p className="text-xs text-[var(--text-secondary)] mt-0.5 font-mono">Size: {item.size}</p>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id, item.size)}
                            aria-label="Remove item"
                            className="text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors flex-shrink-0"
                          >
                            <Trash size={14} weight="light" strokeWidth={1.5} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2 border" style={{ borderColor: "var(--border)" }}>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                              aria-label="Decrease quantity"
                              className="w-7 h-7 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                            >
                              <Minus size={12} weight="light" strokeWidth={1.5} />
                            </button>
                            <span className="text-xs font-mono w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                              aria-label="Increase quantity"
                              className="w-7 h-7 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                            >
                              <Plus size={12} weight="light" strokeWidth={1.5} />
                            </button>
                          </div>
                          <p className="text-sm font-mono">{formatPrice(item.product.price * item.quantity)}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                className="px-6 py-6 space-y-4"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs tracking-[0.12em] uppercase text-[var(--text-secondary)]">Subtotal</p>
                  <p className="text-lg font-bold font-mono">{formatPrice(totalPrice())}</p>
                </div>
                <p className="text-xs text-[var(--text-tertiary)]">Shipping and taxes calculated at checkout.</p>
                <button
                  className="w-full py-4 text-xs tracking-[0.15em] uppercase font-bold bg-[var(--accent)] text-[#080808] hover:bg-[var(--accent-dim)] active:translate-y-px transition-all"
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}