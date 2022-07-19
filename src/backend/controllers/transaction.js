import { getTransactionService } from '../services/transaction.js'

const getTransaction = (req, res) => {
  getTransactionService().then(([data, field]) => {
    res.status(200).send({ data })
  })
}

export { getTransaction }
