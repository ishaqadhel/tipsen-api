import { type Request, type Response } from 'express'
import {
  sendBadRequestError,
  sendError,
  sendSuccess,
  sendSuccessWithData
} from '../../../services/api-response'
import { createOneUser, getAllUser, getAllUserWithPagination } from './service'
import { isPagination } from '../../../services/pagination'
import { validationResult } from 'express-validator'

export function index(req: Request, res: Response): void {
  if (isPagination(req)) {
    getAllUserWithPagination(Number(req.query.page), Number(req.query.limit))
      .then((response) => {
        sendSuccessWithData(res, response)
      })
      .catch(() => {
        sendError(res, Error('cant fetch data'))
      })
  } else {
    getAllUser()
      .then((response) => {
        sendSuccessWithData(res, response)
      })
      .catch(() => {
        sendError(res, Error('cant fetch data'))
      })
  }
}

export function create(req: Request, res: Response): void {
  // Check Validation
  const reqResult = validationResult(req)
  if (!reqResult.isEmpty()) {
    sendBadRequestError(res, Error('bad request'), reqResult)
  } else {
    createOneUser(
      String(req.body.name),
      String(req.body.email),
      String(req.body.password),
      String(req.body.gender),
      Number(req.body.position_id)
    )
      .then(() => {
        sendSuccess(res)
      })
      .catch((err) => {
        sendError(res, Error(err.sqlMessage as string))
      })
  }
}
