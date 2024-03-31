import { type RowDataPacket } from 'mysql2'

export interface User extends RowDataPacket {
  id: number
  code: string
  name: string
  email: string
  password: string
  gender: string
  is_admin: boolean
  created_at: string
  updated_at: string
  deleted_at?: string
  position_id: number
}
