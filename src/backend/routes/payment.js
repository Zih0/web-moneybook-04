import express from 'express'
import { createPayment, deletePayment, getPayment } from '../controllers/payment.js'

const paymentRouter = express.Router()

paymentRouter.get('/', getPayment)
paymentRouter.post('/', createPayment)
paymentRouter.delete('/:id', deletePayment)

export { paymentRouter }
