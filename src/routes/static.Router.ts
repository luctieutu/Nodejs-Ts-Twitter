import { Router } from 'express'
import {
  serverImageController,
  serverM3u8Controller,
  serverSegmentController,
  serverVideoStreamController
} from '~/controllers/medias.controllers'

const staticRouter = Router()

staticRouter.get('/image/:name', serverImageController)
staticRouter.get('/video-stream/:name', serverVideoStreamController)
staticRouter.get('/video-hls/:id/master.m3u8', serverM3u8Controller)
staticRouter.get('/video-hls/:id/:v/:segment', serverSegmentController)

export default staticRouter
