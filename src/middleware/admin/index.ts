import { type NextFunction, type Request, type Response } from 'express'
import {
  sendAuthenticationForbiddenError,
  sendBadRequestError,
  sendError
} from '../../services/api-response'
import { type CustomRequest } from '../token/type'
import { type User } from '../../models/master-data/user'
import { selectQuery } from '../../services/database'

export interface UserListResponse extends Omit<User, 'password'> {}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function mustAdmin(req: Request, res: Response, next: NextFunction) {
  getOneUserById(Number((req as CustomRequest).user?.userId))
    .then((response) => {
      if (response.length > 0) {
        if (response[0].is_admin === 1) {
          next()
        } else {
          sendAuthenticationForbiddenError(res, Error('not an admin'))
        }
      } else {
        sendBadRequestError(res, Error('user not found'), null)
      }
    })
    .catch((err) => {
      sendError(res, Error(err.sqlMessage as string))
    })
}

export async function getOneUserById(
  id: number
): Promise<Array<Partial<UserListResponse>>> {
  const result = await selectQuery<UserListResponse>(
    `select id, code, name, email, gender, is_admin, position_id, created_at, updated_at, deleted_at from users where id = ${id} LIMIT 1`
  )
  return result
}
