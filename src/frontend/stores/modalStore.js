import { initState } from '../core/observer.js'

export const addPaymentModalOpenState = initState({
  key: 'addPaymentModalOpenState',
  defaultValue: true,
})

export const removePaymentModalOpenState = initState({
  key: 'removePaymentModalOpenState',
  defaultValue: true,
})

export const selectedPaymentState = initState({
  key: 'selectedPaymentState',
  defaultValue: '현대카드',
})
