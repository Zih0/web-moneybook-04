import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

const dbPool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PW,
  database: process.env.MYSQL_DB,
})

export default dbPool
