import { initState } from '../core/observer.js'

export const transactionListState = initState({
  key: 'transactionListState',
  defaultValue: [],
})

export const paymentListState = initState({
  key: 'paymentListState',
  defaultValue: [],
})
