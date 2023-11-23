import { Request, Response } from 'express'
import User from '~/models/schemas/User.shemas'
import databaseServices from '~/services/database.services'
import userService from '~/services/users.services'

export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email === 'nguyentheluc246@gmail.com' && password === '123456') {
    return res.status(202).json({
      message: 'login success'
    })
  }
  return res.status(400).json({
    error: 'login faild'
  })
}

export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const result = await userService.register({ email, password })
    console.log(result)
    return res.json({
      message: 'Register success',
      result
    })
  } catch (error) {
    return res.status(400).json({
      message: 'Register faild',
      error
    })
  }
}
