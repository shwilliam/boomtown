# Boomtown

> Full-stack site for a local sharing economy

## Development

### Server

1. Ensure you have a PostgreSQL database up and running with the appropriate config variables set through environment variables or by modifying `server/src/apollo.js`
2. Execute the SQL statements found in `server/init.sql` to set up the necessary DB tables
3. Install npm dependencies (`cd server && npm i`)
4. Start local development server (`npm run dev`)
