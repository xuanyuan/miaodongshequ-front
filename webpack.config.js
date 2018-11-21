const path = require('path');
const webpack = require('webpack');
const {
  VueLoaderPlugin
} = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './src/main.js'],
    output: {
      // 项目的打包文件路径
      path: path.resolve(__dirname, './dist'),
      // 通过devServer访问路径
      publicPath: '/dist/',
      // 打包后的文件名
      filename: 'build.js'
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    },
    module: {
      rules: [{
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }, {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ],
      }, {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader?indentedSyntax'
        ],
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }, {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ],
            'sass': [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax'
            ]
          }
        }
      }, {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000'
      }]
    },
    plugins: [
      // make sure to include the plugin for the magic
      new VueLoaderPlugin()
    ],
    devServer: {
      clientLogLevel: 'warning',
      historyApiFallback: true,
      hot: true,
      compress: true,
      host: '0.0.0.0',
      overlay: true,
      port: 8080,
      proxy: {
        '/v1': {
          target: 'http://localhost:8000',
          changeOrigin: true
          // pathRewrite: {
          //   '^/v1': 'v1'
          // }
        }
      }
    },
    // mode: 'production'
    mode: 'development'
  }