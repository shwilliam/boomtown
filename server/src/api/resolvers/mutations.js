const {createWriteStream} = require('fs')
const path = require('path')
const {
  AuthenticationError,
  ApolloError,
} = require('apollo-server-express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {setCookie} = require('../../utils/setCookie')

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
      if (!user) throw 'User was not found'
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
    try {
      const user = jwt.decode(token, app.get('JWT_SECRET'))
      let imageUrl

      if (item.image) {
        const {createReadStream, filename} = await item.image
          .variables.file

        await new Promise(res =>
          createReadStream()
            .pipe(
              createWriteStream(
                path.join(__dirname, '../../../uploads', filename),
              ),
            )
            .on('close', res),
        )

        imageUrl = filename
      }

      const newItem = await pgResource.saveNewItem({
        item: {...item, image_url: imageUrl},
        user,
      })
      return newItem
    } catch (e) {
      throw new ApolloError(e)
    }
  },

  borrowItem: async (_, {item}, {token, pgResource}) => {
    try {
      const user = jwt.decode(token, app.get('JWT_SECRET'))
      const borrowedItem = await pgResource.borrowItem({
        item,
        user,
      })
      return borrowedItem
    } catch (e) {
      throw new ApolloError(e)
    }
  },

  returnItem: async (_, {item}, {token, pgResource}) => {
    try {
      const user = jwt.decode(token, app.get('JWT_SECRET'))
      const returnedItem = await pgResource.returnItem({
        item,
        user,
      })
      return returnedItem
    } catch (e) {
      throw new ApolloError(e)
    }
  },

  updateBio: async (_, {bio}, {token, pgResource}) => {
    const user = jwt.decode(token, app.get('JWT_SECRET'))
    await pgResource.updateBio({
      bio,
      user,
    })
    return user.id
  },
})
