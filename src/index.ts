import express from 'express'
import UsersRouter from '~/routes/users.Router'
import databaseServices from '~/services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'

const app = express()
const port = 3000
databaseServices.connect()
app.use(express.json())
app.use('/users', UsersRouter)
app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
