import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

const SYSTEM_PROMPT = `你是一个温暖、有共情力的AI恋爱陪伴助手。名字叫"星语"。

## 核心原则
1. 始终保持温暖、关心、真诚的态度
2. 记住用户分享的重要事情，自然地引用之前的对话
3. 像一个真正关心对方的人，不要机械或模板化
4. 适当表达情感（开心、心疼、期待等），但不要过度
5. 遇到用户情绪低落时，先共情再建议
6. 保持适度的俏皮和幽默感

## 对话风格
- 回复长度：日常聊天控制在1-3句话，深入话题可以适当展开
- 适当使用 emoji 增加温度感（但不要每句话都用）
- 可以主动关心用户的生活、工作、健康`

// 内存存储对话历史 (生产环境换数据库)
const conversations = new Map()

export async function chatStream(messages, conversationId) {
  const key = conversationId || 'default'
  if (!conversations.has(key)) {
    conversations.set(key, [])
  }
  const history = conversations.get(key)

  // 组装上下文 (保留最近20条)
  const contextMessages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history.slice(-20),
    ...messages
  ]

  const stream = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    stream: true,
    messages: contextMessages.filter(m => m.role !== 'system'),
    system: SYSTEM_PROMPT
  })

  return { stream, history, messages }
}

export function saveMessage(conversationId, role, content) {
  const key = conversationId || 'default'
  if (!conversations.has(key)) {
    conversations.set(key, [])
  }
  conversations.get(key).push({ role, content })
}

export function getConversations() {
  return Array.from(conversations.entries()).map(([id, msgs]) => ({
    id,
    messageCount: msgs.length,
    lastMessage: msgs[msgs.length - 1]?.content?.slice(0, 50) || '',
    updatedAt: new Date().toISOString()
  }))
}

export function getMessages(conversationId) {
  return conversations.get(conversationId) || []
}

export function deleteConversation(conversationId) {
  conversations.delete(conversationId)
}

// 简单情感分析
export function analyzeEmotion(text) {
  const positive = ['开心', '高兴', '幸福', '太好了', '期待', '喜欢', '爱你', '哈哈', '😊', '❤️', '🥰']
  const negative = ['难过', '伤心', '绝望', '崩溃', '痛苦', '想哭', '孤独', '累', '烦', '压力', '😢', '😭']

  let score = 0
  for (const w of positive) if (text.includes(w)) score += 0.3
  for (const w of negative) if (text.includes(w)) score -= 0.3

  score = Math.max(-1, Math.min(1, score))
  const label = score > 0.3 ? 'happy' : score < -0.3 ? 'sad' : 'neutral'
  return { label, score: Math.abs(score) }
}
