var webpack = require('webpack'); 
var path = require('path'); 
var PROD = (process.env.NODE_ENV === 'production'); 

module.exports = {
  devtool: 'eval',
  entry: [
    './client/index.js'
  ], 
  output: {
    path: path.join(__dirname, 'client/dist/js'),
    filename: 'bundle.js'
    },
  plugins: PROD?  [
      new webpack.NoErrorsPlugin(), 
      new webpack.optimize.UglifyJsPlugin({minimize: true})
    ] : [
      new webpack.NoErrorsPlugin() 
    ], 

  resolveLoader: {
    modulesDirectories: [
      path.join(__dirname, 'node_modules') 
    ]
  },

  module: {
    loaders: [
    {
      test: /\.js$/,
      exclude: /node_modules/, 
      loader: 'babel-loader'
    } 
    ]
  }
  
};
