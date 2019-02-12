const path = require('path');
const webpack = require('webpack');
const vueLoaderConfig = require('./vue-loader.config1');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

const api = require('../config/api');
const env = require('../config/dev.env');
const prod = require('../config/prod.env');

if (!isProd) {
  env.api = JSON.stringify(api.dev);

} else {
  prod.api = JSON.stringify(api.build);
}

module.exports = {
  devtool: isProd
    ? false
    : '#cheap-module-source-map',
  // context: path.resolve(__dirname, '../'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: 'static/js/[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      'public': path.resolve(__dirname, '../public')
    }
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(less|css|scss)$/,
        use: isProd ?
          ExtractTextPlugin.extract({
            use: ['css-loader?minimize', 'less-loader', 'sass-loader'],
            fallback: 'vue-style-loader'
          }) :
          ['vue-style-loader', 'css-loader', 'less-loader', 'sass-loader']
      }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  plugins: isProd
    ? [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_console: true,
            collapse_vars: true,
            reduce_vars: true
          },
          output: {
            beautify: false,
            comments: false
          }
        },
        sourceMap: false,
        parallel: true,
        cache: true
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new ExtractTextPlugin({
        filename: 'static/css/common.[chunkhash].css'
      }),
      new webpack.DefinePlugin({
        'process.env.api': prod.api
      }),
      new CopyWebpackPlugin((() => {
        let array = [];
        const copyPath = {
          '../src/assets/images': 'static/images'
        };

        const getArray = fn => (...args) => fn.apply(this, args);
        const isArray = getArray(args => Object.prototype.toString.call(args) === '[object Array]');

        Object.keys(copyPath).forEach(key => {
          const fromTo = (() => {
            return (array, from, to) => {
              array.push({
                from: from,
                to: to
              })
            }
          })();

          isArray(copyPath[key]) ? [...copyPath[key]].forEach(value => {
            fromTo(array, path.resolve(__dirname, key), value)
          }) : fromTo(array, path.resolve(__dirname, key), copyPath[key])
        });

        return array;
      })())
    ]
    : [
      new FriendlyErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env.api': env.api
      }),
      new CopyWebpackPlugin((() => {
        let array = [];
        const copyPath = {
          '../src/assets/images': 'static/images'
        };

        const getArray = fn => (...args) => fn.apply(this, args);
        const isArray = getArray(args => Object.prototype.toString.call(args) === '[object Array]');

        Object.keys(copyPath).forEach(key => {
          const fromTo = (() => {
            return (array, from, to) => {
              array.push({
                from: from,
                to: to
              })
            }
          })();

          isArray(copyPath[key]) ? [...copyPath[key]].forEach(value => {
            fromTo(array, path.resolve(__dirname, key), value)
          }) : fromTo(array, path.resolve(__dirname, key), copyPath[key])
        });

        return array;
      })())
    ]
};