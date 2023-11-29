import User from '~/models/schemas/User.shemas'
import databaseServices from './database.services'
import { RegisterReqBody } from '~/models/requests/users.requests'
import { hashPassword } from '~/utils/crypto'
import { signToken } from '~/utils/jwt'
import { TokenType } from '~/constants/enums'

class UserService {
  private signAccesToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken
      },
      options: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
      }
    })
  }
  private signRefreshToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken
      },
      options: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
      }
    })
  }
  async register(payload: RegisterReqBody) {
    const result = await databaseServices.users.insertOne(
      new User({
        ...payload,
        date_of_birth: new Date(payload.date_of_birth),
        password: hashPassword(payload.password)
      })
    )
    const user_id = result.insertedId.toString()
    const [acces_token, refresh_token] = await Promise.all([
      this.signAccesToken(user_id),
      this.signRefreshToken(user_id)
    ])
    return { acces_token, refresh_token }
  }
  async checkEmailExist(email: string) {
    const user = await databaseServices.users.findOne({ email })
    console.log(user)
    return Boolean(user)
  }
}

const userService = new UserService()
export default userService
