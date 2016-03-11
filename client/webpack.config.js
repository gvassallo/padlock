var webpack = require('webpack'); 
var path = require('path'); 

module.exports = {

devtool: 'eval',
entry: [
  'webpack-hot-middleware/client',
  './index.js'
], 
output: {
    path: path.join(__dirname, './dist/js'),
    publicPath: 'http://localhost:3000/client/dist/js', 
    filename: 'bundle.js'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(), 
      new webpack.NoErrorsPlugin()
    ], 
    resolveLoader: {
      modulesDirectories: [
          path.join(__dirname, '../node_modules') 
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
