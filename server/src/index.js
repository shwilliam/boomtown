const express = require('express')
const initServer = require('./server')

const app = express()
const PORT = initServer(app)

const server = app.listen(PORT, () =>
  console.log(`>> Listening on port ${PORT}`),
)

server.on('error', console.error)
