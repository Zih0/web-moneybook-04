import Payment from '../models/payment.js'

const PaymentService = {
  getPayment: async () => {
    const response = await Payment.findAll({
      attributes: ['id', 'name'],
      where: {
        is_deleted: 0,
      },
    })

    return response
  },
  createPayment: async (paymentName) => {
    const response = await Payment.create({
      name: paymentName,
    })

    return response
  },
  deletePayment: async (paymentId) => {
    const response = await Payment.update(
      {
        is_deleted: 1,
      },
      {
        where: {
          id: paymentId,
        },
      },
    )

    return response
  },
}

export { PaymentService }
