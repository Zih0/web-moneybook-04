import { initState } from '../core/observer.js'

export const expenseTransactionListState = initState({
  key: 'expenseTransactionListState',
  defaultValue: [],
})

export const selectedCategoryState = initState({
  key: 'chart/selectedCategoryState',
  defaultValue: '',
})

export const sixMonthTrendState = initState({
  key: 'chart/sixMonthTrendState',
  defaultValue: {},
})
