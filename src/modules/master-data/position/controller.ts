import { type Request, type Response } from 'express'
import { sendError, sendSuccessWithData } from '../../../services/api-response'
import { selectQuery } from '../../../services/database'
import { type PositionListResponse } from './response'

export function index(req: Request, res: Response): void {
  selectQuery<PositionListResponse>('select * from positions')
    .then((response) => sendSuccessWithData(res, response))
    .catch(() => {
      sendError(res, new Error('error'))
    })
}
