module.exports = postgres => ({
  async createUser({fullname, email, password}) {
    const newUserInsert = {
      text:
        'INSERT INTO users(fullname, email, password) VALUES($1, $2, $3) RETURNING *',
      values: [fullname, email, password],
    }
    try {
      const user = await postgres.query(newUserInsert)
      return user.rows[0]
    } catch (e) {
      switch (true) {
        case /users_fullname_key/.test(e.message):
          throw 'An account with this username already exists'
        case /users_email_key/.test(e.message):
          throw 'An account with this email already exists'
        default:
          throw 'There was a problem creating your account'
      }
    }
  },
  async getUserAndPasswordForVerification(email) {
    const findUserQuery = {
      text: 'SELECT * FROM public.users WHERE email=$1',
      values: [email],
    }
    try {
      const user = await postgres.query(findUserQuery)
      if (!user) throw 'User was not found'
      return user.rows[0]
    } catch (e) {
      throw e
    }
  },
  async getUserById(id) {
    const findUserQuery = {
      text: 'SELECT * FROM public.users WHERE id=$1',
      values: [id],
    }

    // TODO: handle e w query 500
    try {
      const results = await postgres.query(findUserQuery)
      const user = results.rows[0]

      if (!user) throw 'User not found'

      const {id, email, fullname} = user
      return {id, email, fullname}
    } catch (e) {
      throw e
    }
  },

  async getItems(idToOmit) {
    const items = await postgres.query({
      text: `SELECT * FROM public.items ${
        idToOmit ? 'WHERE owner_id != $1' : ''
      }`,
      values: idToOmit ? [idToOmit] : [],
    })

    return items.rows
  },
  async getItemsForUser(id) {
    const items = await postgres.query({
      text: `SELECT * FROM public.items WHERE owner_id=$1`,
      values: [id],
    })
    return items.rows
  },
  async getBorrowedItemsForUser(id) {
    const items = await postgres.query({
      text: `SELECT * FROM public.items WHERE borrower_id=$1`,
      values: [id],
    })
    return items.rows
  },
  async getTags() {
    const tags = await postgres.query({
      text: `SELECT * FROM public.tags`,
    })
    return tags.rows
  },
  async getTagsForItem(id) {
    const tagsQuery = {
      text: `SELECT * FROM public.item_tags INNER JOIN public.tags ON public.item_tags.tag_id=public.tags.id WHERE item_id=$1`,
      values: [id],
    }

    const tags = await postgres.query(tagsQuery)
    return tags.rows
  },
  async saveNewItem({item, user}) {
    return new Promise((resolve, reject) => {
      postgres.connect((err, client, done) => {
        try {
          client.query('BEGIN', async err => {
            const {title, description, tags} = item
            const userId = user && user.id

            const newItemQuery = {
              text:
                'INSERT INTO public.items ("title", "desc", "owner_id") VALUES ($1, $2, $3) RETURNING *',
              values: [title, description, userId],
            }

            let newItem
            try {
              const queryResult = await postgres.query(newItemQuery)
              const newItem = queryResult.rows[0]
              if (!newItem) throw 'Error adding new item'
              const newItemId = newItem.id
              // TODO: generate tag relationships query
              // TODO: insert tags
            } catch (e) {
              throw e
            }

            client.query('COMMIT', e => {
              if (e) throw e
              done()
              resolve(newItem)
            })
          })
        } catch (e) {
          client.query('ROLLBACK', e => {
            if (e) throw e
            done()
          })
          switch (true) {
            default:
              throw e
          }
        }
      })
    })
  },
})
