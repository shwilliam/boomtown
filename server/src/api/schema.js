const {gql} = require('apollo-server-express')

module.exports = gql`
  directive @auth on OBJECT
  scalar Date

  type Item @auth {
    id: ID!
    createdAt: Date!
    title: String!
    description: String!
    owner: User!
    tags: [Tag]
    imageUrl: String
    borrower: User
  }

  type User @auth {
    id: ID!
    email: String!
    name: String!
    bio: String
    items: [Item]
    borrowed: [Item]
  }

  type Tag {
    id: ID!
    title: String!
  }

  type File {
    id: ID!
    filename: String!
    mimetype: String!
    encoding: String!
    itemId: ID!
  }

  input AssignedTag {
    id: ID!
    title: String!
  }

  input AssignedBorrower {
    id: ID!
  }

  input NewItemInput {
    title: String!
    description: String!
    tags: [AssignedTag]
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

  type Query {
    user(id: ID!): User
    viewer: User
    items(filter: ID): [Item]
    tags: [Tag]
  }

  type Mutation {
    addItem(item: NewItemInput!): Item
    signup(user: NewUserInput!): AuthPayload
    login(user: LoginUserInput!): AuthPayload
    logout: Boolean
    viewer: User
  }
`
