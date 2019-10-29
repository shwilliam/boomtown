const express = require('express')
const initServer = require('./server')
const initDB = require('./db')
const initApollo = require('./apollo')

const app = express()
const PORT = initServer(app)
const db = initDB(app)
const pgResource = require('./api/pg-resource')(db)

initApollo({app, pgResource})

const server = app.listen(PORT, () => {
  console.log(`>> Listening on port ${PORT}`)
  if (process.env.NODE_ENV === 'development')
    console.log(
      `>> GQL playground at http://localhost:${PORT}/graphql`,
    )
})

server.on('error', console.error)
