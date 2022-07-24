import { TransactionService } from '../services/transactionHistory.js'

const getTransactionHistory = async (req, res) => {
  const { year, month } = req.query

  const data = await TransactionService.getTransactionList(year, month)

  res.status(200).send({ data })
}

export { getTransactionHistory }
