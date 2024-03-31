import { configAuthentication } from '../../config/auth'
import { type NextFunction, type Request, type Response } from 'express'
import { type JwtPayload, verify } from 'jsonwebtoken'
import { sendAuthenticationError } from '../../services/api-response'
import { type CustomRequest } from './type'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const tokenHeader = req.header('Authorization')
  if (tokenHeader == null || !tokenHeader.startsWith('Bearer ')) {
    return sendAuthenticationError(
      res,
      new Error('Token is missing or invalid')
    )
  }

  const token = tokenHeader.slice(7) // Remove 'Bearer ' prefix
  try {
    const decoded = verify(token, configAuthentication.authKey) as JwtPayload
    ;(req as CustomRequest).user = { userId: decoded.userId } // Store userId in req.user

    next()
  } catch (error) {
    return sendAuthenticationError(res, new Error('Token is invalid'))
  }
}
