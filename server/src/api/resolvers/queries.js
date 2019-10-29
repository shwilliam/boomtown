const {ApolloError} = require('apollo-server')

module.exports = app => ({
  viewer(_, args, {user}) {
    return user
  },
  async user(_, {id}, {pgResource}) {
    try {
      const user = await pgResource.getUserById(id)
      return user
    } catch (e) {
      throw new ApolloError(e)
    }
  },
  async items(_, {filter}, {pgResource}) {
    try {
      const items = await pgResource.getItems(filter)
      return items
    } catch (e) {
      throw new ApolloError(e)
    }
  },
  async tags(_, args, {pgResource}) {
    try {
      const tags = await pgResource.getTags()
      return tags
    } catch (e) {
      throw new ApolloError(e)
    }
  },
})
