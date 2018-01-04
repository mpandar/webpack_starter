const path = require('path');
const base = path.join(__dirname, '..')

module.exports = {
  entry: path.resolve(base, 'src', 'index.js'),
  output: {
    filename: 'bundle.js',
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
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          }, {
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
            minimize: false
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
  ]
};