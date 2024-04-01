import { Request } from 'express'
import User from '~/models/schemas/User.schemas'
import { TokenPayload } from './models/requests/users.requests'
import Tweet from './models/schemas/Tweet.schema'

declare module 'express' {
  interface Request {
    user?: User
    decoded_authoriaztion?: TokenPayload
    decoded_email_verify_token?: TokenPayload
    decoded_refresh_token?: TokenPayload
    decoded_forgot_password_token?: TokenPayload
    tweet?: Tweet
  }
}
