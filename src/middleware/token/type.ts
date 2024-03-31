import { type Request } from 'express'

// Define a custom interface for the user property
export interface CustomRequest extends Request {
  user?: { userId: string }
}
