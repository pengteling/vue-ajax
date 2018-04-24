const webpack = require("webpack")
const path = require("path")
const isDev = process.env.NODE_ENV == "development"
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin")
const config = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  resolve:{
    extensions:['*','.js','.vue','jsx'],
    alias:{
      '@':path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: isDev ? false : true
        }
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(jpg|gif|png|jpeg|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name]-[sha512:hash:base64:7].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    })
  ]
}
if (isDev) {
  config.devtool = 'cheap-model-eval-source-map'
  config.devServer = {
    port: 8089,
    host: '0.0.0.0',
    hot: true,
    historyApiFallback: true,
    contentBase:'dist',
    proxy:{
      '/fcg-bin/fcg_myqq_toplist.fcg': {
        //target: 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg',
        //target: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=26&_=1520859425817',
        target: 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1524562597090&test=123',
        //secure: false,
        changeOrigin: true,
        //pathRewrite: {'^/api/list': ''}
      },
    }
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
  config.module.rules.push(
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
      ]

    }
  )
}
else {
  /* 生产模式 */
  config.entry = {
    app : path.resolve(__dirname, 'src/index.js'),
    vendor: ['vue']
  }
  config.output.filename = '[name]-[chunkhash:8].js'
  config.module.rules.push(
    {
      test: /\.scss$/,
      use: ExtractTextWebpackPlugin.extract(
        {
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                minimize: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        }
      )


    }
  )
  config.plugins.push(
    new ExtractTextWebpackPlugin('style.[contentHash:8].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    })
  )


}
module.exports = config