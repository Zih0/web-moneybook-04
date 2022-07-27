import { initState } from '../core/observer.js'

const now = new Date() // 현재 날짜 및 시간
const year = now.getFullYear()
const month = now.getMonth() + 1

export const dateState = initState({
  key: 'dateState',
  defaultValue: {
    year,
    month,
  },
})
