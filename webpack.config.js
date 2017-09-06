var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'app/assets/javascripts/clients');
var APP_DIR = path.resolve(__dirname, 'client/app');

var config = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'web.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?/,
        include: APP_DIR,
        loader: 'babel-loader'
      },
      {
        test: /\.(scss)$/,
        use: [{
          loader: 'style-loader', // inject CSS to page
        }, {
          loader: 'css-loader', // translates CSS into CommonJS modules
        }, {
          loader: 'postcss-loader', // Run post css actions
          options: {
            plugins: function () { // post css plugins, can be exported to postcss.config.js
              return [
                require('precss'),
                require('autoprefixer')
              ];
            }
          }
        }, {
          loader: 'sass-loader' // compiles SASS to CSS
        }]
      },
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
      })
  ]
};

module.exports = config;