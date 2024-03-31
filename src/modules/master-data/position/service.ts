import { getMeta, getOffset } from '../../../services/pagination'
import { selectQuery } from '../../../services/database'
import { type PositionListResponse } from './response'
import { type PaginationData } from '../../../services/api-response'

export async function getAllPosition(): Promise<
  Array<Partial<PositionListResponse>>
> {
  const result = await selectQuery<PositionListResponse>(
    'select * from positions'
  )
  return result
}

export async function getAllPositionWithPagination(
  page: number,
  limit: number
): Promise<PaginationData<Array<Partial<PositionListResponse>>>> {
  const count = await selectQuery<{ total: number }>(
    'SELECT count(1) as total FROM positions'
  )

  const meta = getMeta(count[0].total ?? 0, limit)
  const offset = getOffset(page, limit)

  const rows = await selectQuery<PositionListResponse>(
    `SELECT * FROM positions LIMIT ${offset},${limit}`
  )

  return {
    data: rows,
    meta
  }
}
