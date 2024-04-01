import { Router } from 'express'
import {
  uploadImageController,
  uploadVideoController,
  uploadVideoHLSController,
  videoStatusController
} from '~/controllers/medias.controllers'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/user.middlewares'
import { wrapRequestHandler } from '~/services/utils/handlers'
const mediasRouter = Router()

mediasRouter.post(
  '/upload-image',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(uploadImageController)
)

mediasRouter.post(
  '/upload-video',
  //   accessTokenValidator,
  //   verifiedUserValidator,
  wrapRequestHandler(uploadVideoController)
)
mediasRouter.post(
  '/upload-video-hls',
  //   accessTokenValidator,
  //   verifiedUserValidator,
  wrapRequestHandler(uploadVideoHLSController)
)

mediasRouter.get(
  '/upload-video-hls',
  //   accessTokenValidator,
  //   verifiedUserValidator,
  wrapRequestHandler(videoStatusController)
)

export default mediasRouter
