import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/requests/users.requests'
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

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await userService.register(req.body)
  console.log(result)
  return res.json({
    message: 'Register success',
    result
  })
}
