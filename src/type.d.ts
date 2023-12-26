import { Request } from 'express'
import User from '~/models/schemas/User.shemas'

declare module 'express' {
  interface Request {
    user?: User
  }
}
