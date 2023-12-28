import Express from 'express'
import {
  accessTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/user.middlewares'
import { loginController, logoutController, registerController } from '~/controllers/users.controllers'
import { wrapRequestHandler } from '~/utils/handlers'

const UsersRouter = Express.Router()
UsersRouter.get('/', (req, res) => {
  res.send('Hello, My name is Luc')
})
/**
 * Description. Login a user
 * Path: /login
 * Method: POST
 * Body: {email: string, password: string }
 */
UsersRouter.post('/login', loginValidator, wrapRequestHandler(loginController))

/**
 * Description. Resgister a new user
 * Path: /register
 * Method: POST
 * Body: {name: string, email: string, password: string, date_of_birth: ISO08601 }
 */
UsersRouter.post('/register', registerValidator, wrapRequestHandler(registerController))

/**
 * Description. Logout a user
 * Path: /logout
 * Method: POST
 * Header: { Authorization: Bearer <access_token>}
 * Body: { refresh_token: string }
 */
UsersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))

export default UsersRouter
