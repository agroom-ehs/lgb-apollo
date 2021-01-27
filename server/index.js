import 'dotenv/config'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { verify } from 'jsonwebtoken'
import { typeDefs } from './type_defs/index'
import { resolvers } from './resolvers/index'
import { createAccessToken, createRefreshToken } from './auth'
//import { createAccessToken, createRefreshToken } from './auth'
//import { sendRefreshToken } from './sendRefreshToken'
(async () => {

  const app = express()
  app.use(cookieParser())
  
  app.use(
    cors({
      origin: 'http://localhost:4000',
      credentials: false,
    })
  )

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res})},
  )

  apolloServer.applyMiddleware({ app, path:'/', cors: false })

  app.listen(4000, () => {
    console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`);
  })

})()
