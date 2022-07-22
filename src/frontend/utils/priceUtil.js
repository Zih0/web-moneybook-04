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

export { calculateTransaction }
