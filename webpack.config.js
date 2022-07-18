import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const __dirname = path.resolve()

export default {
  mode: 'development',
  entry: './frontend/app.js',
  output: {
    path: path.resolve(__dirname, 'frontend/dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js'],
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
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
    plugins: [
      new HtmlWebpackPlugin({
        template: 'frontend/dist/index.html',
      }),
    ],
  },
  devtool: 'eval-cheap-source-map',
}
