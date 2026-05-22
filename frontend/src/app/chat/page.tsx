"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useChat } from "@/hooks/useChat";
import { getToken } from "@/lib/api";
import ChatLayout from "@/components/chat/ChatLayout";

export default function ChatPage() {
  const router = useRouter();
  const {
    messages,
    conversations,
    currentCid,
    loading,
    streaming,
    sendMessage,
    loadMessages,
    deleteConv,
    loadConversations,
  } = useChat();

  useEffect(() => {
    if (!getToken()) {
      router.push("/login");
    }
  }, [router]);

  const handleNewChat = () => {
    window.location.reload();
  };

  return (
    <ChatLayout
      messages={messages}
      conversations={conversations}
      currentCid={currentCid}
      loading={loading}
      streaming={streaming}
      onSend={sendMessage}
      onSelectConv={loadMessages}
      onDeleteConv={deleteConv}
      onNewChat={handleNewChat}
    />
  );
}
