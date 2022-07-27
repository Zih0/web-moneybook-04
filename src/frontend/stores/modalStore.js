import { initState } from '../core/observer.js'

export const addPaymentModalOpenState = initState({
  key: 'addPaymentModalOpenState',
  defaultValue: false,
})

export const removePaymentModalOpenState = initState({
  key: 'removePaymentModalOpenState',
  defaultValue: false,
})

export const selectedPaymentState = initState({
  key: 'selectedPaymentState',
  defaultValue: '현대카드',
})
