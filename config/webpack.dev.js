/** @prettier */

const OPTS = require('./options.js');

const pkg = require('../package.json');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '..', pkg.config.dist_dir),
    filename: OPTS.BASE_OUT_NAME + '.min.js',
    libraryTarget: 'window',
    library: OPTS.LIBRARY_NAME,
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '..', pkg.config.dist_dir),
    port: OPTS.PORT,
  },
});
