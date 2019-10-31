const {ApolloError} = require('apollo-server')

module.exports = app => ({
  viewer: (_, args, {user}) => {
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

  tags: async (_, args, {pgResource}) => {
    try {
      const tags = await pgResource.getTags()
      return tags
    } catch (e) {
      throw new ApolloError(e)
    }
  },
})
