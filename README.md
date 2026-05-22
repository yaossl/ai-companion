# AI恋爱陪伴 - AI Companion

> 炫酷独立站风格的AI恋爱陪伴网页应用

## 项目结构

```
ai-companion/
├── backend/    # 后端服务 (Node.js + Express)
├── frontend/   # 前端应用 (Next.js + GSAP)
└── frontend-plan.md  # 前端详细规划文档
```

## 快速启动

### 后端
```bash
cd backend
npm install
# 编辑 .env 填入 ANTHROPIC_API_KEY
npm run dev
```

### 前端
```bash
cd frontend
npm install
npm run dev
```

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端 | Next.js 15 + React 19 + TypeScript + Tailwind CSS |
| 动画 | GSAP + Framer Motion |
| 后端 | Node.js + Express + WebSocket |
| AI | Claude API (Anthropic) |
| 部署 | Vercel (前端) + Railway (后端) |
