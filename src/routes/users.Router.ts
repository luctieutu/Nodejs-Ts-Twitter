import Express from 'express'
const UsersRouter = Express.Router()
import { loginValidator, registerValidator } from '~/middlewares/user.middlewares'
import { loginController, registerController } from '~/controllers/users.controllers'

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

UsersRouter.post('/register', registerValidator, registerController)

export default UsersRouter
