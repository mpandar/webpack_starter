const path = require('path');
const base = path.join(__dirname, '..')

module.exports = {
  entry: path.resolve(base, 'src', 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(base, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  resolve: {
  },
  plugins: [
  ]
};