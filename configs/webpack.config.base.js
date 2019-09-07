/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import webpack from 'webpack';
import { dependencies } from '../package.json';

let dependenciesList = [...Object.keys(dependencies || {})];

// remove react-hot-loader as it ends up loading in production mode
// remove react-dom because it needs to be aliased to @hot-loader/react-dom
const dependenciesToExcludeFromExternals = ['react-hot-loader', 'react-dom'];
dependenciesList = dependenciesList.filter(d => !dependenciesToExcludeFromExternals.includes(d));

module.exports = {
  externals: dependenciesList,

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },

  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    libraryTarget: 'commonjs2',
  },

  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },

  optimization: {
    namedModules: true,
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
  ],
};
