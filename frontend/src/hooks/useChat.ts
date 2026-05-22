"use client";

import { useState, useCallback, useEffect } from "react";
import { api, getToken } from "@/lib/api";
import type { Message, Conversation } from "@/types/chat";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentCid, setCurrentCid] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState("");

  const loadConversations = useCallback(async () => {
    if (!getToken()) return;
    try {
      const data = await api.getConversations();
      setConversations(data);
    } catch {
      // not authenticated yet
    }
  }, []);

  const loadMessages = useCallback(async (cid: string) => {
    try {
      const data = await api.getMessages(cid);
      setMessages(data);
      setCurrentCid(cid);
    } catch {
      // ignore
    }
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    setLoading(true);
    setStreaming("");
    const userMsg: Message = { role: "user", content };
    setMessages((prev) => [...prev, userMsg]);

    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE}/api/chat/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: content, conversationId: currentCid || undefined }),
      });

      const reader = res.body?.getReader();
      if (!reader) return;

      const decoder = new TextDecoder();
      let fullContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);
          if (data === "[DONE]") continue;

          try {
            const parsed = JSON.parse(data);
            if (parsed.type === "chunk") {
              fullContent += parsed.content;
              setStreaming(fullContent);
            } else if (parsed.type === "done") {
              setMessages((prev) => [
                ...prev,
                { role: "assistant", content: fullContent },
              ]);
              setStreaming("");
              if (parsed.conversationId) {
                setCurrentCid(parsed.conversationId);
              }
              loadConversations();
            }
          } catch {
            // partial chunk, ignore
          }
        }
      }
    } catch (err) {
      console.error("Send error:", err);
    } finally {
      setLoading(false);
    }
  }, [currentCid, loadConversations]);

  const deleteConv = useCallback(async (cid: string) => {
    await api.deleteConversation(cid);
    if (currentCid === cid) {
      setCurrentCid(null);
      setMessages([]);
    }
    await loadConversations();
  }, [currentCid, loadConversations]);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  return {
    messages,
    conversations,
    currentCid,
    loading,
    streaming,
    sendMessage,
    loadMessages,
    deleteConv,
    loadConversations,
  };
}
