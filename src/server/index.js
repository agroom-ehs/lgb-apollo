import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import typeDefs from './type_defs/index';
import resolvers from './resolvers/index';

(async () => {
  const app = express();
  app.use(cookieParser());

  app.use(
    cors({
      origin: 'http://localhost:4000',
      credentials: false,
    })
  );

  app.use(express.static('dist'));

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res })
  });

  apolloServer.applyMiddleware({ app, path: '/', cors: false });

  app.listen(process.env.PORT || 8080, () => {
    console.log(`Listening on port ${process.env.PORT || 8080}!`);
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT || 8080}${apolloServer.graphqlPath}`);
  });
})();
