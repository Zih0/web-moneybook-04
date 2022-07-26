const getMonthData = ({ year, month }) => {
  // 일주일
  const WEEK_LENGTH = 7

  const startDay = new Date(year, month - 1).getDay()
  const endDate = new Date(year, month, 0).getDate()

  // 첫째주 0 처리, 날짜 넣기
  const monthArr = new Array(endDate + startDay)
    .fill(null)
    .map((_, idx) => (idx < startDay ? 0 : idx - startDay + 1))

  // 마지막 주 0 처리
  if (monthArr.length % WEEK_LENGTH) {
    monthArr.push(...new Array(WEEK_LENGTH - (monthArr.length % WEEK_LENGTH)).fill(0))
  }

  // 일주일 단위로 묶기
  const monthData = monthArr.reduce((weekArr, date, idx) => {
    if (idx % WEEK_LENGTH === 0) {
      return [...weekArr, [date]]
    }

    weekArr[Math.floor(idx / WEEK_LENGTH)].push(date)
    return [...weekArr]
  }, [])

  return monthData
}

const isToday = ({ year, month, date }) => {
  const dateObj = new Date()

  const todayYear = dateObj.getFullYear()
  const todayMonth = dateObj.getMonth() + 1
  const todayDate = dateObj.getDate()

  if (todayYear === year && todayMonth === month && todayDate === date) return true

  return false
}

export { getMonthData, isToday }
