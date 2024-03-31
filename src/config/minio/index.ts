import 'dotenv/config'

export const configMinio = {
  endPoint: process.env.MINIO_ENDPOINT ?? '',
  port: process.env.MINIO_PORT,
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY ?? '',
  secretKey: process.env.MINIO_SECRET_KEY ?? '',
  bucket: process.env.MINIO_BUCKET ?? ''
}
