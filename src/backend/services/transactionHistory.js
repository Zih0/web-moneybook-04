import { Op } from 'zihorm'
import zihorm from '../config/db.js'
import TransactionHistory from '../models/transactionHistory.js'

const TransactionService = {
  // 메인, 달력 페이지를 위한 get 요청, 수입,지출 거래 내역
  getTransactionList: async (year, month) => {
    const response = await TransactionHistory.findAll({
      attributes: [
        'transaction_history.id',
        'payment_date',
        'category',
        'title',
        'price',
        'name as payment',
        'is_deleted',
      ],
      include: { fk: 'payment_id', joinPk: 'id', model: 'payment' },
      where: {
        'YEAR(payment_date)': year,
        'MONTH(payment_date)': month,
      },
    })

    // 삭제된 결제수단이면 공백처리
    response.forEach((transactionData) => {
      if (!transactionData.is_deleted) return

      transactionData.payment = ''
      delete transactionData.is_deleted
    })

    return response
  },

  // 도넛차트를 위한 get 요청, 매달 카테고리별 지출 내역
  getExpenseTransactionList: async (year, month) => {
    const response = await TransactionHistory.findAll({
      attributes: ['category', 'ABS(SUM(price)) as price'],
      where: {
        price: {
          [Op.lt]: 0,
        },
        'YEAR(payment_date)': year,
        'MONTH(payment_date)': month,
      },
      order: ['price', 'DESC'],
      groupBy: 'category',
    })

    return response
  },

  // 카테고리별 상세 지출 내역 가져오기 위한 get 요청
  getCategoryExpenseTransactionList: async (year, month, category) => {
    const response = await TransactionHistory.findAll({
      attributes: [
        'transaction_history.id',
        'payment_date',
        'category',
        'title',
        'price',
        'name as payment',
        'is_deleted',
      ],
      include: { fk: 'payment_id', joinPk: 'id', model: 'payment' },
      where: {
        'YEAR(payment_date)': year,
        'MONTH(payment_date)': month,
        category,
      },
    })

    // 삭제된 결제수단이면 공백처리
    response.forEach((transactionData) => {
      if (!transactionData.is_deleted) return

      transactionData.payment = ''
      delete transactionData.is_deleted
    })

    return response
  },
}

export { TransactionService }
