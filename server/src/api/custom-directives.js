const {defaultFieldResolver} = require('graphql')
const {ForbiddenError} = require('apollo-server-express')
const {SchemaDirectiveVisitor} = require('graphql-tools')

class AuthDirective extends SchemaDirectiveVisitor {
  visitObject(type) {
    this.ensureFieldsWrapped(type)
  }
  visitFieldDefinition(field, details) {
    this.ensureFieldsWrapped(details.objectType)
  }

  ensureFieldsWrapped(objectType) {
    // avoid re-wrapping
    if (objectType._authFieldsWrapped) return
    objectType._authFieldsWrapped = true

    const fields = objectType.getFields()

    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName]
      const {resolve = defaultFieldResolver} = field
      field.resolve = async function(
        parent,
        args,
        {req, token},
        info,
      ) {
        if (
          !token &&
          !['login', 'signup'].includes(req.body.operationName)
        )
          throw new ForbiddenError('No authentication token found')

        return resolve.apply(this, [parent, args, {req, token}, info])
      }
    })
  }
}

module.exports = {AuthDirective}
