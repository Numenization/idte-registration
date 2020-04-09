const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: ['babel-polyfill', './src/main/websrc/index.jsx'],
    testpage: ['babel-polyfill', './src/main/websrc/testpage.jsx'],
    registration: [
      'babel-polyfill',
      './src/main/websrc/components/registration.jsx',
    ],
    registerwaiver: [
      'babel-polyfill',
      './src/main/websrc/components/registration/registerwaiver.jsx',
    ],
    registerform: [
      'babel-polyfill',
      './src/main/websrc/components/registration/registerform.jsx',
    ],
    technologyform: [
      'babel-polyfill',
      './src/main/websrc/components/technology/technologyform.jsx',
    ],
    technologywaiver: [
      'babel-polyfill',
      './src/main/websrc/components/technology/technologywaiver.jsx',
    ],
    info: ['babel-polyfill', './src/main/websrc/components/info.jsx'],
    admin: ['babel-polyfill', './src/main/websrc/components/admin/admin.jsx'],
    changeregistration: [
      'babel-polyfill',
      './src/main/websrc/components/admin/changeregistration.jsx',
    ],
    attendeecheckin: [
      'babel-polyfill',
      './src/main/websrc/components/admin/attendeecheckin.jsx',
    ],
    technologycategories: [
      'babel-polyfill',
      './src/main/websrc/components/admin/technologyCategories.jsx',
    ],
    database: [
      'babel-polyfill',
      './src/main/websrc/components/admin/database.jsx',
    ],
    faq: ['babel-polyfill', './src/main/websrc/components/information/faq.jsx'],
    map: ['babel-polyfill', './src/main/websrc/components/information/map.jsx'],
    eventlayout: [
      'babel-polyfill',
      './src/main/websrc/components/information/eventlayout.jsx',
    ],
    contact: [
      'babel-polyfill',
      './src/main/websrc/components/information/contact.jsx',
    ],
    sendemail: [
      'babel-polyfill',
      './src/main/websrc/components/admin/sendEmail.jsx',
    ],
    eventdb: [
      'babel-polyfill',
      './src/main/websrc/components/admin/eventdb.jsx',
    ],
    events: ['babel-polyfill', './src/main/websrc/components/admin/events.jsx'],
    adminaccounts: [
      'babel-polyfill',
      './src/main/websrc/components/admin/accounts.jsx',
    ],
    techdb: ['babel-polyfill', './src/main/websrc/components/admin/techdb.jsx'],
    qrsignin: [
      'babel-polyfill',
      './src/main/websrc/components/admin/qrsignin.jsx',
    ],
    thankyou: [
      'babel-polyfill',
      './src/main/websrc/components/information/thankyou.jsx',
    ],
    badges: ['babel-polyfill', './src/main/websrc/components/admin/badges.jsx'],
  },

  output: {
    path: path.resolve(__dirname, './src/main/webapp'),
    filename: '[name]-bundle.js',
    publicPath: '/idte/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['index'],
      template: './src/main/websrc/template.html',
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      chunks: ['testpage'],
      template: './src/main/websrc/template.html',
      filename: 'testpage.html',
    }),
    new HtmlWebpackPlugin({
      chunks: ['registration'],
      template: './src/main/websrc/template.html',
      filename: 'registration.html',
    }),
    new HtmlWebpackPlugin({
      chunks: ['registerwaiver'],
      template: './src/main/websrc/template.html',
      filename: 'registerwaiver.html',
    }),
    new HtmlWebpackPlugin({
      chunks: ['registerform'],
      template: './src/main/websrc/template.html',
      filename: 'registerform.html',
    }),
    new HtmlWebpackPlugin({
      chunks: ['technologyform'],
      template: './src/main/websrc/template.html',
      filename: 'technologyform.html',
    }),
    new HtmlWebpackPlugin({
      chunks: ['technologywaiver'],
      template: './src/main/websrc/template.html',
      filename: 'technologywaiver.html',
    }),
    new HtmlWebpackPlugin({
      chunks: ['info'],
      template: './src/main/websrc/template.html',
      filename: 'info.html',
    }),
    new HtmlWebpackPlugin({
      chunks: ['admin'],
      template: './src/main/websrc/template.html',
      filename: 'admin/admin.html',
    }),
    new HtmlWebpackPlugin({
      chunks: ['faq'],
      template: './src/main/websrc/template.html',
      filename: 'faq.html',
    }),
    new HtmlWebpackPlugin({
      chunks: ['map'],
      template: './src/main/websrc/template.html',
      filename: 'map.html',
    }),
    new HtmlWebpackPlugin({
      chunks: ['eventlayout'],
      template: './src/main/websrc/template.html',
      filename: 'eventlayout.html',
    }),
    new HtmlWebpackPlugin({
      chunks: ['contact'],
      template: './src/main/websrc/template.html',
      filename: 'contact.html',
    }),
    new HtmlWebpackPlugin({
      chunks: ['changeregistration'],
      template: './src/main/websrc/template.html',
      filename: 'admin/changeregistration.html',
    }),
    new HtmlWebpackPlugin({
      chunks: ['attendeecheckin'],
      template: './src/main/websrc/template.html',
      filename: 'admin/attendeecheckin.html',
    }),
    new HtmlWebpackPlugin({
      chunks: ['technologycategories'],
      template: './src/main/websrc/template.html',
      filename: 'admin/technologyCategories.html',
    }),
    new HtmlWebpackPlugin({
      chunks: ['database'],
      template: './src/main/websrc/template.html',
      filename: 'admin/database.html',
    }),
    new HtmlWebpackPlugin({
      chunks: ['sendemail'],
      template: './src/main/websrc/template.html',
      filename: 'admin/sendemail.html',
    }),
    new HtmlWebpackPlugin({
      chunks: ['eventdb'],
      template: './src/main/websrc/template.html',
      filename: 'admin/eventdb.html',
    }),
    new HtmlWebpackPlugin({
      chunks: ['events'],
      template: './src/main/websrc/template.html',
      filename: 'admin/events.html',
    }),
    new HtmlWebpackPlugin({
      chunks: ['adminaccounts'],
      template: './src/main/websrc/template.html',
      filename: 'admin/accounts.html',
    }),
    new HtmlWebpackPlugin({
      chunks: ['techdb'],
      template: './src/main/websrc/template.html',
      filename: 'admin/techdb.html',
    }),
    new HtmlWebpackPlugin({
      chunks: ['qrsignin'],
      template: './src/main/websrc/template.html',
      filename: 'admin/qrsignin.html',
    }),
    new HtmlWebpackPlugin({
      chunks: ['thankyou'],
      template: './src/main/websrc/template.html',
      filename: 'thankyou.html',
    }),
    new HtmlWebpackPlugin({
      chunks: ['badges'],
      template: './src/main/websrc/template.html',
      filename: 'admin/badges.html',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    watchContentBase: true,
    historyApiFallback: true,
    proxy: [
      {
        context: ['/api', '/auth'],
        target: 'http://localhost:5000',
        secure: false,
      },
    ],
    port: 8090,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
};
