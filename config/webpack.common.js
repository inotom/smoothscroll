/** @prettier */

const path = require('path');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@src': path.resolve(__dirname, '..', 'src'),
    },
  },
  optimization: {
    minimize: false,
  },
};
