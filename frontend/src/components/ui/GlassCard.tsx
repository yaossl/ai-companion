"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function GlassCard({ children, className = "", hover = true, onClick }: GlassCardProps) {
  return (
    <motion.div
      className={`glass p-6 ${className}`}
      whileHover={hover ? { y: -4, boxShadow: "0 8px 40px rgba(192, 132, 252, 0.15)" } : undefined}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      {children}
    </motion.div>
  );
}
