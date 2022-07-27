import express from 'express'
import { createPayment } from '../controllers/payment.js'

const paymentRouter = express.Router()

paymentRouter.post('/', createPayment)

export { paymentRouter }
