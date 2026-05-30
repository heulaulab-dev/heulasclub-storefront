"use client";

import { cn } from "@/lib/utils";

type BadgeVariant = "new" | "low-stock" | "sold-out";

interface BadgeProps {
  variant: BadgeVariant;
}

const config: Record<BadgeVariant, { label: string; className: string }> = {
  "new": {
    label: "New",
    className: "bg-[var(--accent)] text-[#080808]",
  },
  "low-stock": {
    label: "Low Stock",
    className: "bg-transparent text-[var(--text-secondary)] border border-[var(--border)]",
  },
  "sold-out": {
    label: "Sold Out",
    className: "bg-[var(--bg-elevated)] text-[var(--text-tertiary)]",
  },
};

export function Badge({ variant }: BadgeProps) {
  const { label, className } = config[variant];
  return (
    <span
      className={cn(
        "inline-block text-[10px] tracking-[0.15em] uppercase font-bold px-2 py-0.5",
        className
      )}
    >
      {label}
    </span>
  );
}