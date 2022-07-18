import path from 'path'

const __dirname = path.resolve()

export default {
  mode: 'development',
  entry: {
    main: './src/frontend',
  },
  output: {
    filename: '[name].js',
    path: path.resolve('./public/dist'),
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
  },
  devtool: 'eval-cheap-source-map',
}
