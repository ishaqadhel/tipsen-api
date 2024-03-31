import express from 'express'
import { create, index } from './controller'
import { checkSchema } from 'express-validator'
import { createAttendanceSchemaValidation } from './request'

export const router = express.Router()

router.get('/', index)
router.post('/', checkSchema(createAttendanceSchemaValidation), create)
