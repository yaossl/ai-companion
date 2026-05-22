import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { v4 as uuid } from 'uuid'

const router = Router()

// 简单内存存储 (生产环境换数据库)
const users = new Map()

router.post('/register', (req, res) => {
  const { email, password, name } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: '邮箱和密码必填' })
  }
  if (users.has(email)) {
    return res.status(409).json({ error: '该邮箱已注册' })
  }
  const user = {
    id: uuid(),
    email,
    name: name || email.split('@')[0],
    password, // 生产环境用 bcrypt hash
    createdAt: new Date().toISOString()
  }
  users.set(email, user)
  const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET, { expiresIn: '7d' })
  res.json({ token, user: { id: user.id, email, name: user.name } })
})

router.post('/login', (req, res) => {
  const { email, password } = req.body
  const user = users.get(email)
  if (!user || user.password !== password) {
    return res.status(401).json({ error: '邮箱或密码错误' })
  }
  const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET, { expiresIn: '7d' })
  res.json({ token, user: { id: user.id, email, name: user.name } })
})

export { router as authRouter }
