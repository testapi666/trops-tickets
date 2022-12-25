const { createPool } = require('mysql')

const pool = createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  connectionLimit: 10,
  multipleStatements: process.env.DB_MUTIPLE_STATEMENTS,
})

module.exports = pool
