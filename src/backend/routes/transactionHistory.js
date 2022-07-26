import express from 'express'
import {
  getExpenseTransactionHistory,
  getTransactionHistory,
} from '../controllers/transactionHistory.js'

const transactionRouter = express.Router()

transactionRouter.get('/', getTransactionHistory)
transactionRouter.get('/category', getExpenseTransactionHistory)

export { transactionRouter }
