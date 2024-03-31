import { getMeta, getOffset } from '../../services/pagination'
import { type PaginationData } from '../../services/api-response'
import { selectQuery, writeQuery } from '../../services/database'
import { type AttendanceListResponse } from './response'
import { type ResultSetHeader } from 'mysql2'

export async function getAllAttendance(): Promise<
  Array<Partial<AttendanceListResponse>>
> {
  const result = await selectQuery<AttendanceListResponse>(
    'select * from attendances'
  )
  return result
}

export async function getOneAttendanceInOneUserToday(
  userId: number
): Promise<Array<Partial<AttendanceListResponse>>> {
  const result = await selectQuery<AttendanceListResponse>(
    `select * from attendances where DATE(created_at) = CURDATE() AND user_id = ${userId} LIMIT 1`
  )
  return result
}

export async function getAllAttendanceWithPagination(
  page: number,
  limit: number
): Promise<PaginationData<Array<Partial<AttendanceListResponse>>>> {
  const count = await selectQuery<{ total: number }>(
    'SELECT count(1) as total FROM attendances'
  )

  const meta = getMeta(count[0].total ?? 0, limit)
  const offset = getOffset(page, limit)

  const rows = await selectQuery<AttendanceListResponse>(
    `SELECT * from attendances LIMIT ${offset},${limit}`
  )

  return {
    data: rows,
    meta
  }
}

export async function createOneAttendance(
  proofOfWorkPictureURL: string,
  userId: number,
  notes?: string
): Promise<ResultSetHeader> {
  const newNotes = notes !== 'undefined' ? `'${notes}'` : `null`

  const result = await writeQuery(
    `INSERT INTO attendances (notes, proof_of_work_picture_url, created_at, updated_at, user_id) 
     VALUES (${newNotes}, '${proofOfWorkPictureURL}', NOW(), NOW(), ${userId})
    `
  )

  return result
}

export async function getAllAttendanceWithPaginationInOneUser(
  userId: number
): Promise<Array<Partial<AttendanceListResponse>>> {
  const results = await selectQuery<AttendanceListResponse>(
    `SELECT * from attendances WHERE user_id = ${userId}`
  )

  return results
}
