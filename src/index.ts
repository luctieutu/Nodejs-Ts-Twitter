import express from 'express'
import UsersRouter from '~/routes/users.Router'
import databaseServices from '~/services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediasRouter from './routes/medias.Router'
import { initFolder } from './utils/file'
import { config } from 'dotenv'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from './constants/dir'
import staticRouter from './routes/static.Router'
config()
const app = express()
const port = process.env.PORT || 4000
databaseServices.connect()

//Tạo Folder upload
initFolder()
app.use(express.json())
app.use('/users', UsersRouter)
app.use('/medias', mediasRouter)

// app.use('/static', express.static(UPLOAD_IMAGE_DIR)) //C1
app.use('/static', staticRouter) //C2
app.use('/static/video', express.static(UPLOAD_VIDEO_DIR))
app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
