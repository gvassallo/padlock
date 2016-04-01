var webpack = require('webpack'); 
var path = require('path'); 

module.exports = {

  devtool: 'eval',
  // resolve: {
  //   alias: {
  //     'react': 'react-lite', 
  //     'react-dom': 'react-lite' 
  //   }
  // }, 
  entry: [
    './client/index.js'
  ], 
  output: {
    path: path.join(__dirname, 'client/dist/js'),
    filename: 'bundle.js'
    },
    plugins: [
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
        // {
        //     test: /\.css?$/,
        //     loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
        // }
        ]
    }
  
};
