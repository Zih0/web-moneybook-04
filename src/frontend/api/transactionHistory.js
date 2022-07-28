import fetcher from '../utils/fetcher.js'
import { sortTransaction } from '../utils/transactionUtil.js'

const getTransactionHistoryList = async (year, month) => {
  const { data } = await fetcher.get(`/transaction?year=${year}&month=${month}`)
  const sortData = sortTransaction(data)

  return sortData ?? []
}

const getExpenseTransactionHistoryList = async (year, month) => {
  const { data } = await fetcher.get(`/transaction/category?year=${year}&month=${month}`)

  return data ?? []
}

const getCategorySixMonthTrend = async (year, month, category) => {
  const { data } = await fetcher.get(
    `/transaction/category/six-month?year=${year}&month=${month}&category=${category}`,
  )

  return data ?? {}
}

const createTransactionAPI = async (body) => {
  const { data } = await fetcher.post('/transaction', body)

  return data
}

const updateTransactionAPI = async (id, body) => {
  await fetcher.put(`/transaction/${id}`, body)
}

export {
  getTransactionHistoryList,
  getExpenseTransactionHistoryList,
  getCategorySixMonthTrend,
  createTransactionAPI,
  updateTransactionAPI,
}
