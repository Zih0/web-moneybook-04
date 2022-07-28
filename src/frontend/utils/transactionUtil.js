const classifyTransactionDataByDate = (transactionDataList) => {
  const newData = {}
  transactionDataList.forEach((transactionData) => {
    if (newData[transactionData.payment_date]) {
      newData[transactionData.payment_date].push(transactionData)
    } else {
      newData[transactionData.payment_date] = [transactionData]
    }
  })

  return newData
}

const calculateTransaction = (transactionDataList) => {
  const income = transactionDataList.reduce((acc, cur) => {
    if (cur.price > 0) return acc + cur.price
    return acc
  }, 0)

  const expense = Math.abs(
    transactionDataList.reduce((acc, cur) => {
      if (cur.price < 0) return acc + cur.price
      return acc
    }, 0),
  )

  return [income, expense]
}

const sortTransaction = (data) => {
  return data.sort((a, b) => new Date(b.payment_date) - new Date(a.payment_date))
}

export { classifyTransactionDataByDate, calculateTransaction, sortTransaction }
