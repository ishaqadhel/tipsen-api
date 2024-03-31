import express from 'express'
import { create, getOne, index } from './controller'
import { checkSchema } from 'express-validator'
import {
  createUserSchemaValidation,
  getOneUserSchemaValidation
} from './request'

export const router = express.Router()

router.get('/', index)
router.get('/:id', checkSchema(getOneUserSchemaValidation), getOne)
router.post('/', checkSchema(createUserSchemaValidation), create)
