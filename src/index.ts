import express, {
  type Application,
  type Request,
  type Response,
  type NextFunction
} from 'express'

// Boot express
const app: Application = express()
const port = 8080

// Application routing
app.use('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ data: 'Welcome to Tipsen API.' })
})

// Start server
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${port}!`)
})
