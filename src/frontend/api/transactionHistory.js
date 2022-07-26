import fetcher from '../utils/fetcher.js'

const getTransactionHistoryList = async (year, month) => {
  const { data } = await fetcher.get(`/transaction?year=${year}&month=${month}`)

  return data ?? []
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

export { getTransactionHistoryList, getExpenseTransactionHistoryList, getCategorySixMonthTrend }
