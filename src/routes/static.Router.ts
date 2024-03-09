import { Router } from 'express'
import { serverImageController, serverVideoController } from '~/controllers/medias.controllers'

const staticRouter = Router()

staticRouter.get('/image/:name', serverImageController)
staticRouter.get('/video/:name', serverVideoController)
export default staticRouter
