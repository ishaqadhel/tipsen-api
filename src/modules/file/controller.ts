import { type Request, type Response } from 'express'
import {
  sendBadRequestError,
  sendError,
  sendSuccessWithData
} from '../../services/api-response'
import { createFileName, generateFileURL, storeFile } from './service'

export function create(req: Request, res: Response): void {
  const file = req.file
  if (file !== undefined) {
    const fileName = createFileName(file)
    storeFile(file, fileName)
      .then(() => {
        const fileURL = generateFileURL(fileName)
        sendSuccessWithData(res, fileURL)
      })
      .catch(() => {
        sendError(res, Error('error'))
      })
  } else {
    sendBadRequestError(res, Error('file not found'), null)
  }
}
