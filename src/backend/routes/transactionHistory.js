import express from 'express'
import {
  getCategoryExpenseDetailTransactionList,
  getExpenseTransactionHistory,
  getTransactionHistory,
} from '../controllers/transactionHistory.js'

const transactionRouter = express.Router()

transactionRouter.get('/', getTransactionHistory)
transactionRouter.get('/category', getExpenseTransactionHistory)

transactionRouter.get('/category/detail', getCategoryExpenseDetailTransactionList)

export { transactionRouter }
