const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/main/websrc/index.jsx',
    testpage: './src/main/websrc/testpage.jsx',
    registration: "./src/main/websrc/components/registration.jsx",
    registerwaiver: "./src/main/websrc/components/registration/registerwaiver.jsx"
  },
  output: {
    path: path.resolve(__dirname, './src/main/webapp'),
    filename: '[name]-bundle.js',
    publicPath: '/idte/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['index'],
      template: './src/main/websrc/template.html',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['testpage'],
      template: './src/main/websrc/template.html',
      filename: 'testpage.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['registration'],
      template: './src/main/websrc/template.html',
      filename: 'registration.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['registerwaiver'],
      template: './src/main/websrc/template.html',
      filename: 'registerwaiver.html'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    watchContentBase: true,
    historyApiFallback: true,
    proxy: [
      {
        context: ['/api', '/auth'],
        target: 'http://localhost:5000',
        secure: false
      }
    ],
    port: 8080,
    overlay: {
      warnings: true,
      errors: true
    }
  }
};
