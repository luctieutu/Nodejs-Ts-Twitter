import { Request, Response, NextFunction, RequestHandler } from 'express'
export const wrapRequestHandler = <P>(fun: RequestHandler<P, any, any, any>) => {
  return async (req: Request<P>, res: Response, next: NextFunction) => {
    try {
      await fun(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
