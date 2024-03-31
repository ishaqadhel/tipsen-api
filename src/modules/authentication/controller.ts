import { validationResult } from 'express-validator'
import {
  sendBadRequestError,
  sendError,
  sendSuccessWithData
} from '../../services/api-response'
import { checkUserPassword, getOneUserByEmail, getOneUserById } from './service'
import { type Request, type Response } from 'express'
import { sign } from 'jsonwebtoken'
import { configAuthentication } from '../../config/auth'
import { type CustomRequest } from '../../middleware/token/type'

export function login(req: Request, res: Response): void {
  // Check Validation
  const reqResult = validationResult(req)
  if (!reqResult.isEmpty()) {
    sendBadRequestError(res, Error('bad request'), reqResult)
  } else {
    getOneUserByEmail(String(req.body.email))
      .then(async (response) => {
        if (response.length > 0) {
          const matchPassword = await checkUserPassword(
            String(response[0].password),
            String(req.body.password)
          )
          if (matchPassword) {
            const token = sign(
              { userId: response[0].id },
              configAuthentication.authKey,
              {
                expiresIn: '6h'
              }
            )
            sendSuccessWithData(res, token)
          } else {
            sendError(res, Error('email or password invalid'))
          }
        } else {
          sendBadRequestError(res, Error('user not found'), null)
        }
      })
      .catch((err) => {
        sendError(res, Error(err.sqlMessage as string))
      })
  }
}

export function me(req: Request, res: Response): void {
  getOneUserById(Number((req as CustomRequest).user?.userId))
    .then((response) => {
      if (response.length > 0) {
        sendSuccessWithData(res, response[0])
      } else {
        sendBadRequestError(res, Error('user not found'), null)
      }
    })
    .catch((err) => {
      sendError(res, Error(err.sqlMessage as string))
    })
}
