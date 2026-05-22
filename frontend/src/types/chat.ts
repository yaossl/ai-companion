export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Conversation {
  id: string;
  messageCount: number;
  lastMessage: string;
  updatedAt: string;
}

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface Emotion {
  label: "happy" | "sad" | "neutral";
  score: number;
}

export interface WSMessage {
  type: "auth" | "message";
  token?: string;
  content?: string;
  conversationId?: string;
}

export interface WSResponse {
  type: "auth" | "chunk" | "done" | "emotion" | "error";
  success?: boolean;
  content?: string;
  fullContent?: string;
  conversationId?: string;
  label?: string;
  score?: number;
  error?: string;
}
