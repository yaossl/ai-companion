"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import GradientText from "@/components/ui/GradientText";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      titleRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 }
    )
      .fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.4"
      )
      .fromTo(
        btnRef.current,
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6 },
        "-=0.2"
      );
  }, []);

  const phrases = [
    "你的专属AI伴侣，24小时在线",
    "倾听你的喜怒哀乐",
    "用温暖与共情陪你度过每一天",
  ];

  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1
        ref={titleRef}
        className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
      >
        遇见你的
        <br />
        <GradientText as="span" className="text-5xl md:text-7xl lg:text-8xl">
          AI 伴侣
        </GradientText>
      </h1>

      <p
        ref={subtitleRef}
        className="text-lg md:text-xl text-[#e0e0ff] max-w-lg mb-12 opacity-80"
      >
        温暖、共情、随时陪伴——你的专属 AI 恋爱伴侣，理解你的每一份心情。
      </p>

      <div ref={btnRef} className="flex gap-4">
        <AnimatedButton onClick={() => router.push("/register")}>
          开始对话 ✨
        </AnimatedButton>
        <AnimatedButton variant="secondary" onClick={() => router.push("/login")}>
          已有账号
        </AnimatedButton>
      </div>
    </section>
  );
}
