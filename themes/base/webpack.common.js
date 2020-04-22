// Based on https://github.com/taniarascia/webpack-boilerplate

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { StatsWriterPlugin } = require('webpack-stats-plugin');
const { PATHS } = require('./webpack.env');
const path = require('path');

module.exports = {
  entry: [`${PATHS.src}/js/index.jsx`],
  output: {
    path: path.resolve(__dirname, PATHS.dist),
    filename: '[name].bundle.js',
    publicPath: PATHS.public
  },
  stats: 'none',
  plugins: [
    // Makes webpack CLI output more readable
    new FriendlyErrorsWebpackPlugin(),
    // Removes/cleans build folders and unused assets when rebuilding.
    new CleanWebpackPlugin(),
    // Copies files from target to destination folder.
    new CopyWebpackPlugin([
      {
        from: PATHS.static,
        to: 'assets',
        ignore: ['*.DS_Store']
      },
      {
        from: './favicons',
        to: '',
        ignore: ['*.DS_Store']
      }
    ]),
    // Apply consistent coding style guidelines for (s)css
    new StylelintPlugin({
      files: `${PATHS.src}/**/*.s?(a|c)ss`
    }),
    // Write information about generated files
    new StatsWriterPlugin()
  ],

  module: {
    rules: [
      // JavaScript – use Babel to transpile JavaScript files.
      {
        test: /\.(vue|jsx?)$/,
        exclude: /(node_modules|vendor|modernizr.js)/,
        use: [
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: {
              enforce: 'pre',
              cache: false
            }
          }
        ]
      },

      // Modernizr – generate modernizr.js from .modernizrrc.js
      {
        test: /.modernizrrc.js$/,
        loader: 'webpack-modernizr-loader'
      },

      // Styles – inject CSS into the head with source maps
      {
        test: /\.(s?css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1 }
          },
          { loader: 'resolve-url-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
          { loader: 'import-glob-loader2', options: { sourceMap: true } }
        ]
      },

      // Images – Copy image files to build folder
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          context: 'src' // prevent display of src/ in filename
        }
      },

      // Fonts – Inline font files if smaller than 10Kb,
      //          otherwise move to build folder
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        loader: 'url-loader',
        options: {
          limit: 10 * 1024, // 10Kb
          name: '[path][name].[ext]',
          context: 'src' // prevent display of src/ in filename
        }
      },

      // SVG - Allow for svg to be imported as react components
      {
        test: /\.svg$/,
        use: ['@svgr/webpack']
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      modernizr$: path.resolve(__dirname, `./.modernizrrc.js`)
    }
  }
};
