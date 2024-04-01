import { Router } from 'express'
import { likesController, unlikesController } from '~/controllers/likes.controllers'
import { tweetIdValidator } from '~/middlewares/tweets.middlewares'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/user.middlewares'
import { wrapRequestHandler } from '~/services/utils/handlers'

const likesroutes = Router()

/**
 * Description: Like Tweet
 * Path: /
 * Method: POST
 * Body: { tweet_id: string }
 * Header: { Authorization: Bearer <access_token> }
 */
likesroutes.post(
  '/',
  accessTokenValidator,
  verifiedUserValidator,
  tweetIdValidator,
  wrapRequestHandler(likesController)
)

/**
 * Description: Unlike Tweet
 * Path: /tweets/:tweet_id
 * Method: DELETE
 * Body:
 * Header: { Authorization: Bearer <access_token> }
 */
likesroutes.delete(
  '/tweets/:tweet_id',
  accessTokenValidator,
  verifiedUserValidator,
  tweetIdValidator,
  wrapRequestHandler(unlikesController)
)
export default likesroutes
