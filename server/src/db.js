const {Pool} = require('pg')

module.exports = app =>
  new Pool({
    host: app.get('pg_host'),
    user: app.get('pg_user'),
    database: app.get('pg_db'),
    password: app.get('pg_password'),
    port: app.get('pg_port'),
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  })
