const priceToString = (price) => {
  return Number(price).toLocaleString()
}

const fillZero = (number) => {
  return number < 10 ? `0${number}` : number
}

export { priceToString, fillZero }
