const {
  localURL,
  localDomain,
  isUsingHTTPS,
  secureLocalDomain,
  PATHS
} = require('./webpack.env.js');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const {
  FriendlyErrorsWebpackPlugin
} = require('@artemir/friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PrettierPlugin = require('prettier-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const WebpackBar = require('webpackbar');
const path = require('path');
const { ProvidePlugin } = require('webpack');

const isProd = process.env.NODE_ENV === 'production';
const isWatching =
  process.argv.includes('serve') || process.argv.includes('watch');

module.exports = {
  mode: isProd ? 'production' : 'development',

  devtool: isProd ? false : 'source-map',

  stats: isProd && { colors: true, assets: false, modules: false },

  // Temporary fix for serve
  target: isProd ? 'browserslist' : 'web',

  entry: {
    main: `${PATHS.src}/js/index.js`,
    editor: `${PATHS.src}/js/editor.js`
  },

  output: {
    path: path.resolve(__dirname, PATHS.dist),
    filename: isProd ? '[name].[contenthash].bundle.js' : '[name].bundle.js',
    publicPath: PATHS.public,
    // Generate with IE11 compat
    environment: {
      arrowFunction: false,
      bigIntLiteral: false,
      const: false,
      destructuring: false,
      dynamicImport: false,
      forOf: false,
      module: false
    }
  },

  resolve: {
    extensions: ['.js', '.jsx', '.vue'],
    alias: {
      modernizr: path.resolve(__dirname, './.modernizrrc.js'),
      'tiny-slider': 'tiny-slider/src/tiny-slider',
      vue: 'vue/dist/vue.esm.js'
    },
    fallback: {
      url: require.resolve('url/'),
      punycode: require.resolve('punycode/')
    }
  },

  plugins: [
    // Write information about generated files
    new AssetsPlugin({
      includeAllFileTypes: false,
      path: path.resolve(__dirname, PATHS.dist),
      prettyPrint: true
    }),

    // Removes/cleans build folders and unused assets when rebuilding.
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
      cleanOnceBeforeBuildPatterns: ['**/*', '!webpack-assets.json']
    }),

    // Copies files from target to destination folder.
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: `${PATHS.static}/images`,
    //       to: 'static/images'
    //     },
    //     {
    //       from: `${PATHS.static}/favicons`,
    //       to: 'static/favicons'
    //     },
    //     {
    //       from: `${PATHS.static}/svg`,
    //       to: 'static/svg'
    //     }
    //   ]
    // }),

    // Apply consistent coding style guidelines for javascript
    new ESLintPlugin({
      context: PATHS.src,
      fix: true,
      extensions: ['js', 'jsx', 'vue']
    }),

    // Makes webpack CLI output more readable
    new FriendlyErrorsWebpackPlugin({ clearConsole: false }),

    new MiniCssExtractPlugin(),

    // Exposes global variables to other files
    new ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      DO: [
        path.resolve(__dirname, `${PATHS.src}/js/jquery/do.src.js`),
        'default'
      ]
    }),

    // Apply consistent coding style guidelines, don't run when watching as it's slow
    isWatching ? () => {} : new PrettierPlugin(),

    // Apply consistent coding style guidelines for (s)css
    new StylelintPlugin({
      files: `${PATHS.src}/**/*.((c|sa|sc)ss)`,
      fix: true
    }),

    new VueLoaderPlugin(),

    new WebpackBar({
      name: isProd ? 'prod' : 'dev',
      color: 'blue',
      fancy: true
    })
  ],

  // Module
  module: {
    rules: [
      // JavaScript – use Babel to transpile JavaScript files.
      {
        test: /\.(jsx?)$/,
        exclude: /(node_modules\/(?![gmap-vue])|vendor|modernizr.js)/,
        use: [{ loader: 'babel-loader' }, { loader: 'import-glob-loader2' }]
      },

      // Modernizr – generate modernizr.js from .modernizrrc.js
      {
        test: /\.modernizrrc\.js$/,
        loader: 'webpack-modernizr-loader'
      },

      // Styles – inject CSS into the head with source maps
      {
        test: /\.((c|sa|sc)ss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          { loader: 'resolve-url-loader' },
          // sourceMap always required on loaders preceding resolve-url-loader
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
          { loader: 'import-glob-loader2', options: { sourceMap: true } }
        ]
      },

      // Fonts and images – Copy files to build folder
      {
        test: /\.(ico|gif|png|jpe?g|svg|webp|woff2?)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      },

      // Vue template
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },

      // Vue SVG loading
      {
        test: /\.svg$/,
        issuer: /\.vue$/,
        use: [
          'babel-loader',
          {
            loader: 'vue-svg-loader',
            options: {
              svgo: {
                plugins: [{ mergePaths: false }, { removeViewBox: false }]
              }
            }
          }
        ]
      }
    ]
  },

  devServer: {
    compress: true,
    host: localDomain,
    hot: true,
    https: isUsingHTTPS && secureLocalDomain,
    port: 8080,
    publicPath: PATHS.public,
    quiet: true,
    writeToDisk: true,
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

  optimization: {
    minimize: isProd,
    minimizer: [`...`, new CssMinimizerPlugin()],
    splitChunks: {
      minChunks: 1,
      minSize: 0,
      chunks: 'all',
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/](?!whatwg-fetch|core-js)/
        },
        defaultVendors: false,
        default: false
      }
    }
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};
