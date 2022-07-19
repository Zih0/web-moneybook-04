import { merge } from 'webpack-merge'
import webpackConfig from './webpack.config.js'

const PORT = process.env.PORT || 3000
export default merge(webpackConfig, {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  devServer: {
    port: PORT,
  },
})
