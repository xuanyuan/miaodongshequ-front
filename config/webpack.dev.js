const path = require("path");
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  mode: 'development',
  entry: {
    main: resolve('src/main.js'),
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  //模块：解析CSS，图片转换等
  module: {
    rules: [{
      test: /\.css$/,
      // Attention, you have to use two loaders to transform CSS file.
      // First is CSS - loader to read CSS file, 
      // and another one is Style - loader to insert < style > tag into HTML page.
      use: [
        'vue-style-loader',
        'css-loader',
        'postcss-loader'
      ]
    }, {
      test: /\.scss$/,
      use: [
        'vue-style-loader',
        'css-loader',
        'postcss-loader',
        'sass-loader'
      ],
    }, {
      test: /\.sass$/,
      use: [
        'vue-style-loader',
        'css-loader',
        'postcss-loader',
        'sass-loader?indentedSyntax'
      ],
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'url-loader',
      options: {
        limit: 8192,
        name: 'static/[name].[ext]?[hash:8]'
      }
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          'scss': [
            'vue-style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ],
          'sass': [
            'vue-style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader?indentedSyntax'
          ]
        }
      }
    }, {
      test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000
      }
    }]
  },
  // 插件，用于生产模板和各项功能
  plugins: [
    // new uglify(), //压缩混淆JS文件
    new htmlPlugin({
      minify: { //是对html文件进行压缩
        removeAttributeQuotes: true //removeAttrubuteQuotes是却掉属性的双引号。
      },
      hash: true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
      template: resolve('src/index.html'), //是要打包的html模版路径和文件名称。
      filename: 'index.html'
    }),
    // If you want a module available as a global variable in every module, 
    // such as making $ and jQuery available in every module without writing require("jquery")
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
  ],
  // 配置webpack开发服务功能
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: 'localhost',
    overlay: true,
    port: 8000,
    proxy: {
      '/food/*': {
        target: 'http://localhost:8080'
      }
    }
  }
}