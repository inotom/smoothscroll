/** @prettier */

const OPTS = require('./options.js');

const pkg = require('../package.json');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');

const _config = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.BannerPlugin({
      banner: `${pkg.name} v${pkg.version} ${pkg.author} | ${pkg.license}`,
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        parallel: true,
        terserOptions: {
          ecma: 8,
        },
      }),
    ],
  },
});

const config = [
  merge(_config, {
    output: {
      path: path.resolve(__dirname, '..', pkg.config.dist_dir),
      filename: OPTS.BASE_OUT_NAME + '.umd.js',
      libraryTarget: 'umd',
      library: OPTS.LIBRARY_NAME,
      umdNamedDefine: true,
    },
  }),
  merge(_config, {
    output: {
      path: path.resolve(__dirname, '..', pkg.config.dist_dir),
      filename: OPTS.BASE_OUT_NAME + '.min.js',
      libraryTarget: 'window',
      library: OPTS.LIBRARY_NAME,
    },
  }),
];

module.exports = config;
