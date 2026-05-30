"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useReducedMotion } from "motion/react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className,
  children,
  disabled,
  type = "button",
  onClick,
}: ButtonProps) {
  const reduce = useReducedMotion();

  const base =
    "inline-flex items-center justify-center tracking-[0.12em] uppercase font-bold transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-[var(--accent)] text-[#080808] hover:bg-[var(--accent-dim)] active:translate-y-px",
    secondary:
      "bg-transparent text-[var(--text-primary)] border border-[var(--border)] hover:border-[var(--text-secondary)] active:translate-y-px",
    ghost:
      "bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
  };

  const sizes = {
    sm: "text-[10px] px-4 py-2",
    md: "text-xs px-6 py-3.5",
    lg: "text-xs px-8 py-4",
  };

  return (
    <motion.button
      whileTap={reduce ? {} : { scale: 0.98, y: 1 }}
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      type={type}
      onClick={onClick}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 border border-current border-t-transparent animate-spin" />
          Loading
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
}