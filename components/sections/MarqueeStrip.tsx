"use client";

import { motion, useReducedMotion } from "motion/react";

const text = "HEULASCLUB \u00B7 SS26 DROP \u00B7 LIMITED EDITIONS \u00B7 MADE IN PORTUGAL \u00B7 ";

export function MarqueeStrip() {
  const reduce = useReducedMotion();
  const repeated = text.repeat(6);

  return (
    <section
      className="py-6 overflow-hidden border-y"
      style={{ borderColor: "var(--border)", background: "var(--bg-surface)" }}
    >
      <motion.div
        animate={reduce ? {} : { x: ["0%", "-50%"] }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
        }}
        className="flex whitespace-nowrap"
      >
        {[0, 1].map((i) => (
          <span key={i} className="flex items-center gap-0">
            {repeated.split("\u00B7").map((segment, j) => (
              <span key={j} className="flex items-center">
                <span className="text-xs tracking-[0.25em] uppercase font-mono text-[var(--text-tertiary)]">
                  {segment.trim()}
                </span>
                <span className="mx-8 text-[var(--text-tertiary)]">·</span>
              </span>
            ))}
</span>
        ))}
      </motion.div>
    </section>
  );
}