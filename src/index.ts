import express, {
  type Application,
  type Request,
  type Response,
  type NextFunction
} from 'express'
import { sendSuccess } from './services/api-response'
import cors from 'cors'

import { router as MasterDataPositionRouter } from './modules/master-data/position/router'
import { router as MasterDataUserRouter } from './modules/master-data/user/router'
import { router as AttendanceRouter } from './modules/attendance/router'
import { router as FileRouter } from './modules/file/router'
import { router as AuthenticationRouter } from './modules/authentication/router'

// Boot express
const app: Application = express()
const port = 8080

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routing
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  sendSuccess(res)
})

app.use('/api/master-data/position', MasterDataPositionRouter)
app.use('/api/master-data/user', MasterDataUserRouter)
app.use('/api/attendance', AttendanceRouter)
app.use('/api/file', FileRouter)
app.use('/api/authentication', AuthenticationRouter)

// Start server
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${port}!`)
})
