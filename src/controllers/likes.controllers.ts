import { NextFunction, Response, Request } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { LIKE_MESSAGE } from '~/constants/messages'
import { LikeTweetReqBody } from '~/models/requests/like.requets'
import { TokenPayload } from '~/models/requests/users.requests'
import likeService from '~/services/likes.services'

export const likesController = async (
  req: Request<ParamsDictionary, any, LikeTweetReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authoriaztion as TokenPayload
  const result = await likeService.like(user_id, req.body.tweet_id)
  return res.json({
    message: LIKE_MESSAGE.LIKE_SUCCESSFULLY,
    result
  })
}

export const unlikesController = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.decoded_authoriaztion as TokenPayload
  const result = await likeService.unlike(user_id, req.params.tweet_id)
  return res.json({
    message: LIKE_MESSAGE.UNLIKE_SUCCESSFULLY
  })
}
