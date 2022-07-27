import { PaymentService } from '../services/payment.js'

const getPayment = async (req, res) => {
  const data = await PaymentService.getPayment()

  res.status(200).send({
    data,
  })
}

const createPayment = async (req, res) => {
  const { name } = req.body
  const data = await PaymentService.createPayment(name)

  res.status(200).send({
    data: {
      id: data.insertId,
    },
  })
}

const deletePayment = async (req, res) => {
  const { id } = req.params
  const data = await PaymentService.deletePayment(id)

  res.status(200).send()
}

export { getPayment, createPayment, deletePayment }
