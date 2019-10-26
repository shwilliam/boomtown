const queryResolvers = require('./queries')
const mutationResolvers = require('./mutations')
const relationResolvers = require('./relational')

module.exports = app => {
  return {
    Query: queryResolvers(app),
    Mutation: mutationResolvers(app),
    ...relationResolvers,
  }
}
