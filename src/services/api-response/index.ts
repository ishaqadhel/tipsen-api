import { type Response } from 'express'

export interface PaginationData<T> {
  data: T
  meta: PaginationMetaData
}

export interface PaginationMetaData {
  total: number
  last_page: number
}

export function sendSuccess(res: Response): Response {
  return res.status(200).send({
    status: 200,
    error: null,
    data: null
  })
}

export function sendSuccessWithData(
  res: Response,
  dataObject: unknown
): Response {
  return res.status(200).send({
    status: 200,
    error: null,
    data: dataObject
  })
}

export function sendError(res: Response, err: Error): Response {
  return res.status(500).send({
    status: 500,
    error: err.message,
    data: null
  })
}

export function sendBadRequestError(res: Response, err: Error): Response {
  return res.status(400).send({
    status: 400,
    error: err.message,
    data: null
  })
}

export function sendAuthenticationError(res: Response, err: Error): Response {
  return res.status(401).send({
    status: 401,
    error: err.message,
    data: null
  })
}

export function sendAuthenticationForbiddenError(
  res: Response,
  err: Error
): Response {
  return res.status(403).send({
    status: 403,
    error: err.message,
    data: null
  })
}
