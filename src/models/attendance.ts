import { type RowDataPacket } from 'mysql2'

export interface Attendance extends RowDataPacket {
  id: number
  notes: string
  proof_of_work_picture_url: string
  created_at: string
  updated_at: string
  deleted_at: string
  user_id: number
}
