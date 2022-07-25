import TransactionHistory from '../models/transactionHistory.js'

const TransactionService = {
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
}

export { TransactionService }
