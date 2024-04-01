import { NextFunction, Request, Response } from 'express'
import { BookmarkTweetReqBody } from '~/models/requests/bookmark.requests'
import { ParamsDictionary } from 'express-serve-static-core'
import { TokenPayload } from '~/models/requests/users.requests'
import bookmarkService from '~/services/bookmarks.services'
import { BOOKMARK_MESSAGE } from '~/constants/messages'

export const bookmarksController = async (
  req: Request<ParamsDictionary, any, BookmarkTweetReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authoriaztion as TokenPayload
  const result = await bookmarkService.bookmarkTweet(user_id, req.body.tweet_id)
  return res.json({
    message: BOOKMARK_MESSAGE.BOOKMARK_SUCCESSFULLY,
    result
  })
}

export const unbookmarksController = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.decoded_authoriaztion as TokenPayload
  await bookmarkService.unbookmarkTweet(user_id, req.params.tweet_id)
  return res.json({
    message: BOOKMARK_MESSAGE.UNBOOKMARK_SUCCESSFULLY
  })
}
