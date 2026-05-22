const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("ai-companion-token");
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "请求失败" }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }

  return res.json();
}

// Auth
export const api = {
  register: (email: string, password: string, name?: string) =>
    request<{ token: string; user: { id: string; email: string; name: string } }>(
      "/api/auth/register",
      { method: "POST", body: JSON.stringify({ email, password, name }) }
    ),

  login: (email: string, password: string) =>
    request<{ token: string; user: { id: string; email: string; name: string } }>(
      "/api/auth/login",
      { method: "POST", body: JSON.stringify({ email, password }) }
    ),

  getConversations: () =>
    request<Array<{ id: string; messageCount: number; lastMessage: string; updatedAt: string }>>(
      "/api/chat/conversations"
    ),

  getMessages: (conversationId: string) =>
    request<Array<{ role: string; content: string }>>(
      `/api/chat/messages/${conversationId}`
    ),

  deleteConversation: (conversationId: string) =>
    request<{ success: boolean }>(
      `/api/chat/conversations/${conversationId}`,
      { method: "DELETE" }
    ),
};

export { getToken };
