import { Router } from 'express'
import {
  createTweetController,
  getNewFeedsController,
  getTweetChildrenController,
  getTweetController
} from '~/controllers/tweets.controllers'
import {
  audienceValidator,
  createTweetValidator,
  getTweetChildrenValidator,
  paginationValidator,
  tweetIdValidator
} from '~/middlewares/tweets.middlewares'
import { accessTokenValidator, isUserLoggedInValidator, verifiedUserValidator } from '~/middlewares/user.middlewares'
import { wrapRequestHandler } from '~/services/utils/handlers'

const tweetsRouter = Router()

/**
 * Description. Create Tweet
 * Path: /
 * Method: POST
 * Body: TweetRequestBody
 * Header: { Authorization: Bearer <access_token> }
 */
tweetsRouter.post(
  '/',
  accessTokenValidator,
  verifiedUserValidator,
  createTweetValidator,
  wrapRequestHandler(createTweetController)
)

/**
 * Description: Get Tweet detail
 * Path: /:tweet_id
 * Method: Get
 * Header: { Authorization: Bearer <access_token> }
 */
tweetsRouter.get(
  '/:tweet_id',
  tweetIdValidator,
  isUserLoggedInValidator(accessTokenValidator),
  isUserLoggedInValidator(verifiedUserValidator),
  audienceValidator,
  wrapRequestHandler(getTweetController)
)

/**
 * Description: Get Tweet detail
 * Path: /:tweet_id/children
 * Method: Get
 * Header: { Authorization: Bearer <access_token> }
 * Query: {limit: number, page: number, tweet_type: TweetType}
 */
tweetsRouter.get(
  '/:tweet_id/children',
  tweetIdValidator,
  paginationValidator,
  getTweetChildrenValidator,
  isUserLoggedInValidator(accessTokenValidator),
  isUserLoggedInValidator(verifiedUserValidator),
  audienceValidator,
  wrapRequestHandler(getTweetChildrenController)
)

/**
 * Description: Get new feeds
 * Path: /
 * Method: Get
 * Header: { Authorization: Bearer <access_token> }
 * Query: {limit: number, page: number}
 */
tweetsRouter.get(
  '/',
  paginationValidator,
  isUserLoggedInValidator(accessTokenValidator),
  isUserLoggedInValidator(verifiedUserValidator),
  wrapRequestHandler(getNewFeedsController)
)
export default tweetsRouter
