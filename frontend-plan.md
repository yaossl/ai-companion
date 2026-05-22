# AI恋爱陪伴 - 前端项目规划

## 仓库信息
- GitHub: https://github.com/yaossl/ai-companion
- 前端目录: `frontend/`
- 后端目录: `backend/` (已由另一位开发者搭建)

## 技术栈
- Next.js 15 + React 19 + TypeScript
- Tailwind CSS v4
- **GSAP** (GreenSock) - 核心动画库
- Framer Motion - 微交互

## 设计要求 (重中之重)
> 前端必须**极其炫酷**，像高端独立站一样，恋爱主题粉紫渐变色系

### 色彩方案
- 主色: #ff6b9d (粉红) → #c084fc (紫色) → #818cf8 (蓝紫)
- 背景: 深色系 #0a0a1a, #12122a
- 文字: #ffffff, #e0e0ff
- 玻璃态: rgba(255,255,255,0.05) + backdrop-blur

### 炫酷效果清单 (必须实现)
1. **粒子背景** - 粉紫粒子缓慢飘动，恋爱氛围
2. **流体动画** - Web GL / CSS 渐变流动背景
3. **玻璃态 (Glassmorphism)** - 所有卡片、聊天气泡
4. **GSAP 打字机效果** - AI回复逐字显示
5. **GSAP ScrollTrigger** - Landing页滚动动画，板块依次入场
6. **消息气泡动画** - 发送时滑入 + 缩放弹出
7. **页面转场** - 路由切换时的淡入淡出过渡
8. **渐变文字** - 品牌名、标题用粉紫渐变
9. **光晕脉冲** - AI思考时的呼吸光效
10. **视差滚动** - Landing页多层视差

## 页面结构

### 1. Landing Page (`/`)
- 全屏粒子背景
- Hero区域: 大标题 "遇见你的AI伴侣" + 渐变文字 + 打字机副标题
- CTA按钮: "开始对话" (脉冲呼吸动画)
- 特性介绍卡片 (3D翻转效果)
- 滚动触发的板块入场动画

### 2. 登录/注册 (`/login`, `/register`)
- 居中玻璃态卡片
- 流体渐变背景
- 表单微动画 (输入框聚焦光效)

### 3. 聊天界面 (`/chat`)
- 左侧: 对话列表 (玻璃态)
- 右侧: 消息区域
  - 用户消息: 右侧，粉紫色渐变气泡
  - AI消息: 左侧，玻璃态气泡 + GSAP打字机效果
- 底部: 输入框 + 发送按钮 (光晕效果)
- AI思考时: 三个跳动圆点 + 呼吸光效

### 4. 角色选择 (`/personas`)
- 3D透视卡片网格
- hover时卡片浮起 + 阴影加深
- 选中时脉冲光圈

### 5. 记忆时间线 (`/memories`)
- 垂直时间线布局
- 记忆卡片依次入场动画
- 按时间分组展示

## API 对接 (后端已提供)

### 认证
```
POST /api/auth/register  Body: { email, password, name }
POST /api/auth/login     Body: { email, password }
响应: { token, user: { id, email, name } }
```

### 对话 (HTTP)
```
POST /api/chat/send  Body: { message, conversationId? }
Header: Authorization: Bearer <token>
响应: { reply, conversationId, emotion }
```

### WebSocket (实时对话)
```
ws://localhost:3001/ws/chat
发送: { type: "message", content: "你好", conversationId?: "xxx" }
接收: { type: "chunk", content: "逐字" }  // 流式
接收: { type: "done", fullContent: "完整回复" }
接收: { type: "emotion", label: "happy", score: 0.8 }
```

### 对话列表
```
GET  /api/chat/conversations     获取对话列表
GET  /api/chat/messages/:id      获取对话消息
DELETE /api/chat/conversations/:id  删除对话
```

## 项目结构
```
frontend/
├── public/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # 根布局 (字体、主题)
│   │   ├── page.tsx            # Landing Page
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── chat/page.tsx       # 聊天主界面
│   │   ├── personas/page.tsx   # 角色选择
│   │   └── memories/page.tsx   # 记忆时间线
│   ├── components/
│   │   ├── ui/                 # 基础组件
│   │   │   ├── GlassCard.tsx
│   │   │   ├── GradientText.tsx
│   │   │   └── AnimatedButton.tsx
│   │   ├── landing/            # Landing组件
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ParticleBackground.tsx
│   │   │   └── FeatureGrid.tsx
│   │   ├── chat/               # 聊天组件
│   │   │   ├── ChatLayout.tsx
│   │   │   ├── MessageBubble.tsx
│   │   │   ├── TypewriterText.tsx
│   │   │   └── ChatInput.tsx
│   │   └── animations/
│   │       ├── GSAPProvider.tsx
│   │       ├── ScrollReveal.tsx
│   │       └── PageTransition.tsx
│   ├── hooks/
│   │   ├── useChat.ts          # 聊天状态
│   │   ├── useWebSocket.ts     # WS连接
│   │   └── useGSAP.ts          # GSAP封装
│   ├── lib/
│   │   └── api.ts              # API客户端
│   └── types/
│       └── chat.ts
├── package.json
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

## 后端启动
```bash
cd backend
npm install
npm run dev   # 启动在 http://localhost:3001
```

## 重要提醒
1. 前端运行在 `localhost:3000`，后端在 `localhost:3001`
2. WebSocket 地址: `ws://localhost:3001/ws/chat`
3. 后端 CORS 已配置允许 `localhost:3000`
4. 所有需要认证的接口 Header: `Authorization: Bearer <token>`
5. Token 存 localStorage，key 为 `ai-companion-token`
