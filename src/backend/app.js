import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import webpack from 'webpack'
import webpackDevConfig from '../../webpack.dev.js'
import webpackProdConfig from '../../webpack.prod.js'
import Middleware from 'webpack-dev-middleware'
import { transactionRouter } from './routes/transactionHistory.js'
import { paymentRouter } from './routes/payment.js'

dotenv.config()
const __dirname = path.resolve()

const compiler = webpack(
  process.env.NODE_ENV === 'development' ? webpackDevConfig : webpackProdConfig,
)

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(
  '/dist',
  Middleware(compiler, {
    // webpack-dev-middleware options
  }),
)

app.use('/api/transaction', transactionRouter)
app.use('/api/payment', paymentRouter)

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, `public/index.html`))
})

export default app
