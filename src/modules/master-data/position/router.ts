import express from 'express'
import { index } from './controller'
import { verifyToken } from '../../../middleware/token'
import { mustAdmin } from '../../../middleware/admin'

export const router = express.Router()

router.get('/', verifyToken, mustAdmin, index)
