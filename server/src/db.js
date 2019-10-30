const {Pool} = require('pg')

module.exports = app =>
  new Pool({
    host: app.get('PG_HOST'),
    user: app.get('PG_USER'),
    database: app.get('PG_DB'),
    password: app.get('PG_PASSWORD'),
    port: app.get('PG_PORT'),
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  })
