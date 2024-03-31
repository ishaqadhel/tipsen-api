import { configDatabase } from '../../config/database'
import mysql, { type ResultSetHeader } from 'mysql2/promise'

const pool = mysql.createPool(configDatabase)

export async function selectQuery<T>(
  queryString: string
): Promise<Array<Partial<T>>> {
  const [results] = await pool.query(queryString)
  return results as T[]
}

export async function writeQuery(
  queryString: string
): Promise<ResultSetHeader> {
  const [results] = await pool.execute(queryString)
  return results as ResultSetHeader
}
