var webpack = require('webpack');
var path = require('path');

var prod = process.env.NODE_ENV === 'production';
var libraryName = 'gradient-generator';
var globalName = 'GradientGenerator';
var plugins = [];
var paths = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  entry: path.join(__dirname, 'src', libraryName + '.js')
};

if (prod) {
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = {
  entry: paths.entry,

  output: {
    path: paths.dist,
    filename: libraryName + (prod ? '.min.js' : '.js'),
    library: globalName,
    libraryTarget: 'umd'
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        include: paths.src,
      }
    ],

    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: paths.src,
        query: {
          presets: ['es2015']
        }
      }
    ],
  },

  plugins: plugins
};
