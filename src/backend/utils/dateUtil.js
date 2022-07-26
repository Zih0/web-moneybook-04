const fillZero = (number) => {
  return number < 10 ? `0${number}` : number
}

const getMonthsObject = (year, month) => {
  if (month <= 6) {
    const monthsObject = {}
    const lastYearCount = 7 - month

    new Array(lastYearCount).fill(null).forEach((_, idx) => {
      monthsObject[`${year - 1}-${fillZero(12 - lastYearCount + idx + 1)}`] = 0
    })

    new Array(12 - lastYearCount).fill(null).forEach((_, idx) => {
      monthsObject[`${year}-${fillZero(idx + 1)}`] = 0
    })

    return monthsObject
  } else {
    return new Array(12).fill(null).reduce((monthsObject, cur, idx) => {
      monthsObject[`${year}-${fillZero(month - 6 + idx)}`] = 0
      return monthsObject
    }, {})
  }
}

const getBeforeSixMonthDate = (year, month) => {
  const ADD_MONTH = 6
  const MINUS_MONTH = 6
  if (month <= 6) {
    return [year - 1, month + ADD_MONTH]
  } else {
    return [year, month - MINUS_MONTH]
  }
}

export { getMonthsObject, getBeforeSixMonthDate, fillZero }
