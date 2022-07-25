import { initState } from '../core/observer.js'

export const dateState = initState({
  key: 'dateState',
  defaultValue: {
    year: 2021,
    month: 6,
  },
})
