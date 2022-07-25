import express from 'express'
import { getTransactionHistory } from '../controllers/transactionHistory.js'

const transactionRouter = express.Router()

transactionRouter.get('/', getTransactionHistory)

export { transactionRouter }
