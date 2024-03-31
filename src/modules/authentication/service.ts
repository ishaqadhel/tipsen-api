import { compare } from 'bcrypt'
import { type UserListResponse } from './response'
import { selectQuery } from '../../services/database'

export async function getOneUserByEmail(
  email: string
): Promise<Array<Partial<UserListResponse>>> {
  const result = await selectQuery<UserListResponse>(
    `select id, code, name, email, password, gender, is_admin, position_id, created_at, updated_at, deleted_at from users where email = '${email}' LIMIT 1`
  )
  return result
}

export async function checkUserPassword(
  password: string,
  requestPassword: string
): Promise<boolean> {
  return await compare(requestPassword, password)
}

export async function getOneUserById(
  id: number
): Promise<Array<Partial<UserListResponse>>> {
  const result = await selectQuery<UserListResponse>(
    `select id, code, name, email, gender, is_admin, position_id, created_at, updated_at, deleted_at from users where id = ${id} LIMIT 1`
  )
  return result
}
