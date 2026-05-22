"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setInput("");
    inputRef.current?.focus();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="p-4 border-t border-white/5">
      <div className="flex items-center gap-3 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ff6b9d] via-[#c084fc] to-[#818cf8] rounded-2xl opacity-10 blur-md pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="说点什么..."
          disabled={disabled}
          className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#c084fc] transition-all disabled:opacity-50"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          className="bg-gradient-to-r from-[#ff6b9d] to-[#c084fc] text-white rounded-2xl p-3 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
}
