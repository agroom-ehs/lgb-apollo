import { gql } from 'apollo-server-express'

export const user = gql`
type user {
    id: Int
    email: String
    password: String
    tokenVersion: Int
}

type Query {
  users(email: String!): user
}

type loginResponse{
  accessToken: String
  user: user
}

type refreshTokenResponse{
  accessToken: String
  ok: Boolean
}

type Mutation {
  login(email : String!, password : String!): loginResponse
  refreshToken: refreshTokenResponse
}
`;
