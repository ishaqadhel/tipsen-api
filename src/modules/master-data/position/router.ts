import express from 'express'
import { index } from './controller'

export const router = express.Router()

router.get('/', index)
