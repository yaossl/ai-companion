"use client";

import GlassCard from "@/components/ui/GlassCard";
import GradientText from "@/components/ui/GradientText";
import ScrollReveal from "@/components/animations/ScrollReveal";

const features = [
  {
    icon: "💬",
    title: "自然对话",
    desc: "流畅的AI对话体验，像和真人聊天一样自然舒适",
  },
  {
    icon: "💜",
    title: "情感共情",
    desc: "识别你的情绪，用温暖的话语回应你的每一次倾诉",
  },
  {
    icon: "🧠",
    title: "记忆陪伴",
    desc: "记住你们之间的重要时刻，让陪伴越来越懂你",
  },
  {
    icon: "🎭",
    title: "角色选择",
    desc: "多种AI伴侣角色，找到最契合你内心的那一位",
  },
  {
    icon: "✨",
    title: "炫酷体验",
    desc: "精美的动画效果和视觉设计，每一次交互都是一场享受",
  },
  {
    icon: "🔒",
    title: "隐私安全",
    desc: "端到端加密，你的每一次倾诉都只属于你自己",
  },
];

export default function FeatureGrid() {
  return (
    <section className="relative z-10 py-24 px-4 max-w-6xl mx-auto">
      <ScrollReveal>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          为什么选择{" "}
          <GradientText as="span" className="text-3xl md:text-4xl">
            AI 伴侣
          </GradientText>
        </h2>
        <p className="text-center text-[#e0e0ff] opacity-70 mb-16 max-w-md mx-auto">
          每时每刻，都在用心陪伴
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <ScrollReveal key={f.title} delay={i * 0.1}>
            <GlassCard className="text-center group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-[#e0e0ff] opacity-70 text-sm">{f.desc}</p>
            </GlassCard>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
