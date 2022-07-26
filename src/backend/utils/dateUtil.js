const fillZero = (number) => {
  return number < 10 ? `0${number}` : number
}

const getSixMonthObject = (year, month) => {
  if (month >= 6) {
    return new Array(6).fill(null).reduce((sixMonthObject, cur, idx) => {
      sixMonthObject[`${year}-${fillZero(month - 5 + idx)}`] = 0
      return sixMonthObject
    }, {})
  } else {
    const sixMonthObject = {}
    const lastYearCount = 6 - month

    new Array(lastYearCount).fill(null).forEach((_, idx) => {
      sixMonthObject[`${year - 1}-${fillZero(12 - lastYearCount + idx)}`] = 0
    })

    new Array(month).fill(null).forEach((_, idx) => {
      sixMonthObject[`${year}-${fillZero(idx + 1)}`] = 0
    })
    return sixMonthObject
  }
}

const getBeforeSixMonthDate = (year, month) => {
  const ADD_MONTH = 7
  const MINUS_MONTH = 5
  if (month <= 5) {
    return [year - 1, month + ADD_MONTH]
  } else {
    return [year, month - MINUS_MONTH]
  }
}

export { getSixMonthObject, getBeforeSixMonthDate, fillZero }
