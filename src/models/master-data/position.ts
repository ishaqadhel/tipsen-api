import { type RowDataPacket } from 'mysql2'

export interface Position extends RowDataPacket {
  id: number
  name: string
  created_at: string
  updated_at: string
  deleted_at?: string
}
