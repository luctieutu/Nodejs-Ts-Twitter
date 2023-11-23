import User from '~/models/schemas/User.shemas'
import databaseServices from './database.services'

class UserService {
  async register(payload: { email: string; password: string }) {
    const { email, password } = payload
    const result = await databaseServices.users.insertOne(
      new User({
        email,
        password
      })
    )
    return result
  }
}

const userService = new UserService()
export default userService
