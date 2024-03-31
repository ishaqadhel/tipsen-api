import express from 'express'
import { create, getOneInOneUserToday, index } from './controller'
import { checkSchema } from 'express-validator'
import {
  createAttendanceSchemaValidation,
  userGetOneTodaySchemaValidation
} from './request'
import { verifyToken } from '../../middleware/token'

export const router = express.Router()

router.get('/', verifyToken, index)
router.post(
  '/',
  verifyToken,
  checkSchema(createAttendanceSchemaValidation),
  create
)
router.get(
  '/user/:id/today',
  verifyToken,
  checkSchema(userGetOneTodaySchemaValidation),
  getOneInOneUserToday
)
