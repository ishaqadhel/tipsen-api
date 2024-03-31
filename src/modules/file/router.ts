import { verifyToken } from '../../middleware/token'
import express from 'express'
import { create } from './controller'
import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({ storage })

export const router = express.Router()

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
router.post('/', verifyToken, upload.single('file'), create)
