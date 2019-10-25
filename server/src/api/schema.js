const {gql} = require('apollo-server-express')

// TODO: Date scalar

module.exports = gql`
  # scalar Date

  type Item {
    id: ID!
    # createdAt: Date!
    title: String!
    description: String!
    owner: User!
    tags: [Tag]
    imageUrl: String
    borrower: User
  }

  type User {
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

  # type AuthPayload {
  # }

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

  type Query {
    user(id: ID!): User
    viewer: User
    items(filter: ID): [Item]
    tags: [Tag]
  }

  type Mutation {
    addItem(item: NewItemInput!): Item
  }
`
