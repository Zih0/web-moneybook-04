import { merge } from 'webpack-merge'
import webpackConfig from './webpack.config.js'

export default merge(webpackConfig, {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  devServer: {
    hot: true,
  },
})
