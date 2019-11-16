const {
  AuthenticationError,
  // TODO: throw appropriate ApolloError
  // ApolloError,
} = require('apollo-server-express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

function setCookie({tokenName, token, res}) {
  res.cookie(tokenName, token, {
    // httpOnly: true,
    secure: Boolean(process.env.NODE_ENV === 'production'),
    maxAge: 7200000, // 2 hrs
  })
}

function generateToken(user, secret) {
  return jwt.sign(user, secret, {expiresIn: '2h'})
}

module.exports = app => ({
  signup: async (
    _,
    {user: {fullname, email, password}},
    {pgResource, req},
  ) => {
    try {
      const user = await pgResource.createUser({
        fullname,
        email,
        password: bcrypt.hashSync(password, 10),
      })

      let token = generateToken(user, app.get('JWT_SECRET'))

      setCookie({
        tokenName: app.get('JWT_COOKIE_NAME'),
        token,
        res: req.res,
      })

      return {
        token,
        user,
      }
    } catch (e) {
      throw new AuthenticationError(e)
    }
  },

  login: async (_, {user: {email, password}}, {pgResource, req}) => {
    try {
      const user = await pgResource.getUserAndPasswordForVerification(
        email,
      )
      if (!user) throw 'User was not found.'
      if (!bcrypt.compareSync(password, user.password))
        throw 'Invalid Password'

      let token = generateToken(user, app.get('JWT_SECRET'))

      setCookie({
        tokenName: app.get('JWT_COOKIE_NAME'),
        token,
        res: req.res,
      })

      return {
        token,
        user,
      }
    } catch (e) {
      throw new AuthenticationError(e)
    }
  },

  logout: (_, __, context) => {
    context.req.res.clearCookie(app.get('JWT_COOKIE_NAME'))

    return true
  },

  addItem: async (_, {item}, {token, pgResource}) => {
    const user = jwt.decode(token, app.get('JWT_SECRET'))
    const newItem = await pgResource.saveNewItem({
      item,
      user,
    })
    return newItem
  },

  borrowItem: async (_, {item}, {token, pgResource}) => {
    const user = jwt.decode(token, app.get('JWT_SECRET'))
    const newItem = await pgResource.borrowItem({
      item,
      user,
    })
    return newItem
  },
})
