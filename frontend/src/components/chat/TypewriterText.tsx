"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
}

export default function TypewriterText({ text, className = "", speed = 0.03 }: TypewriterTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const prevTextRef = useRef("");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prevLen = prevTextRef.current.length;
    const newText = text.slice(prevLen);
    prevTextRef.current = text;

    if (newText.length === 0) return;

    const chars = newText.split("");
    const tempSpan = document.createElement("span");
    tempSpan.style.opacity = "0";
    el.appendChild(tempSpan);

    let i = 0;
    const interval = setInterval(() => {
      if (i < chars.length) {
        tempSpan.textContent += chars[i];
        i++;
      } else {
        clearInterval(interval);
        // Merge the temp span text into the parent
        el.removeChild(tempSpan);
        el.textContent = text;

        // Blink cursor effect
        gsap.fromTo(
          el,
          { borderRightColor: "rgba(192,132,252,0.8)" },
          { borderRightColor: "transparent", duration: 0.3, delay: 0.2 }
        );
      }
    }, speed * 1000);

    return () => {
      clearInterval(interval);
      if (tempSpan.parentNode) tempSpan.parentNode.removeChild(tempSpan);
    };
  }, [text]);

  return (
    <span
      ref={ref}
      className={`${className} border-r-2 border-[#c084fc]`}
    />
  );
}
