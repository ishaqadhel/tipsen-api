import { type Request } from 'express'
import { type PaginationMetaData } from '../../services/api-response'

export function getOffset(currentPage: number, limitPerPage: number): number {
  return (currentPage - 1) * limitPerPage
}

export function isPagination(req: Request): boolean {
  if (req.query.limit != null && req.query.page != null) {
    return true
  }

  return false
}

export function getMeta(
  totalData: number,
  limitPerPage: number
): PaginationMetaData {
  const meta = {
    total: totalData ?? 0,
    last_page: Math.ceil((totalData ?? 0) / limitPerPage)
  }

  return meta
}
