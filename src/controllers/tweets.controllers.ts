import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { TweetType } from '~/constants/enums'
import { Pagination, TweetParam, TweetQuery, TweetRequestBody } from '~/models/requests/tweet.requests'
import { TokenPayload } from '~/models/requests/users.requests'
import tweetsService from '~/services/tweets.services'

export const createTweetController = async (
  req: Request<ParamsDictionary, any, TweetRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authoriaztion as TokenPayload
  const result = await tweetsService.createTweet(req.body, user_id)
  return res.json({
    message: 'Create Tweet Successfully',
    result
  })
}

export const getTweetController = async (req: Request, res: Response, next: NextFunction) => {
  // Thực hiện query database chỗ này là chúng ta đang thực hiện query lần thứ 2
  const { user_id } = req.decoded_authoriaztion as TokenPayload
  const result = await tweetsService.increaseView(req.params.tweet_id, user_id)
  const tweet = {
    ...req.tweet,
    guest_views: result.guest_views,
    user_views: result.user_views,
    updated_at: result.updated_at
  }
  return res.json({
    message: 'Get Tweet Successfully',
    result: tweet
  })
}
export const getTweetChildrenController = async (
  req: Request<TweetParam, any, any, TweetQuery>,
  res: Response,
  next: NextFunction
) => {
  const tweet_type = Number(req.query.tweet_type as string) as TweetType
  const limit = Number(req.query.limit as string)
  const page = Number(req.query.page as string)
  const { user_id } = req.decoded_authoriaztion as TokenPayload
  // Thực hiện query database chỗ này là chúng ta đang thực hiện query lần thứ 2
  const { tweets, total } = await tweetsService.getTweetChildren({
    tweet_id: req.params.tweet_id,
    tweet_type,
    limit,
    page,
    user_id
  })
  return res.json({
    message: 'Get children Tweet Successfully',
    result: {
      tweets,
      tweet_type,
      limit,
      page,
      total_page: Math.ceil(total / limit)
    }
  })
}

export const getNewFeedsController = async (
  req: Request<ParamsDictionary, any, Pagination>,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.decoded_authoriaztion?.user_id as string
  const limit = Number(req.query.limit as string)
  const page = Number(req.query.page as string)
  const result = await tweetsService.getNewFeeds({
    user_id,
    limit,
    page
  })
  return res.json({
    message: 'Get New Feeds Successfully',
    result
  })
}
