import express from 'express'
import { getTransaction } from '../controllers/transaction.js'

const transactionRouter = express.Router()

transactionRouter.get('/', getTransaction)

export { transactionRouter }
