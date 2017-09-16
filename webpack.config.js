const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app/src/index.js',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'coCoding',
    }),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'app/dist'),
  },
};
