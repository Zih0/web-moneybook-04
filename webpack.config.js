import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const __dirname = path.resolve()

export default {
  mode: 'development',
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/app.html',
      }),
    ],
  },
}
