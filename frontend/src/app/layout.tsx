import type { Metadata } from "next";
import "./globals.css";
import PageTransition from "@/components/animations/PageTransition";

export const metadata: Metadata = {
  title: "AI 恋爱陪伴 - 遇见你的 AI 伴侣",
  description: "温暖的 AI 恋爱陪伴，随时随地倾听你的心声",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
