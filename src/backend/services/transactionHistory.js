import { Op } from 'zihorm'
import zihorm from '../config/db.js'
import TransactionHistory from '../models/transactionHistory.js'
import { getBeforeSixMonthDate, fillZero, getMonthsObject } from '../utils/dateUtil.js'

const TransactionService = {
  // 메인, 달력 페이지를 위한 get 요청, 수입,지출 거래 내역
  async getTransactionList(year, month) {
    const response = await TransactionHistory.findAll({
      attributes: [
        'transaction_history.id',
        'payment_date',
        'category',
        'title',
        'price',
        'payment_id',
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
  async getExpenseTransactionList(year, month) {
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
  async getCategoryExpenseTransactionList(year, month, category) {
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

  // 라인차트를 위한 get 요청, 최근 6개월 데이터
  async getSixMonthCategoryExpenseTransactionList(year, month, category) {
    const [startYear, startMonth] = getBeforeSixMonthDate(year, month)

    const endDate = new Date(year, month, 0).getDate()

    const [sixMonthExpenseData] = await zihorm.query(
      `SELECT YEAR(payment_date) as year, MONTH(payment_date) as month, ABS(SUM(price)) as price
       FROM transaction_history 
       WHERE category="${category}" AND 
       payment_date BETWEEN "${startYear}-${fillZero(
        startMonth,
      )}-01" AND "${year}-${month}-${endDate}" 
       GROUP BY YEAR(payment_date) ,MONTH(payment_date)
       ORDER BY YEAR(payment_date) ,MONTH(payment_date) 
      `,
    )

    const monthsData = getMonthsObject(Number(year), Number(month))

    sixMonthExpenseData.forEach((data) => {
      const { year, month, price } = data
      monthsData[`${year}-${Number(month)}`] = price
    })

    return monthsData
  },

  async createTransaction(data) {
    const { paymentDate, category, title, payment_id, price } = data
    const response = await TransactionHistory.create({
      payment_date: paymentDate,
      category,
      title,
      payment_id,
      price,
    })

    return response
  },
  async updateTransaction(id, data) {
    await TransactionHistory.update(data, {
      where: {
        id,
      },
    })
  },
}

export { TransactionService }
