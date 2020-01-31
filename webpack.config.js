const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/main/websrc/index.jsx',
    testpage: './src/main/websrc/testpage.jsx',
    registration: "./src/main/websrc/components/registration.jsx",
    registerwaiver: "./src/main/websrc/components/registration/registerwaiver.jsx",
    registerform: "./src/main/websrc/components/registration/registerform.jsx",
    technologyform: "./src/main/websrc/components/technology/technologyform.jsx",
    technologywaiver: "./src/main/websrc/components/technology/technologywaiver.jsx",
    info: "./src/main/websrc/components/info.jsx",
    admin: "./src/main/websrc/components/admin/admin.jsx",
    changeregistration: "./src/main/websrc/components/admin/changeregistration.jsx",
    attendeecheckin: "./src/main/websrc/components/admin/attendeecheckin.jsx",
    attendeesearch: "./src/main/websrc/components/admin/attendeesearch.jsx",
    editattendees: "./src/main/websrc/components/admin/editattendees.jsx",
    edittechnologies: "./src/main/websrc/components/admin/edittechnologies.jsx",
    faq: "./src/main/websrc/components/information/faq.jsx",
    map: "./src/main/websrc/components/information/map.jsx",
    eventlayout: "./src/main/websrc/components/information/eventlayout.jsx",
    contact: "./src/main/websrc/components/information/contact.jsx"
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
    }),
    new HtmlWebpackPlugin({
      chunks: ['registerform'],
      template: './src/main/websrc/template.html',
      filename: 'registerform.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['technologyform'],
      template: './src/main/websrc/template.html',
      filename: 'technologyform.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['technologywaiver'],
      template: './src/main/websrc/template.html',
      filename: 'technologywaiver.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['info'],
      template: './src/main/websrc/template.html',
      filename: 'info.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['admin'],
      template: './src/main/websrc/template.html',
      filename: 'admin.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['faq'],
      template: './src/main/websrc/template.html',
      filename: 'faq.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['map'],
      template: './src/main/websrc/template.html',
      filename: 'map.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['eventlayout'],
      template: './src/main/websrc/template.html',
      filename: 'eventlayout.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['contact'],
      template: './src/main/websrc/template.html',
      filename: 'contact.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['changeregistration'],
      template: './src/main/websrc/template.html',
      filename: 'changeregistration.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['attendeecheckin'],
      template: './src/main/websrc/template.html',
      filename: 'attendeecheckin.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['attendeesearch'],
      template: './src/main/websrc/template.html',
      filename: 'attendeesearch.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['editattendees'],
      template: './src/main/websrc/template.html',
      filename: 'editattendees.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['edittechnologies'],
      template: './src/main/websrc/template.html',
      filename: 'edittechnologies.html'
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
