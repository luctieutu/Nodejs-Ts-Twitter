import express from 'express'
import UsersRouter from '~/routes/users.Router'
import databaseServices from '~/services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediasRouter from './routes/medias.Router'
import { initFolder } from './services/utils/file'
import { config } from 'dotenv'
import { UPLOAD_VIDEO_DIR } from './constants/dir'
import staticRouter from './routes/static.Router'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import tweetsRouter from './routes/tweets.Routes'
import bookmarksRouter from './routes/bookmarks.routes'
import likesroutes from './routes/likes.routes'
import YAML from 'yaml'
import fs from 'fs'
import swaggerUi from 'swagger-ui-express'
import path from 'path'

const file = fs.readFileSync('./twitter-swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)
// import '~/utils/fake'
config()
const app = express()
app.use(cors())
const port = process.env.PORT || 4000
databaseServices.connect().then(() => {
  databaseServices.indexUsers()
  databaseServices.indexRefreshTokens()
  databaseServices.indexVideoStatus()
  databaseServices.indexFollowers()
})

//Tạo Folder upload
initFolder()
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/users', UsersRouter)
app.use('/medias', mediasRouter)
app.use('/tweets', tweetsRouter)
app.use('/bookmarks', bookmarksRouter)
app.use('/likes', likesroutes)

// app.use('/static', express.static(UPLOAD_IMAGE_DIR)) //C1
app.use('/static', staticRouter) //C2
app.use('/static/video', express.static(UPLOAD_VIDEO_DIR))
app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const mgclient = new MongoClient(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@twitter.nzifep7.mongodb.net/?retryWrites=true&w=majority`
)

// const db = mgclient.db('earth')
// // Tạo 1000 document vào collection users
// const users = db.collection('user')
// const usersData = []
// function getRandomNumber(){
//   return Math.floor(Math.random() * 100) + 1
// }
// for (let i = 0; i < 1000; i++){
//   usersData.push({
//     name: 'user' + (i + 1),
//     age: getRandomNumber(),
//     sex: i % 2 == 0 ? 'male' : 'female'
//   })
// }

// users.insertMany(usersData)
