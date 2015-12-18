var webpack = require('webpack'); 
var path = require('path'); 

module.exports = {

devtool: 'eval',
entry: './client/index.js',

output: {
    path: path.join(__dirname, 'client'),
    filename: 'bundle.js'
  },

  // resolve: {
  //   alias: {
  //     phoenix: __dirname + '/deps/phoenix/web/static/js/phoenix.js'
  //   }
    // resolve: {
    //     root: [
    //         path.join(__dirname, "..", "babel", "node_modules")
    //     ],
    //     extensions: ['', '.js', '.json'] 
    // }, // },

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
