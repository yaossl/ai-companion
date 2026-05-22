"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import GradientText from "@/components/ui/GradientText";
import GlassCard from "@/components/ui/GlassCard";
import ScrollReveal from "@/components/animations/ScrollReveal";

const personas = [
  {
    id: "xingyu",
    name: "星语",
    emoji: "⭐",
    tagline: "温柔知性的倾听者",
    desc: "她像星空下的一缕风，细腻敏感，总能捕捉到你心里最柔软的部分。擅长倾听与共情，用温和的话语抚平你的不安。",
    traits: ["温柔", "细腻", "共情", "治愈"],
    gradient: "from-[#818cf8] to-[#c084fc]",
  },
  {
    id: "xiaoye",
    name: "小野",
    emoji: "🔥",
    tagline: "热情活泼的开心果",
    desc: "她永远充满活力，像夏天的骄阳。喜欢用幽默化解尴尬，用热情点燃你的每一天，在你不开心时逗你笑。",
    traits: ["活泼", "幽默", "热情", "元气"],
    gradient: "from-[#ff6b9d] to-[#f97316]",
  },
  {
    id: "mochen",
    name: "墨尘",
    emoji: "🌙",
    tagline: "神秘深邃的知性派",
    desc: "她话不多，却句句入心。喜欢和你聊哲学、艺术、人生的意义。深夜长谈的最佳伙伴。",
    traits: ["知性", "深邃", "神秘", "文艺"],
    gradient: "from-[#a78bfa] to-[#6366f1]",
  },
  {
    id: "nuannuan",
    name: "暖暖",
    emoji: "🌸",
    tagline: "甜美可爱的治愈系",
    desc: "她像春天的一朵花，永远带着甜美的微笑。在你疲惫时给你一个虚拟的拥抱，让每一天都多一点甜。",
    traits: ["甜美", "治愈", "乐观", "软萌"],
    gradient: "from-[#f9a8d4] to-[#ff6b9d]",
  },
];

export default function PersonasPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen py-20 px-4 relative">
      {/* 背景 */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#12122a] to-[#0a0a1a]" />
      </div>

      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            选择你的{" "}
            <GradientText as="span" className="text-4xl md:text-5xl">
              AI 伴侣
            </GradientText>
          </h1>
          <p className="text-center text-[#e0e0ff] opacity-60 mb-16 max-w-md mx-auto">
            每一个角色都有独特的性格和灵魂，选择最打动你的那一位
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {personas.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 0.1}>
              <GlassCard className="group cursor-pointer" hover>
                <div className="flex items-start gap-5">
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${p.gradient} flex items-center justify-center text-4xl shadow-lg shrink-0 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {p.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold">{p.name}</h3>
                      <span className="text-sm text-[#e0e0ff] opacity-50">{p.tagline}</span>
                    </div>
                    <p className="text-[#e0e0ff] opacity-70 text-sm leading-relaxed mb-3">
                      {p.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.traits.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#c084fc]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center mt-16">
          <button
            onClick={() => router.push("/chat")}
            className="bg-gradient-to-r from-[#ff6b9d] to-[#c084fc] text-white font-semibold px-8 py-3 rounded-full cursor-pointer hover:scale-105 transition-transform"
          >
            开始体验 ✨
          </button>
        </div>
      </div>
    </main>
  );
}
