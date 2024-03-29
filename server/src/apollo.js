const {ApolloServer} = require('apollo-server-express')
const {makeExecutableSchema} = require('graphql-tools')
const jwt = require('jsonwebtoken')

const typeDefs = require('./api/schema')
const {AuthDirective} = require('./api/custom-directives')
let resolvers = require('./api/resolvers')

module.exports = ({app, pgResource}) => {
  resolvers = resolvers(app)

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    schemaDirectives: {
      auth: AuthDirective,
    },
  })

  const apolloServer = new ApolloServer({
    context: ({req}) => {
      const tokenName = app.get('JWT_COOKIE_NAME')
      let token = req ? req.cookies[tokenName] : undefined
      let user

      // HACK: use token in playground
      // if (process.env.NODE_ENV === 'development')
      //   token = req.headers.token

      if (token) user = jwt.decode(token, app.get('JWT_SECRET'))

      return {user, token, pgResource, req}
    },
    schema,
  })

  apolloServer.applyMiddleware({
    app,
    cors: app.get('CORS_CONFIG'),
  })
}
