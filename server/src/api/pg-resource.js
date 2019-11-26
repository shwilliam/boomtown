module.exports = postgres => ({
  createUser: async ({fullname, email, password}) => {
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

  getUserAndPasswordForVerification: async email => {
    const findUserQuery = {
      text: 'SELECT * FROM users WHERE email=$1',
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

  getUserById: async id => {
    const findUserQuery = {
      text: 'SELECT * FROM users WHERE id=$1',
      values: [id],
    }

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

  getItems: async idToOmit => {
    const items = await postgres.query({
      text: `SELECT * FROM items ${
        idToOmit ? 'WHERE owner_id != $1' : ''
      }`,
      values: idToOmit ? [idToOmit] : [],
    })

    return items.rows
  },

  getItemsForUser: async id => {
    const items = await postgres.query({
      text: `SELECT * FROM items WHERE owner_id=$1`,
      values: [id],
    })
    return items.rows
  },

  getBorrowedItemsForUser: async id => {
    const items = await postgres.query({
      text: `SELECT * FROM items WHERE borrower_id=$1`,
      values: [id],
    })
    return items.rows
  },

  getTags: async () => {
    const tags = await postgres.query({
      text: `SELECT * FROM tags`,
    })
    return tags.rows
  },

  getTagsForItem: async id => {
    const tagsQuery = {
      text: `SELECT * FROM item_tags INNER JOIN tags ON item_tags.tag_id=tags.id WHERE item_id=$1`,
      values: [id],
    }

    const tags = await postgres.query(tagsQuery)
    return tags.rows
  },

  saveNewItem: async ({item, user}) => {
    return new Promise((resolve, reject) => {
      postgres.connect((err, client, done) => {
        try {
          client.query('BEGIN', async err => {
            const {title, description, tags, image_url} = item
            const userId = user && user.id

            let newItem
            try {
              const queryResult = await postgres.query({
                text:
                  'INSERT INTO items ("title", "desc", "owner_id", "image_url") VALUES ($1, $2, $3, $4) RETURNING *',
                values: [title, description, userId, image_url],
              })
              newItem = queryResult.rows[0]
              if (!newItem) throw 'Error adding new item'
              const newItemId = newItem.id

              if (Array.isArray(tags) && tags.length) {
                await postgres.query({
                  text:
                    tags
                      .reduce(
                        (acc, val) =>
                          `${acc}(${newItemId}, $${val}),`,
                        'INSERT INTO item_tags ("item_id", "tag_id") VALUES ',
                      )
                      .slice(0, -1) + ';',
                  values: tags,
                })
              }
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
        }
      })
    })
  },

  borrowItem: async ({item, user}) => {
    // FIXME: userId null value
    const userId = user && user.id

    const queryResult = await postgres.query({
      text: 'SELECT * FROM items WHERE id=$1',
      values: [item],
    })
    const itemData = queryResult.rows[0]

    if (!itemData) return -1 // item not found
    if (itemData.borrower_id) return 0 // item already borrowed

    await postgres.query({
      text: 'UPDATE items SET borrower_id=$1 WHERE id=$2',
      values: [userId, item],
    })

    return item
  },

  returnItem: async ({item}) => {
    const queryResult = await postgres.query({
      text: 'SELECT * FROM items WHERE id=$1',
      values: [item],
    })
    const itemData = queryResult.rows[0]

    if (!itemData) return -1 // item not found

    await postgres.query({
      text: 'UPDATE items SET borrower_id=null WHERE id=$1',
      values: [item],
    })

    return item
  },
})
