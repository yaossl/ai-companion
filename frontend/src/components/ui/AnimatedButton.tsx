"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
}

export default function AnimatedButton({
  children,
  onClick,
  className = "",
  variant = "primary",
  disabled = false,
}: AnimatedButtonProps) {
  const baseStyles: Record<string, string> = {
    primary:
      "bg-gradient-to-r from-[#ff6b9d] via-[#c084fc] to-[#818cf8] text-white font-semibold px-8 py-3 rounded-full",
    secondary:
      "glass text-[#e0e0ff] font-medium px-6 py-2.5 rounded-full",
    ghost:
      "text-[#c084fc] font-medium px-4 py-2 rounded-full hover:bg-white/5",
  };

  return (
    <motion.button
      className={`${baseStyles[variant]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      whileHover={disabled ? undefined : { scale: 1.05 }}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </motion.button>
  );
}
