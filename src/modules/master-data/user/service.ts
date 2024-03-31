import { getMeta, getOffset } from '../../../services/pagination'
import { selectQuery, writeQuery } from '../../../services/database'
import { type UserListResponse } from './response'
import { type PaginationData } from '../../../services/api-response'
import { type ResultSetHeader } from 'mysql2'
import { hashSync } from 'bcrypt'

function createNewUserCode(totalCurrentEmployee: number): string {
  const code = 'EMP-' + (totalCurrentEmployee + 1).toString()
  return code
}

export async function getAllUser(): Promise<Array<Partial<UserListResponse>>> {
  const result = await selectQuery<UserListResponse>(
    'select id, code, name, email, gender, is_admin, position_id, created_at, updated_at, deleted_at from users'
  )
  return result
}

export async function getOneUserById(
  id: number
): Promise<Array<Partial<UserListResponse>>> {
  const result = await selectQuery<UserListResponse>(
    `select id, code, name, email, gender, is_admin, position_id, created_at, updated_at, deleted_at from users where id = ${id} LIMIT 1`
  )
  return result
}

export async function getAllUserWithPagination(
  page: number,
  limit: number
): Promise<PaginationData<Array<Partial<UserListResponse>>>> {
  const count = await selectQuery<{ total: number }>(
    'SELECT count(1) as total FROM users'
  )

  const meta = getMeta(count[0].total ?? 0, limit)
  const offset = getOffset(page, limit)

  const rows = await selectQuery<UserListResponse>(
    `SELECT id, code, name, email, gender, is_admin, position_id, created_at, updated_at, deleted_at FROM users LIMIT ${offset},${limit}`
  )

  return {
    data: rows,
    meta
  }
}

export async function createOneUser(
  name: string,
  email: string,
  password: string,
  gender: string,
  positionId: number
): Promise<ResultSetHeader> {
  const count = await selectQuery<{ total: number }>(
    'SELECT count(1) as total FROM users'
  )

  const newCode = createNewUserCode(count[0].total ?? 0)
  const newHashPassword = hashSync(password, 10)

  const result = await writeQuery(
    `INSERT INTO users (code, name, email, password, gender, is_admin, created_at, updated_at, position_id) 
     VALUES ('${newCode}', '${name}', '${email}', '${newHashPassword}', '${gender}', false, NOW(), NOW(), ${positionId})
    `
  )

  return result
}
