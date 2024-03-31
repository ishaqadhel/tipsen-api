import express from 'express'
import { create, getOne, index, update } from './controller'
import { checkSchema } from 'express-validator'
import {
  createUserSchemaValidation,
  getOneUserSchemaValidation,
  updateUserSchemaValidation
} from './request'

export const router = express.Router()

router.get('/', index)
router.get('/:id', checkSchema(getOneUserSchemaValidation), getOne)
router.post('/', checkSchema(createUserSchemaValidation), create)
router.patch('/:id', checkSchema(updateUserSchemaValidation), update)
