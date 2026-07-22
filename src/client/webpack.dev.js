const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'eval',
  devServer: {
    static: {
      directory: path.join(__dirname, '../../dist/client')
    },
    hot: true,
    proxy: [
      {
        context: ['/socket.io'],
        target: 'http://localhost:3000',
        ws: true
      }
    ]
  },
  entry: './src/client/client.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../../dist/client')
  }
}