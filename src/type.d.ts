import { Request } from 'express'
import User from '~/models/schemas/User.shemas'
import { TokenPayload } from './models/requests/users.requests'

declare module 'express' {
  interface Request {
    user?: User
    decoded_authoriaztion?: TokenPayload
    decoded_refresh_token?: TokenPayload
  }
}
