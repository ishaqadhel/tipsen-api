import express from 'express'
import { create, deleteOne, getOne, index, update } from './controller'
import { checkSchema } from 'express-validator'
import {
  createUserSchemaValidation,
  deleteUserSchemaValidation,
  getOneUserSchemaValidation,
  updateUserSchemaValidation
} from './request'
import { verifyToken } from '../../../middleware/token'
import { mustAdmin } from '../../../middleware/admin'

export const router = express.Router()

router.get('/', verifyToken, mustAdmin, index)
router.get(
  '/:id',
  verifyToken,
  mustAdmin,
  checkSchema(getOneUserSchemaValidation),
  getOne
)
router.post(
  '/',
  verifyToken,
  mustAdmin,
  checkSchema(createUserSchemaValidation),
  create
)
router.patch(
  '/:id',
  verifyToken,
  mustAdmin,
  checkSchema(updateUserSchemaValidation),
  update
)
router.delete(
  '/:id',
  verifyToken,
  mustAdmin,
  checkSchema(deleteUserSchemaValidation),
  deleteOne
)
