import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { chatStream, saveMessage, getConversations, getMessages, deleteConversation, analyzeEmotion } from '../services/ai.js'

const router = Router()

// 鉴权中间件
function auth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) return res.status(401).json({ error: '未登录' })
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ error: 'Token无效' })
  }
}

// 发送消息 (SSE流式响应)
router.post('/send', auth, async (req, res) => {
  const { message, conversationId } = req.body
  if (!message) return res.status(400).json({ error: '消息不能为空' })

  const cid = conversationId || Date.now().toString()

  // 保存用户消息
  saveMessage(cid, 'user', message)

  // 分析情感
  const emotion = analyzeEmotion(message)

  // SSE headers
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  try {
    const { stream } = await chatStream([{ role: 'user', content: message }], cid)
    let fullContent = ''

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        const text = event.delta.text
        fullContent += text
        res.write(`data: ${JSON.stringify({ type: 'chunk', content: text })}\n\n`)
      }
    }

    // 保存AI回复
    saveMessage(cid, 'assistant', fullContent)

    res.write(`data: ${JSON.stringify({ type: 'done', conversationId: cid, emotion })}\n\n`)
    res.write('data: [DONE]\n\n')
    res.end()
  } catch (err) {
    console.error('Chat error:', err)
    res.write(`data: ${JSON.stringify({ type: 'error', error: 'AI服务暂时不可用' })}\n\n`)
    res.end()
  }
})

// 获取对话列表
router.get('/conversations', auth, (req, res) => {
  res.json(getConversations())
})

// 获取对话消息
router.get('/messages/:id', auth, (req, res) => {
  res.json(getMessages(req.params.id))
})

// 删除对话
router.delete('/conversations/:id', auth, (req, res) => {
  deleteConversation(req.params.id)
  res.json({ success: true })
})

export { router as chatRouter }
