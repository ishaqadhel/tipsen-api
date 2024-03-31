import express from 'express'
import { login, me } from './controller'
import { verifyToken } from '../../middleware/token'

export const router = express.Router()

router.post('/login', login)
router.get('/me', verifyToken, me)
