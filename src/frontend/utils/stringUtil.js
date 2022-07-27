const priceToString = (price) => {
  return Number(price).toLocaleString()
}

const todayDate = () => {
  const leftPad = (value) => {
    if (value >= 10) {
      return value
    }

    return `0${value}`
  }

  const date = new Date()
  const year = date.getFullYear()
  const month = leftPad(date.getMonth() + 1)
  const day = leftPad(date.getDate())

  return [year, month, day].join('-')
}

export { priceToString, todayDate }
