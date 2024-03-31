import { type Request, type Response } from 'express'
import {
  sendBadRequestError,
  sendError,
  sendSuccess,
  sendSuccessWithData
} from '../../services/api-response'
import { isPagination } from '../../services/pagination'
import {
  createOneAttendance,
  getAllAttendance,
  getAllAttendanceWithPagination,
  getOneAttendanceInOneUserToday
} from './service'
import { validationResult } from 'express-validator'
import { type CustomRequest } from 'middleware/token/type'

export function index(req: Request, res: Response): void {
  if (isPagination(req)) {
    getAllAttendanceWithPagination(
      Number(req.query.page),
      Number(req.query.limit)
    )
      .then((response) => {
        sendSuccessWithData(res, response)
      })
      .catch(() => {
        sendError(res, Error('cant fetch data'))
      })
  } else {
    getAllAttendance()
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
    getOneAttendanceInOneUserToday(1)
      .then((response) => {
        if (response.length === 0) {
          createOneAttendance(
            String(req.body.proof_of_work_picture_url),
            Number((req as CustomRequest).user?.userId),
            String(req.body.notes)
          )
            .then(() => {
              sendSuccess(res)
            })
            .catch((err) => {
              sendError(res, Error(err.sqlMessage as string))
            })
        } else
          sendBadRequestError(
            res,
            Error('already make attendance log today'),
            null
          )
      })
      .catch((err) => {
        sendError(res, Error(err.sqlMessage as string))
      })
  }
}

export function getOneInOneUserToday(req: Request, res: Response): void {
  // Check Validation
  const reqResult = validationResult(req)
  if (!reqResult.isEmpty()) {
    sendBadRequestError(res, Error('bad request'), reqResult)
  } else {
    getOneAttendanceInOneUserToday(Number(req.params.id))
      .then((response) => {
        if (response.length > 0) {
          sendSuccessWithData(res, response[0])
        } else sendError(res, Error('there is no attendance log today'))
      })
      .catch((err) => {
        sendError(res, Error(err.sqlMessage as string))
      })
  }
}
