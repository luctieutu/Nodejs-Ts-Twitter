import Express from 'express'
import { loginValidator, registerValidator } from '~/middlewares/user.middlewares'
import { loginController, registerController } from '~/controllers/users.controllers'
import { wrapRequestHandler } from '~/utils/handlers'

const UsersRouter = Express.Router()
UsersRouter.get('/', (req, res) => {
  res.send('Hello, My name is Luc')
})
UsersRouter.post('/login', loginValidator, loginController)
/**
 * Description. Resgister a new user
 * Path: /register
 * Method: POST
 * Body: {name: string, email: string, password: string, date_of_birth: ISO08601 }
 */

UsersRouter.post('/register', registerValidator, wrapRequestHandler(registerController))

export default UsersRouter
