import express from 'express'
import { create, index } from './controller'
import { checkSchema } from 'express-validator'
import { createAttendanceSchemaValidation } from './request'
import { verifyToken } from '../../middleware/token'

export const router = express.Router()

router.get('/', verifyToken, index)
router.post(
  '/',
  verifyToken,
  checkSchema(createAttendanceSchemaValidation),
  create
)
