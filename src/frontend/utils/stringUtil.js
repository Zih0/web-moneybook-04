const priceToString = (price) => {
  return Number(price).toLocaleString()
}

const todayDate = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = fillZero(date.getMonth() + 1)
  const day = fillZero(date.getDate())

  return [year, month, day].join('-')
}

const fillZero = (number) => {
  return number < 10 ? `0${number}` : number
}

export { priceToString, fillZero, todayDate }
