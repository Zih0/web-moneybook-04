import { TransactionService } from '../services/transactionHistory.js'

const getTransactionHistory = async (req, res) => {
  const { year, month } = req.query

  const data = await TransactionService.getTransactionList(year, month)

  res.status(200).send({ data })
}

const getCategoryExpenseDetailTransactionList = async (req, res) => {
  const { year, month, category } = req.query

  const data = await TransactionService.getCategoryExpenseTransactionList(year, month, category)

  res.status(200).send({ data })
}

const getExpenseTransactionHistory = async (req, res) => {
  const { year, month } = req.query

  const data = await TransactionService.getExpenseTransactionList(year, month)

  res.status(200).send({ data })
}

const getSixMonthCategoryExpenseTransactionHistory = async (req, res) => {
  const { year, month, category } = req.query

  const data = await TransactionService.getSixMonthCategoryExpenseTransactionList(
    year,
    month,
    category,
  )

  res.status(200).send({ data })
}

const createTransaction = async (req, res) => {
  const data = await TransactionService.createTransaction(req.body)
  res.status(200).send({ data })
}

const updateTransaction = async (req, res) => {
  const { id } = req.params
  await TransactionService.updateTransaction(id, req.body)
  res.status(200).send()
}

export {
  getTransactionHistory,
  getExpenseTransactionHistory,
  getCategoryExpenseDetailTransactionList,
  getSixMonthCategoryExpenseTransactionHistory,
  createTransaction,
  updateTransaction,
}
