const express = require('express')
const initServer = require('./server')
const initDB = require('./db')

const app = express()
const PORT = initServer(app)
const DB = initDB(app)

const server = app.listen(PORT, () =>
  console.log(`>> Listening on port ${PORT}`),
)

server.on('error', console.error)
