import express from 'express'
import {
  getCategoryExpenseDetailTransactionList,
  getExpenseTransactionHistory,
  getTransactionHistory,
  getSixMonthCategoryExpenseTransactionHistory,
  createTransaction,
  updateTransaction,
} from '../controllers/transactionHistory.js'

const transactionRouter = express.Router()

transactionRouter.get('/', getTransactionHistory)
transactionRouter.get('/category', getExpenseTransactionHistory)
transactionRouter.get('/category/six-month', getSixMonthCategoryExpenseTransactionHistory)
transactionRouter.get('/category/detail', getCategoryExpenseDetailTransactionList)

transactionRouter.post('/', createTransaction)
transactionRouter.put('/:id', updateTransaction)

export { transactionRouter }
