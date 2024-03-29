# Boomtown

> Full-stack site for a local sharing economy

## Development

### Server

1. Ensure you have a PostgreSQL database up and running with the appropriate config variables set through environment variables or by modifying `server/src/apollo.js`
2. Execute the SQL statements found in `server/init.sql` to set up the necessary DB tables
3. Install npm dependencies (`cd server && npm i`)
4. Start local development server (`npm run dev`)

Tests can be run with the npm script `test` and started in watch mode with `npm run test:watch`, running only the tests thet reference the part of the codebase you change.

### Client

1. Ensure required environment variables are set (see `client/.env.example`)
2. Install npm dependencies (`cd client && npm i`)
3. Start local development server (`npm start`)
