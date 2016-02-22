var webpack = require('webpack'); 
var path = require('path'); 

module.exports = {

devtool: 'eval',
entry: './client/index.js',

output: {
path: path.join(__dirname, 'client/dist/js'),
    filename: 'bundle.js'
    },

    resolveLoader: {
      modulesDirectories: [
          path.join(__dirname, 'node_modules') 
      ]
    },

    module: {
        loaders: [
        {
            test: /\.js$/,
            loader: 'babel-loader'
        }
        ],
    }
  
};
