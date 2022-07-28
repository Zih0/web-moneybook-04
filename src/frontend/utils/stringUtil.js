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

const replaceDateDash = (number) => {
  return number
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, '$1-$2-$3')
    .replace(/\-{1,2}$/g, '')
}

export { priceToString, fillZero, todayDate, replaceDateDash }
