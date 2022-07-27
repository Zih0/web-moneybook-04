import express from 'express'
import { createPayment, getPayment } from '../controllers/payment.js'

const paymentRouter = express.Router()

paymentRouter.get('/', getPayment)
paymentRouter.post('/', createPayment)

export { paymentRouter }
