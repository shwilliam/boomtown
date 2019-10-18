const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')
const fallback = require('express-history-api-fallback')
const path = require('path')

module.exports = app => {
  const PORT = process.env.PORT || 8080

  app.set('pg_host', process.env.pg_host || 'localhost')
  app.set('pg_user', process.env.pg_user || 'shwilliam')
  app.set('pg_password', process.env.pg_password || '')
  app.set('pg_db', process.env.pg_db || 'postgres')
  app.set('pg_port', process.env.pg_port || '5432')

  app.use(cookieParser())

  if (process.env.NODE_ENV === 'production') {
    const root = path.resolve(__dirname, '../../public')

    app.use(express.static(root))
    app.use(fallback('index.html', {root}))
  }

  if (process.env.NODE_ENV === 'development') {
    // allow requests from dev server
    const corsConfig = {
      origin: 'http://localhost:3000',
      credentials: true,
    }
    app.set('CORS_CONFIG', corsConfig)
    app.use(cors(corsConfig))
  }

  return PORT
}
