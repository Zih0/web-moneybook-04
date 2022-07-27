import { PaymentService } from '../services/payment.js'

const createPayment = async (req, res) => {
  const { name } = req.body
  const data = await PaymentService.createPayment(name)

  res.status(200).send({
    data: {
      id: data.insertId,
    },
  })
}

export { createPayment }
