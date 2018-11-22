const path = require('path');
const webpack = require('webpack');
const {
  VueLoaderPlugin
} = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  entry: [
    'babel-polyfill', 
    './src/main.js'
  ],
  output: {
    // 项目的打包文件路径
    path: path.resolve(__dirname, 'dist'),
    // 通过devServer访问路径
    publicPath: '/',
    // 打包后的文件名
    filename: '[name].js',

  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
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
    new VueLoaderPlugin(),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'dist/index.html'),
      template: './index.html',
      inject: true,
      title: 'zhangdianjun',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: 'common',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: 'localhost',
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
  mode: 'production'
  // mode: 'development'
}