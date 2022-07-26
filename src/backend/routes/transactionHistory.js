import express from 'express'
import {
  getCategoryExpenseDetailTransactionList,
  getTransactionHistory,
} from '../controllers/transactionHistory.js'

const transactionRouter = express.Router()

transactionRouter.get('/', getTransactionHistory)

transactionRouter.get('/category/detail', getCategoryExpenseDetailTransactionList)

export { transactionRouter }
