import { initState } from '../core/observer.js'

export const transactionListState = initState({
  key: 'transactionListState',
  defaultValue: [
    {
      id: 178,
      payment_date: '2021-07-10',
      category: 'life',
      title: '더미 데이터76',
      price: -50000,
      payment: '현대카드',
    },
    {
      id: 179,
      payment_date: '2021-07-11',
      category: 'health',
      title: '더미 데이터77',
      price: -80000,
      payment: '삼성카드',
    },
    {
      id: 180,
      payment_date: '2021-07-11',
      category: 'food',
      title: '더미 데이터78',
      price: -10000,
      payment: '현금',
      is_deleted: 1,
    },
    {
      id: 181,
      payment_date: '2021-07-16',
      category: 'traffic',
      title: '더미 데이터79',
      price: -80000,
      payment: '현대카드',
    },
    {
      id: 182,
      payment_date: '2021-07-20',
      category: 'culture',
      title: '더미 데이터80',
      price: -80000,
      payment: '삼성카드',
    },
  ],
})
