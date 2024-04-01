import { Router } from 'express'
import { bookmarksController, unbookmarksController } from '~/controllers/bookmarks.controllers'
import { tweetIdValidator } from '~/middlewares/tweets.middlewares'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/user.middlewares'
import { wrapRequestHandler } from '~/services/utils/handlers'

const bookmarksRouter = Router()

/**
 * Description: Bookmark Tweet
 * Path: /
 * Method: POST
 * Body: { tweet_id: string }
 * Header: { Authorization: Bearer <access_token> }
 */
bookmarksRouter.post(
  '/',
  accessTokenValidator,
  verifiedUserValidator,
  tweetIdValidator,
  wrapRequestHandler(bookmarksController)
)

/**
 * Description: Unbookmark Tweet
 * Path: /tweets/:tweet_id
 * Method: DELETE
 * Body:
 * Header: { Authorization: Bearer <access_token> }
 */
bookmarksRouter.delete(
  '/tweets/:tweet_id',
  accessTokenValidator,
  verifiedUserValidator,
  tweetIdValidator,
  wrapRequestHandler(unbookmarksController)
)

export default bookmarksRouter
