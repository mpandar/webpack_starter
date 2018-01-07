const path = require('path');
const base = path.join(__dirname, '..')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')


module.exports = {
  entry: {
    index: path.resolve(base, 'src', 'index.js'),
    main: path.resolve(base, 'src', 'main.js')
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(base, 'dist')
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(base, 'dist'),
    historyApiFallback: true,
    inline: true,
    proxy: {
      "/api": "http://localhost:8000"
    }
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          fix: true
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                modules: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
              }
            }, {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: path.resolve(base, 'config', 'postcss.config.js')
                }
              }
            }
          ]
        })
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader",
          options: {
            modules: false,
            localIdentName: '[path][name]__[local]--[hash:base64:5]',
            minimize: true
          }
        }, {
          loader: 'postcss-loader',
          options: {
            config: {
              path: path.resolve(base, 'config', 'postcss.config.js')
            }
          }
        }, {
          loader: "sass-loader"
        }]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              fallback: 'file-loader',
              name: '[hash:5].[ext]',
              // publicPath: 'https://cdn.j2do.com/',
              outputPath: 'images/'
            }
          }
        ]
      }
    ]
  },
  resolve: {
  },
  plugins: [
    new ExtractTextPlugin("css/[name].css"),
    new HtmlWebpackPlugin({
      title: 'Index Page',
      template: path.resolve(base, 'src', 'template/index.html.tmpl'),
      filename: "index.html",
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      title: 'Main Page',
      template: path.resolve(base, 'src', 'template/index.html.tmpl'),
      filename: "main.html",
      chunks: ['main']
    }),
    new UglifyJsPlugin()
  ]
};