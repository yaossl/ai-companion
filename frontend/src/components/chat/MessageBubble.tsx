"use client";

import { motion } from "framer-motion";
import TypewriterText from "./TypewriterText";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

export default function MessageBubble({ role, content, isStreaming }: MessageBubbleProps) {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`max-w-[75%] px-5 py-3 rounded-2xl ${
          isUser
            ? "bg-gradient-to-r from-[#ff6b9d] to-[#c084fc] text-white rounded-br-md"
            : "glass rounded-bl-md"
        }`}
      >
        {isUser || !isStreaming ? (
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
        ) : (
          <TypewriterText
            text={content}
            className="text-sm leading-relaxed whitespace-pre-wrap"
          />
        )}
      </div>
    </motion.div>
  );
}
