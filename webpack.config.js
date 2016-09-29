var path = require('path');
var webpack = require('webpack');
var libraryName = 'gradient-generator';
var globalName = 'GradientGenerator';
var paths = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist')
};

module.exports = {
  entry: path.join(paths.src, libraryName + '.js'),
  output: {
    path: paths.dist,
    filename: libraryName + '.js',
    library: globalName,
    libraryTarget: 'umd'
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        include: paths.src,
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: paths.src,
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
};
