import express from 'express'
import UsersRouter from '~/routes/users.Router'
import databaseServices from '~/services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediasRouter from './routes/medias.Router'
import { initFolder } from './utils/file'
import { config } from 'dotenv'
import path from 'path'
import { UPLOAD_DIR } from './constants/dir'
config()
const app = express()
const port = process.env.PORT || 4000
databaseServices.connect()

//Tạo Folder upload
initFolder()
app.use(express.json())
app.use('/users', UsersRouter)
app.use('/medias', mediasRouter)
console.log(path.resolve('uploads'))
app.use('/static', express.static(UPLOAD_DIR))
app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
