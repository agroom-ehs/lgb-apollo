import { hash, compare } from 'bcryptjs'
import { verify } from 'jsonwebtoken'
import { sendRefreshToken, createAccessToken, createRefreshToken } from '../auth'

const testUser = {
  id: 1,
  email: "Test@lol.com",
  password: "$2y$12$Gv1.qYhWp8OqlW5jWswgH.Y7UVB3SEhHKctxkwA93wvNDBs15JXZ.",
  tokenVersion: 123
}
function getUser(args){
  return testUser
}

async function login(args, context){
    //TODO find user in db
    const valid = await compare(args.password, testUser.password)

    if (!valid) {
      throw new Error(`Invalid login.`)
    }
     // Login successful
     sendRefreshToken(context.res, createRefreshToken(testUser))

     return {
      accessToken: createAccessToken(testUser),
      testUser,
     }
}

async function refreshToken(args, context){
    const token = context.req.cookies[process.env.AUTH_COOKIE_NAME]
    console.log(context.req.cookies)
    console.log(token);
    if (!token) {
      return { ok: false, accessToken: '' }
    }

    let payload = null
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET)
    } catch (e) {
      console.log(e)
      return { ok: false, accessToken: '' }
    }

    // const user = await User.findOne({ id: payload.userId })

    // console.log('USER:', user)
    // if (!user) {
    //   return res.send({ ok: false, accessToken: '' })
    // }

    // if (user.tokenVersion !== payload.tokenVersion) {
    //   return res.send({ ok: false, accessToken: '' })
    // }

    sendRefreshToken(context.res, createRefreshToken(testUser))

    return { ok: true, accessToken: createAccessToken(testUser) }
}

export const UserResolver = {
  Query: {
    users: (parent, args) => getUser(args)
  },
  Mutation:{
    login: async(parent, args, context) => await login(args, context),
    refreshToken: async(parent, args, context) => await refreshToken(args, context)
  }
}
