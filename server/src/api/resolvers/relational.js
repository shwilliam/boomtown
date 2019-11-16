const {ApolloError} = require('apollo-server')

module.exports = {
  User: {
    items: async ({id}, _, {pgResource}) => {
      try {
        const items = await pgResource.getItemsForUser(id)
        return items
      } catch (e) {
        throw new ApolloError(e)
      }
    },

    borrowed: async ({id}, _, {pgResource}) => {
      try {
        const items = await pgResource.getBorrowedItemsForUser(id)
        return items
      } catch (e) {
        throw new ApolloError(e)
      }
    },
  },

  Item: {
    owner: async ({owner_id}, _, {pgResource}) => {
      try {
        const user = await pgResource.getUserById(owner_id)
        return user
      } catch (e) {
        throw new ApolloError(e)
      }
    },

    async tags({id}, _, {pgResource}) {
      try {
        const tags = await pgResource.getTagsForItem(id)
        return tags
      } catch (e) {
        throw new ApolloError(e)
      }
    },

    async borrower({borrower_id}, _, {pgResource}) {
      if (!borrower_id) return

      try {
        const user = await pgResource.getUserById(borrower_id)
        return user
      } catch (e) {
        throw new ApolloError(e)
      }
    },
  },
}
