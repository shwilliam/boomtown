const {Kind} = require('graphql/language')
const {GraphQLScalarType} = require('graphql')

const DateScalar = new GraphQLScalarType({
  name: 'Date',
  serialize(d) {
    return d instanceof Date ? d.getTime() : null
  },
  parseValue(d) {
    try {
      return new Date(d)
    } catch (error) {
      return null
    }
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10))
    } else if (ast.kind === Kind.STRING) {
      return this.parseValue(ast.value)
    } else {
      return null
    }
  },
})

module.exports = {
  DateScalar,
}
