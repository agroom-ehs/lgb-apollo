import { gql } from 'apollo-server-express'

export const user = gql`

type user {
    id: Int
    email: String
    password: String
    tokenVersion: Int
}

type Query {
    users: [user]
  }
`;
