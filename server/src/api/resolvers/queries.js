const {ApolloError} = require('apollo-server')
const jwt = require('jsonwebtoken')

module.exports = app => ({
  viewer: async (_, __, {token, pgResource}) => {
    // TODO: refactor
    let user = jwt.decode(token, app.get('JWT_SECRET'))
    user = await pgResource.getUserById(user.id)

    return user
  },

  user: async (_, {id}, {pgResource}) => {
    try {
      const user = await pgResource.getUserById(id)
      return user
    } catch (e) {
      throw new ApolloError(e)
    }
  },

  items: async (_, {filter}, {pgResource}) => {
    try {
      const items = await pgResource.getItems(filter)
      return items
    } catch (e) {
      throw new ApolloError(e)
    }
  },

  tags: async (_, __, {pgResource}) => {
    try {
      const tags = await pgResource.getTags()
      return tags
    } catch (e) {
      throw new ApolloError(e)
    }
  },
})
