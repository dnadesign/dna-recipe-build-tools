const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const {
  localURL,
  localDomain,
  isUsingHTTPS,
  secureLocalDomain,
  PATHS
} = require('./webpack.env.js');

module.exports = merge(common, {
  /**
   * Mode
   *
   * Set the mode to development or production.
   */
  mode: 'development',

  /**
   * Devtool
   *
   * Control how source maps are generated.
   */
  devtool: 'inline-source-map',

  /**
   * DevServer
   *
   * Spin up a server for quick development.
   */
  devServer: {
    https: isUsingHTTPS && secureLocalDomain,
    host: localDomain,
    hot: true,
    port: 8080,
    publicPath: PATHS.public,
    quiet: true,
    proxy: {
      '**': {
        target: localURL,
        secure: false,
        headers: {
          'X-Dev-Server-Proxy': localURL
        }
      }
    }
  },

  plugins: [
    /**
     * HotModuleReplacementPlugin
     *
     * Only update what has changed.
     */
    new webpack.HotModuleReplacementPlugin()
  ]
});
