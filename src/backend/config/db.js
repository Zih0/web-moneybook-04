import { Zihorm } from 'zihorm'

import dotenv from 'dotenv'
dotenv.config()

const zihorm = new Zihorm(
  process.env.MYSQL_HOST,
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PW,
)

export default zihorm
