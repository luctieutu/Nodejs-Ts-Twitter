import { Request, Response, NextFunction, RequestHandler } from 'express'
export const wrapRequestHandler = (fun: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fun(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
