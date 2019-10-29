const {ApolloError} = require('apollo-server')

module.exports = {
  User: {
    async items({id}, _, {pgResource}) {
      try {
        const items = await pgResource.getItemsForUser(id)
        return items
      } catch (e) {
        throw new ApolloError(e)
      }
    },

    async borrowed({borrower_id}, _, {pgResource}) {
      try {
        const items = await pgResource.getBorrowedItemsForUser(
          borrower_id,
        )
        return items
      } catch (e) {
        throw new ApolloError(e)
      }
    },
  },

  Item: {
    async owner({owner_id}, _, {pgResource}) {
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
