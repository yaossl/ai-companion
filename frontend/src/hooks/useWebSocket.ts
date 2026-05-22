"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { WSMessage, WSResponse, Emotion } from "@/types/chat";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3001/ws/chat";

export function useWebSocket(token: string | null) {
  const wsRef = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [emotion, setEmotion] = useState<Emotion | null>(null);
  const chunkCallbackRef = useRef<((text: string) => void) | null>(null);
  const doneCallbackRef = useRef<((fullContent: string) => void) | null>(null);

  const connect = useCallback(() => {
    if (!token || wsRef.current?.readyState === WebSocket.OPEN) return;

    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "auth", token }));
    };

    ws.onmessage = (event) => {
      const data: WSResponse = JSON.parse(event.data);

      switch (data.type) {
        case "auth":
          if (data.success) setConnected(true);
          break;
        case "chunk":
          chunkCallbackRef.current?.(data.content!);
          break;
        case "done":
          doneCallbackRef.current?.(data.fullContent!);
          break;
        case "emotion":
          setEmotion({ label: data.label as Emotion["label"], score: data.score! });
          break;
      }
    };

    ws.onclose = () => {
      setConnected(false);
      wsRef.current = null;
    };

    ws.onerror = () => {
      ws.close();
    };
  }, [token]);

  const disconnect = useCallback(() => {
    wsRef.current?.close();
  }, []);

  const send = useCallback((msg: WSMessage) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  }, []);

  const onChunk = useCallback((cb: (text: string) => void) => {
    chunkCallbackRef.current = cb;
  }, []);

  const onDone = useCallback((cb: (fullContent: string) => void) => {
    doneCallbackRef.current = cb;
  }, []);

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  return { connected, emotion, send, onChunk, onDone, connect };
}
