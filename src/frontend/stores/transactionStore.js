import { initState } from '../core/observer.js'

export const transactionListState = initState({
  key: 'transactionListState',
  defaultValue: [
    {
      id: 1,
      payment_date: '2022-07-09T15:00:00.000Z',
      category: 'food',
      title: '점심 식사',
      payment: '국민카드',
      price: -12000,
      created_at: '2022-07-21T02:14:28.000Z',
    },
    {
      id: 2,
      payment_date: '2022-07-10T15:00:00.000Z',
      category: 'food',
      title: '점심 식사',
      payment: '국민카드',
      price: -12000,
      created_at: '2022-07-21T02:14:28.000Z',
    },
    {
      id: 3,
      payment_date: '2022-07-11T15:00:00.000Z',
      category: 'food',
      title: '점심 식사',
      payment: '국민카드',
      price: -12000,
      created_at: '2022-07-21T02:14:28.000Z',
    },
    {
      id: 4,
      payment_date: '2022-07-11T15:00:00.000Z',
      category: 'food',
      title: '점심 식사',
      payment: '국민카드',
      price: 12000,
      created_at: '2022-07-21T02:14:28.000Z',
    },
  ],
})
