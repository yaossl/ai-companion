"use client";

import { ReactNode, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/useGSAP";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const getFrom = (): gsap.TweenVars => {
    switch (direction) {
      case "up": return { y: 60, opacity: 0 };
      case "down": return { y: -60, opacity: 0 };
      case "left": return { x: -60, opacity: 0 };
      case "right": return { x: 60, opacity: 0 };
    }
  };

  useGSAP(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.fromTo(el, getFrom(), {
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      y: 0,
      x: 0,
      opacity: 1,
      duration: 0.8,
      delay,
      ease: "power3.out",
    });
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
