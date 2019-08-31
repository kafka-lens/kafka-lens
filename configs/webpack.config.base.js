/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import webpack from 'webpack';
import { dependencies } from '../package.json';

module.exports = {
  externals: [...Object.keys(dependencies || {})],

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

  // entry: path.resolve(__dirname, './client/src/index.jsx'),

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
