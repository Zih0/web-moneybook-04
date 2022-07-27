import Payment from '../models/payment.js'

const PaymentService = {
  createPayment: async (paymentName) => {
    const response = await Payment.create({
      name: paymentName,
    })

    return response
  },
}

export { PaymentService }
