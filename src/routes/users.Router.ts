import Express from 'express'
const UsersRouter = Express.Router()
import { loginValidator } from '~/middlewares/user.middlewares'
import { loginController, registerController } from '~/controllers/users.controllers'

UsersRouter.get('/', (req, res) => {
  res.send('Hello, My name is Luc')
})
UsersRouter.post('/login', loginValidator, loginController)
UsersRouter.post('/register', registerController)

export default UsersRouter
