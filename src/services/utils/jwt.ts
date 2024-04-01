import { config } from 'dotenv'
import jwt, { JwtPayload } from 'jsonwebtoken'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Errors'
import { TokenPayload } from '~/models/requests/users.requests'

config()
export const signToken = ({
  payload,
  privateKey,
  options = { algorithm: 'HS256' }
}: {
  payload: string | object | Buffer
  privateKey: string
  options?: jwt.SignOptions
}) => {
  return new Promise<string>((resolve, rejects) => {
    jwt.sign(payload, privateKey, options, (error, token) => {
      if (error) {
        throw rejects(error)
      }
      resolve(token as string)
    })
  })
}

export const verifyToken = ({ token, secretOrPublicKeye }: { token: string; secretOrPublicKeye: string }) => {
  return new Promise<TokenPayload>((resolve, reject) => {
    jwt.verify(token, secretOrPublicKeye, (error, decoded) => {
      if (error) {
        // throw reject(new ErrorWithStatus({ message: error.message, status: HTTP_STATUS.UNAUTHORIZED }))
        throw reject(error)
      }
      resolve(decoded as TokenPayload)
    })
  })
}
