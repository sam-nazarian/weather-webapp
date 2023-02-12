const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/js/controller.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true, //empty every-time build is ran
  },

  //Let's browser know were everything came form, to know originality of an error
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'), //dist
    },
    open: true, //launch browser when you start a web server
    // compress: true,
    // port: 9000,
  },

  //loaders
  module: {
    // cssloader looks for file & turns file into module and gives over to javascript
    // style-loader will put it in html
    rules: [
      // { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.css$/, use: ['style-loader', { loader: 'css-loader', options: { sourceMap: true, url: false } }] },
      { test: /\.(svg|png|jpe?g|gif)$/i, loader: 'file-loader', options: { name: '[path][name].[ext]' } },
      { test: /\.mp3$/, loader: 'file-loader' },
      { test: /\.m?js$/, exclude: /(node_modules|bower_components)/, use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env'] } } },
    ],
  },

  //plugins, makes the index.html file on the dist folder, automatically will have the javascript loaded in
  plugins: [
    new HtmlWebpackPlugin({
      title: `Saman's WheatherApp`,
      filename: 'index.html', //what the name of the file will be
      template: path.resolve(__dirname, 'index.html'),
    }),
  ],
};
