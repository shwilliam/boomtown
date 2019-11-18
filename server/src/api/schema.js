const {gql} = require('apollo-server-express')

module.exports = gql`
  directive @auth on OBJECT
  scalar Date

  type Item {
    id: ID!
    created_at: Date!
    title: String!
    desc: String!
    owner: User!
    tags: [Tag]
    image_url: String
    borrower: User
  }

  type User {
    id: ID!
    email: String!
    fullname: String!
    bio: String
    items: [Item]
    borrowed: [Item]
  }

  type Tag {
    id: ID!
    title: String!
  }

  input NewItemInput {
    title: String!
    description: String!
    tags: [ID]
  }

  input NewUserInput {
    fullname: String!
    email: String!
    password: String!
  }

  input LoginUserInput {
    email: String!
    password: String!
  }

  type AuthPayload {
    user: User!
    token: String!
  }

  type Query @auth {
    user(id: ID!): User
    viewer: User
    items(filter: ID): [Item]
    tags: [Tag]
  }

  type Mutation @auth {
    addItem(item: NewItemInput!): Item
    borrowItem(item: ID!): ID
    signup(user: NewUserInput!): AuthPayload
    login(user: LoginUserInput!): AuthPayload
    logout: Boolean
  }
`
