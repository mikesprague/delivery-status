const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader')
const CopyWebpackPlugin = require('copy-webpack-plugin');

const mode = process.env.NODE_ENV;

const webpackRules = [
  {
    test: /\.(sa|sc|c)ss$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          importLoaders: true,
          sourceMap: true,
        },
      },
      {
        loader: 'postcss-loader',
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        loader: 'esbuild-loader',
        options: {
          loader: 'css',
          minify: true
        }
      },
    ],
  },
  {
    test: /\.(js)$/,
    exclude: [/node_modules/],
    use: [{
      loader: 'esbuild-loader',
      options: {
        target: 'esnext'
      }
    }],
  },
];

const webpackPlugins = [
  new MiniCssExtractPlugin({
    filename: './css/styles.css',
    chunkFilename: './css/[id].css',
  }),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: './src/*.json',
        to: './[name][ext]',
        force: true,
      },
    ],
  }),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: './src/images/**/*',
        to: './images/[name][ext]',
        force: true,
      },
    ],
  }),
];

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
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'esnext',
        css: true,
      })
    ]
  },
  plugins: webpackPlugins,
};
