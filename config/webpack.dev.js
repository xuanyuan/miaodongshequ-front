const path = require("path");
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');

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
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  //模块：解析CSS，图片转换，压缩等
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
  // 插件，用于生产模板和各项功能
  plugins: [
    new uglify(), //压缩混淆JS文件
    new htmlPlugin({
      minify: { //是对html文件进行压缩
        removeAttributeQuotes: true //removeAttrubuteQuotes是却掉属性的双引号。
      },
      hash: true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
      template: resolve('src/index.html'), //是要打包的html模版路径和文件名称。
      filename: 'index.html'

    })
  ],
  // 配置webpack开发服务功能
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: 'localhost',
    overlay: true,
    port: 8080
  }
}