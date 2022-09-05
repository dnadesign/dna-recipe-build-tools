import AssetsPlugin from 'assets-webpack-plugin';
import babelLoaderExcludeNodeModulesExcept from 'babel-loader-exclude-node-modules-except';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import PrettierPlugin from 'prettier-webpack-plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';
import url from 'url';
import { VueLoaderPlugin } from 'vue-loader';
import webpack from 'webpack';
import WebpackBar from 'webpackbar';

import {
  isUsingHTTPS,
  localDomain,
  localURL,
  PATHS,
  secureLocalDomain,
} from './webpack.env.js'; // eslint-disable-line import/extensions

const { DefinePlugin } = webpack;

const __dirname = url.fileURLToPath(new URL('.', import.meta.url)); // eslint-disable-line no-underscore-dangle
const isProd = process.env.NODE_ENV === 'production';
const isWatching =
  process.argv.includes('serve') || process.argv.includes('watch');

/** @type {import('webpack').Configuration} */
export default {
  mode: isProd ? 'production' : 'development',

  devtool: isProd ? false : 'source-map',

  stats: isProd
    ? { colors: true, assets: false, modules: false, timings: false }
    : 'errors-warnings',

  entry: {
    main: [`${PATHS.src}/js/index.js`, `${PATHS.src}/scss/index.scss`],
    editor: `${PATHS.src}/scss/editor.scss`,
  },

  output: {
    path: path.resolve(__dirname, PATHS.dist),
    filename: isProd ? '[name].[contenthash].bundle.js' : '[name].bundle.js',
    publicPath: PATHS.public,
    module: true,
  },

  experiments: {
    outputModule: true,
  },

  resolve: {
    extensions: ['.js', '.jsx', '.vue'],
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },

  plugins: [
    // Write information about generated files
    new AssetsPlugin({
      includeAllFileTypes: false,
      path: path.resolve(__dirname, PATHS.dist),
      prettyPrint: true,
    }),

    // Removes/cleans build folders and unused assets when rebuilding.
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!webpack-assets.json'],
    }),

    // Copies files from target to destination folder.
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${PATHS.static}/favicons`,
          to: 'static/favicons',
          noErrorOnMissing: true,
        },
        {
          from: `${PATHS.static}/svg`,
          to: 'static/svg',
          noErrorOnMissing: true,
        },
      ],
    }),

    new DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),

    // Apply consistent coding style guidelines for javascript
    new ESLintPlugin({
      context: PATHS.src,
      fix: true,
      extensions: ['js', 'jsx', 'vue'],
    }),

    new MiniCssExtractPlugin({
      filename: (pathData) =>
        pathData.chunk.name === 'editor' || !isProd
          ? '[name].css'
          : '[name].[contenthash].bundle.css',
    }),

    // Apply consistent coding style guidelines, don't run when watching as it's slow
    isWatching ? () => {} : new PrettierPlugin(),

    // Apply consistent coding style guidelines for (s)css
    new StylelintPlugin({
      files: `${PATHS.src}/**/*.((c|sa|sc)ss)`,
      fix: true,
    }),

    new VueLoaderPlugin(),

    new WebpackBar({
      name: isProd ? 'prod' : 'dev',
      color: 'blue',
      fancy: true,
    }),
  ],

  // Module
  module: {
    rules: [
      // JavaScript – use Babel to transpile JavaScript files.
      // Excludes all node_modules, since they are already processed
      // Re-include certain modules by adding them within babelLoaderExcludeNodeModulesExcept
      {
        test: /\.(jsx?)$/,
        exclude: babelLoaderExcludeNodeModulesExcept(['gmap-vue']),
        use: [
          {
            loader: 'babel-loader',
          },
          { loader: 'import-glob-loader2' },
        ],
        resolve: {
          fullySpecified: false,
        },
      },

      // Styles – inject CSS into the head with source maps
      {
        test: /\.((c|sa|sc)ss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          {
            loader: 'resolve-url-loader',
            options: {
              silent: true,
            },
          },
          // sourceMap always required on loaders preceding resolve-url-loader
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
          { loader: 'import-glob-loader2', options: { sourceMap: true } },
        ],
      },

      // Fonts and images – Copy files to build folder
      {
        test: /\.(ico|gif|png|jpe?g|svg|webp|woff2?)$/,
        type: 'asset/resource',
      },

      // Vue template
      {
        test: /\.vue$/,
        use: [
          { loader: 'vue-loader' },
          {
            loader: 'vue-svg-inline-loader',
            options: {
              svgo: {
                plugins: [{ mergePaths: false }, { removeViewBox: false }],
              },
            },
          },
        ],
      },
    ],
  },

  devServer: {
    compress: true,
    host: localDomain,
    server: {
      type: isUsingHTTPS && secureLocalDomain ? 'https' : 'http',
      options: secureLocalDomain,
    },
    port: 8080,
    client: {
      overlay: {
        warnings: false,
        errors: true,
      },
    },
    devMiddleware: {
      publicPath: PATHS.public,
      writeToDisk: true,
    },
    proxy: {
      '**': {
        target: localURL,
        secure: false,
        headers: {
          'X-Dev-Server-Proxy': localURL,
        },
        // Modify CSP header to allow for hot-updating
        onProxyRes: (proxyRes) => {
          if ('content-security-policy' in proxyRes.headers) {
            // eslint-disable-next-line no-param-reassign
            proxyRes.headers['content-security-policy'] = proxyRes.headers[
              'content-security-policy'
            ].replace('connect-src', `connect-src wss://${localDomain}:8080`);
          }
        },
      },
    },
  },

  optimization: {
    minimize: isProd,
    minimizer: [`...`, new CssMinimizerPlugin()],
    splitChunks: {
      minChunks: 1,
      minSize: 0,
      chunks: 'all',
      cacheGroups: {
        // Create a vendor file, which is usually updated less often
        // Should be cached longer, includes all node_modules, excluding polyfills
        // Exclude others by adding them within `(?!)` with a `|`
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/](?!whatwg-fetch|core-js)/,
        },
        defaultVendors: false,
        default: false,
      },
    },
  },

  watchOptions: {
    aggregateTimeout: 200,
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
