import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { WebSocketServer } from 'ws'
import { handleChatWS } from './ws/handler.js'
import { authRouter } from './routes/auth.js'
import { chatRouter } from './routes/chat.js'

const app = express()
const server = createServer(app)
const wss = new WebSocketServer({ server, path: '/ws/chat' })

app.use(cors({ origin: process.env.FRONTEND_URL || '*' }))
app.use(express.json())

// Routes
app.use('/api/auth', authRouter)
app.use('/api/chat', chatRouter)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() })
})

// WebSocket
wss.on('connection', handleChatWS)

const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
  console.log(`AI Companion Backend running on http://localhost:${PORT}`)
  console.log(`WebSocket: ws://localhost:${PORT}/ws/chat`)
})
