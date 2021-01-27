import { sign } from 'jsonwebtoken'

export const sendRefreshToken = (res, token) => {

  res.cookie(process.env.AUTH_COOKIE_NAME, token, {
    expiresIn: 60 * 15
  })
}

export const createAccessToken = (user) => {
  return sign(
    { userId: user.id },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: '15m'})
}

export const createRefreshToken = (user) => {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d'})
}