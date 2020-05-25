const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const mode = process.env.NODE_ENV;

const webpackRules = [
  {
    test: /\.(js)$/,
    exclude: [/node_modules/],
    use: [{
      loader: 'babel-loader',
    }],
  },
];

const webpackPlugins = [
  new CopyWebpackPlugin({
    patterns: [
      {
        from: './src/*.json',
        to: './',
        flatten: true,
        force: true,
      },
    ],
  }),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: './src/images/**/*',
        to: './images',
        flatten: true,
        force: true,
      },
    ],
  }),
];

if (mode === 'production') {
  webpackPlugins.push(
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  );
}

module.exports = {
  entry: [
    './src/js/extension.js',
  ],
  output: {
    filename: './js/bundle.js',
    chunkFilename: './js/[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  mode,
  module: {
    rules: webpackRules,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      new TerserPlugin({
        parallel: true,
        sourceMap: false,
      }),
    ],
  },
  plugins: webpackPlugins,
};
