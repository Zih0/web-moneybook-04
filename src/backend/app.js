import createError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import dotenv from 'dotenv'
import webpack from 'webpack'
import webpackConfig from '../../webpack.config.js'
import Middleware from 'webpack-dev-middleware'
const __dirname = path.resolve()

const compiler = webpack(webpackConfig)

dotenv.config()
const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

if (process.env.NODE_ENV === 'development') {
  // 웹팩 설정
  app.use(
    '/dist',
    Middleware(compiler, {
      // webpack-dev-middleware options
    }),
  )
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../../public')))
}

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, `../../public/index.html`))
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app
