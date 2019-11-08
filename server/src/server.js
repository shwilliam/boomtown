const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')
const fallback = require('express-history-api-fallback')
const path = require('path')

module.exports = app => {
  const PORT = process.env.PORT || 8080

  app.set('PG_HOST', process.env.pg_host || 'localhost')
  app.set('PG_USER', process.env.pg_user || 'shwilliam')
  app.set('PG_PASSWORD', process.env.pg_password || '')
  app.set('PG_DB', process.env.pg_db || 'postgres')
  app.set('PG_PORT', process.env.pg_port || '5432')

  app.set('JWT_SECRET', 'shhh')
  app.set('JWT_COOKIE_NAME', 'monster')

  app.use(cookieParser())

  if (process.env.NODE_ENV === 'production') {
    const root = path.resolve(__dirname, '../public')

    app.use(express.static(root))
    app.use(fallback('index.html', {root}))
  }

  if (process.env.NODE_ENV === 'development') {
    const corsConfig = {
      origin: 'http://localhost:3000',
      credentials: true,
    }
    app.set('CORS_CONFIG', corsConfig)
    app.use(cors(corsConfig))
  }

  return PORT
}
