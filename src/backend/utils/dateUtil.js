const fillZero = (number) => {
  return number < 10 ? `0${number}` : number
}

const getMonthsObject = (year, month) => {
  if (typeof year === 'string') {
    year = Number(year)
  }
  if (typeof month === 'string') {
    month = Number(month)
  }

  if (month <= 6) {
    const monthsObject = {}
    const lastYearCount = 7 - month

    new Array(lastYearCount).fill(null).forEach((_, idx) => {
      monthsObject[`${year - 1}-${12 - lastYearCount + idx + 1}`] = 0
    })

    new Array(12 - lastYearCount).fill(null).forEach((_, idx) => {
      monthsObject[`${year}-${idx + 1}`] = 0
    })

    return monthsObject
  } else {
    const rightMonthsCount = 5
    if (month + rightMonthsCount > 12) {
      const monthsObject = {}

      new Array(24 - (month + rightMonthsCount)).fill(null).forEach((_, idx) => {
        monthsObject[`${year}-${month - 6 + idx}`] = 0
      })

      new Array(month + rightMonthsCount - 12).fill(null).forEach((_, idx) => {
        monthsObject[`${year + 1}-${idx + 1}`] = 0
      })

      return monthsObject
    }

    return new Array(12).fill(null).reduce((monthsObject, cur, idx) => {
      monthsObject[`${year}-${month - 6 + idx}`] = 0
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
