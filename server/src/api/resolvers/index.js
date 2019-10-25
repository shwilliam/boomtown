const queryResolvers = require('./queries')

module.exports = app => {
  return {
    Query: queryResolvers(app),
  }
}
