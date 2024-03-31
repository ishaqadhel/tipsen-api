import express from 'express'
import { create, deleteOne, getOne, index, update } from './controller'
import { checkSchema } from 'express-validator'
import {
  createUserSchemaValidation,
  deleteUserSchemaValidation,
  getOneUserSchemaValidation,
  updateUserSchemaValidation
} from './request'

export const router = express.Router()

router.get('/', index)
router.get('/:id', checkSchema(getOneUserSchemaValidation), getOne)
router.post('/', checkSchema(createUserSchemaValidation), create)
router.patch('/:id', checkSchema(updateUserSchemaValidation), update)
router.delete('/:id', checkSchema(deleteUserSchemaValidation), deleteOne)
