import { createHash } from 'crypto'
import { configMinio } from '../../config/minio'
import { Client, type UploadedObjectInfo } from 'minio'

export function createFileName(file: Express.Multer.File): string {
  const currentDate = new Date().toISOString().slice(0, 10)
  const md5Hash = createHash('md5').update(currentDate).digest('hex')
  const shortHash = md5Hash.slice(0, 8)

  return shortHash + '-' + file.originalname
}

export async function storeFile(
  file: Express.Multer.File,
  fileName: string
): Promise<UploadedObjectInfo> {
  const minioClient = new Client({
    endPoint: configMinio.endPoint,
    port: Number(configMinio.port),
    useSSL: configMinio.useSSL,
    accessKey: configMinio.accessKey,
    secretKey: configMinio.secretKey
  })

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return await minioClient.putObject(
    configMinio.bucket,
    fileName,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    file.buffer,
    {
      'Content-Type': file.mimetype
    }
  )
}

export function generateFileURL(fileName: string): string {
  const ssl = configMinio.useSSL ? 'https://' : 'http://'
  return (
    ssl +
    configMinio.endPoint +
    ':' +
    configMinio.port +
    '/' +
    configMinio.bucket +
    '/' +
    fileName
  )
}
