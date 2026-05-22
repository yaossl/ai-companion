"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import GradientText from "@/components/ui/GradientText";
import AnimatedButton from "@/components/ui/AnimatedButton";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await api.login(email, password);
      localStorage.setItem("ai-companion-token", data.token);
      router.push("/chat");
    } catch (err) {
      setError(err instanceof Error ? err.message : "登录失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 relative">
      {/* 流体渐变背景 */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#12122a] to-[#1a0a2e]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff6b9d] rounded-full blur-[128px] opacity-10 animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#818cf8] rounded-full blur-[128px] opacity-10 animate-pulse-glow" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass p-8 md:p-10 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-center mb-2">
          欢迎回来{" "}
          <GradientText as="span" className="text-2xl">
            AI 伴侣
          </GradientText>
        </h1>
        <p className="text-center text-[#e0e0ff] opacity-60 text-sm mb-8">
          登录继续和你的AI伴侣对话
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm text-[#e0e0ff] mb-1.5">邮箱</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#c084fc] focus:shadow-[0_0_20px_rgba(192,132,252,0.15)] transition-all"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-[#e0e0ff] mb-1.5">密码</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#c084fc] focus:shadow-[0_0_20px_rgba(192,132,252,0.15)] transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <AnimatedButton
            disabled={loading}
            className="w-full"
          >
            {loading ? "登录中..." : "登录"}
          </AnimatedButton>
        </form>

        <p className="text-center text-sm text-[#e0e0ff] opacity-60 mt-6">
          还没有账号？{" "}
          <button
            onClick={() => router.push("/register")}
            className="text-[#c084fc] hover:underline cursor-pointer"
          >
            立即注册
          </button>
        </p>
      </motion.div>
    </main>
  );
}
