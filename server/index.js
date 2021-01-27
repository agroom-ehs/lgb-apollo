import 'dotenv/config'
import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { verify } from 'jsonwebtoken'
import { typeDefs } from './type_defs/index'
import { UserResolver } from './resolvers/user_resolver'
//import { createAccessToken, createRefreshToken } from './auth'
//import { sendRefreshToken } from './sendRefreshToken'
(async () => {
const app = express()
app.use(
  cors({
    origin: 'http://localhost:4000',
    credentials: true,
  })
)

app.use(cookieParser())

const apolloServer = new ApolloServer({
  typeDefs,
  UserResolver
},{
context: ({ req, res }) => ({
  req,
  res,
}),
})


apolloServer.applyMiddleware({ app, cors: false })

app.listen(4000, () => {
  console.log('Express server started on port 4000')
})

})()
