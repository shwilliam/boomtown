const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')
const fallback = require('express-history-api-fallback')
const path = require('path')

module.exports = app => {
  const PORT = process.env.PORT || 8080

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
