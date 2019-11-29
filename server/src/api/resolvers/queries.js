const {AuthenticationError, ApolloError} = require('apollo-server')
const jwt = require('jsonwebtoken')
const {setCookie} = require('../../utils/setCookie')

module.exports = app => ({
  viewer: async (_, __, {token, pgResource, req}) => {
    try {
      let user = jwt.decode(token, app.get('JWT_SECRET'))
      user = await pgResource.getUserById(user.id)

      setCookie({
        tokenName: app.get('JWT_COOKIE_NAME'),
        token,
        res: req.res,
      })

      return user
    } catch (e) {
      throw new AuthenticationError(e)
    }
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
