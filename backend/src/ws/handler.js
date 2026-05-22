import jwt from 'jsonwebtoken'
import { chatStream, saveMessage, analyzeEmotion } from '../services/ai.js'

export function handleChatWS(ws, req) {
  let authenticated = false
  let user = null

  ws.on('message', async (data) => {
    try {
      const msg = JSON.parse(data.toString())

      // 认证
      if (msg.type === 'auth') {
        try {
          user = jwt.verify(msg.token, process.env.JWT_SECRET)
          authenticated = true
          ws.send(JSON.stringify({ type: 'auth', success: true }))
        } catch {
          ws.send(JSON.stringify({ type: 'auth', success: false, error: 'Token无效' }))
        }
        return
      }

      if (!authenticated) {
        ws.send(JSON.stringify({ type: 'error', error: '请先认证' }))
        return
      }

      // 聊天消息
      if (msg.type === 'message') {
        const cid = msg.conversationId || Date.now().toString()
        saveMessage(cid, 'user', msg.content)

        const emotion = analyzeEmotion(msg.content)
        ws.send(JSON.stringify({ type: 'emotion', ...emotion }))

        const { stream } = await chatStream([{ role: 'user', content: msg.content }], cid)
        let fullContent = ''

        for await (const event of stream) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            const text = event.delta.text
            fullContent += text
            ws.send(JSON.stringify({ type: 'chunk', content: text }))
          }
        }

        saveMessage(cid, 'assistant', fullContent)
        ws.send(JSON.stringify({ type: 'done', conversationId: cid, fullContent }))
      }
    } catch (err) {
      console.error('WS error:', err)
      ws.send(JSON.stringify({ type: 'error', error: '处理失败' }))
    }
  })

  ws.on('close', () => {
    console.log('WS disconnected')
  })
}
