import { type Request, type Response } from 'express'
import { sendError, sendSuccessWithData } from '../../../services/api-response'
import { getAllPosition, getAllPositionWithPagination } from './service'
import { isPagination } from '../../../services/pagination'

export function index(req: Request, res: Response): void {
  if (isPagination(req)) {
    getAllPositionWithPagination(
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
    getAllPosition()
      .then((response) => {
        sendSuccessWithData(res, response)
      })
      .catch(() => {
        sendError(res, Error('cant fetch data'))
      })
  }
}
