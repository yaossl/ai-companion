"use client";

import { useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import type { Message, Conversation } from "@/types/chat";

interface ChatLayoutProps {
  messages: Message[];
  conversations: Conversation[];
  currentCid: string | null;
  loading: boolean;
  streaming: string;
  onSend: (msg: string) => void;
  onSelectConv: (cid: string) => void;
  onDeleteConv: (cid: string) => void;
  onNewChat: () => void;
}

export default function ChatLayout({
  messages,
  conversations,
  currentCid,
  loading,
  streaming,
  onSend,
  onSelectConv,
  onDeleteConv,
  onNewChat,
}: ChatLayoutProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streaming]);

  return (
    <div className="flex h-screen">
      {/* 左侧对话列表 */}
      <aside className="w-72 glass m-2 mr-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-white/5">
          <button
            onClick={onNewChat}
            className="w-full bg-gradient-to-r from-[#ff6b9d] to-[#c084fc] text-white font-medium py-2.5 rounded-xl text-sm cursor-pointer hover:opacity-90 transition-opacity"
          >
            + 新对话
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => onSelectConv(conv.id)}
              className={`p-3 rounded-xl cursor-pointer transition-all group ${
                currentCid === conv.id
                  ? "bg-white/10 border border-[#c084fc]/30"
                  : "hover:bg-white/5 border border-transparent"
              }`}
            >
              <p className="text-sm text-[#e0e0ff] truncate">{conv.lastMessage || "新对话"}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-white/30">{conv.messageCount} 条消息</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteConv(conv.id);
                  }}
                  className="text-white/20 hover:text-red-400 text-xs opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                >
                  删除
                </button>
              </div>
            </div>
          ))}
          {conversations.length === 0 && (
            <p className="text-center text-white/30 text-sm py-8">暂无对话</p>
          )}
        </div>
      </aside>

      {/* 右侧消息区 */}
      <main className="flex-1 flex flex-col m-2 ml-0 glass overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6">
          {messages.length === 0 && !loading && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-6xl mb-4">💜</p>
                <p className="text-[#e0e0ff] opacity-60">开始一段新的对话吧</p>
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <MessageBubble
              key={i}
              role={msg.role}
              content={msg.content}
            />
          ))}

          {loading && streaming && (
            <MessageBubble
              role="assistant"
              content={streaming}
              isStreaming
            />
          )}

          {loading && !streaming && (
            <div className="flex justify-start mb-4">
              <div className="glass px-5 py-3 rounded-2xl rounded-bl-md flex items-center gap-1.5">
                <div className="w-2 h-2 bg-[#ff6b9d] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 bg-[#c084fc] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 bg-[#818cf8] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <ChatInput onSend={onSend} disabled={loading} />
      </main>
    </div>
  );
}
