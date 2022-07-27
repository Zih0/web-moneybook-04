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

const fillZero = (number) => {
  return number < 10 ? `0${number}` : number
}

export { priceToString, fillZero, todayDate }
