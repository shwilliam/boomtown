const {ApolloError} = require('apollo-server')

module.exports = {
  User: {
    async items(parent, {id}, {pgResource}, info) {
      try {
        const items = await pgResource.getItemsForUser(id)
        return items
      } catch (e) {
        throw new ApolloError(e)
      }
    },
    async borrowed(parent, {id}, {pgResource}, info) {
      try {
        const items = await pgResource.getBorrowedItemsForUser(id)
        return items
      } catch (e) {
        throw new ApolloError(e)
      }
    },
  },

  Item: {
    async owner(parent, {id}, {pgResource}, info) {
      try {
        const user = await pgResource.getUserById(id)
        return user
      } catch (e) {
        throw new ApolloError(e)
      }
    },
    async tags(parent, {id}, {pgResource}, info) {
      try {
        const tags = await pgResource.getTagsForItem(id)
        return tags
      } catch (e) {
        throw new ApolloError(e)
      }
    },
    async borrower(parent, {id}, {pgResource}, info) {
      try {
        const user = await pgResource.getUserById(id)
        return user
      } catch (e) {
        throw new ApolloError(e)
      }
    },
  },
}
