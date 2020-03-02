const mix = require('laravel-mix');
const { config } = require('laravel-mix');
require('laravel-mix-copy-watched');
const packageJson = require('./package.json');
const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Prettier = require('prettier-webpack-plugin');
const Stylelint = require('stylelint-webpack-plugin');
const Normalize = require('postcss-normalize');
const InlineSVG = require('postcss-inline-svg');
const Autoprefixer = require('autoprefixer');

// Import settings from `.env` file
require('dotenv').config();

// —————————
// constants
// —————————
// Customise these as desired

// Path definitions
const theme = 'base';
const PATHS = {
  src: `./themes/${theme}/src`, // where source files are stored
  dist: `./themes/${theme}/dist`, // where generated files are stored
  templates: `./themes/${theme}/templates`, // where template files are stored
  public: `/_resources/themes/${theme}/dist` // where files are served from
};

// Controls whether sourcemaps should be generated for production builds
const prodSourceMaps = false;

// Feature detection
const isUsingHTTPS =
  'MIX_SSL_ENABLE' in process.env ? process.env.MIX_SSL_ENABLE : false;
const isUsingHMR = config.hmr;

// The domain name for local development (Used for webpackDevServer and browsersync)
const localDomain =
  'MIX_DOMAIN' in process.env ? process.env.MIX_DOMAIN : 'ecc.test';
const localURL = `http${isUsingHTTPS && 's'}://${localDomain}`;

const secureLocalDomain = {
  key: process.env.MIX_SSL_KEY,
  cert: process.env.MIX_SSL_CERT,
  ca: process.env.MIX_SSL_CA
};

// Set of modernizr options to use for automatic modernizr customization
// Full list of supported options can be found in [config-all.json](https://github.com/Modernizr/Modernizr/blob/master/lib/config-all.json).
const modernizrConf = {
  'feature-detects': [],
  options: ['setClasses']
};

// ———
// mix
// ———
// Configures mix (and included tools)
// https://laravel-mix.com/docs/5.0/options
mix
  .options({
    postCss: [Autoprefixer(), Normalize(), InlineSVG()],
    hmrOptions: {
      host: localDomain,
      port: 8080
    },
    autoprefixer: {
      options: {
        browsers:
          'browserslist' in packageJson ? packageJson.browserslist : 'defaults'
      }
    }
  })
  // Fixes mix outputting an extra slash on some exports
  .override(wpConfig => {
    // eslint-disable-next-line no-param-reassign
    wpConfig.entry = Object.keys(wpConfig.entry).reduce((acc, key) => {
      acc[key.replace(/^\//, '')] = wpConfig.entry[key];
      return acc;
    }, {});
  })
  .disableSuccessNotifications()
  .setResourceRoot(PATHS.dist);

mix.webpackConfig({
  output: {
    publicPath: PATHS.public
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [`${PATHS.dist}/**/*`]
    }),
    new Stylelint({
      files: `${PATHS.src}/**/*.s?(a|c)ss`,
      fix: mix.inProduction()
    }),
    mix.inProduction() ? new Prettier() : () => {}
  ],
  module: {
    rules: [
      {
        loader: 'eslint-loader',
        test: /\.(vue|jsx?)$/,
        exclude: /(node_modules|vendor)/,
        enforce: 'pre',
        options: {
          cache: false,
          fix: mix.inProduction()
        }
      },
      {
        loader: 'webpack-modernizr-loader',
        options: modernizrConf,
        test: /modernizr\.js$/
      },
      {
        test: /\.scss$/,
        loader: 'import-glob-loader'
      }
    ]
  },
  resolve: {
    alias: {
      modernizr$: path.resolve(__dirname, `${PATHS.src}/js/modernizr.js`)
    }
  },
  devServer: {
    index: '',
    host: localDomain,
    https: isUsingHTTPS && secureLocalDomain,
    proxy: {
      '**': {
        target: localURL,
        changeOrigin: true,
        headers: {
          'X-Dev-Server-Proxy': localURL
        }
      }
    }
  }
});

// ———————————
// browsersync
// ———————————
// Configures browsersync
// https://browsersync.io/docs/options

if (!isUsingHMR) {
  mix.browserSync({
    open: false,
    host: localDomain,
    proxy: localURL,
    https: isUsingHTTPS && secureLocalDomain,
    files: [
      `${PATHS.dist}/**/*.ss`,
      `${PATHS.dist}/**/*.js`,
      `${PATHS.dist}/**/*.css`,
      `${PATHS.templates}/**/*.ss`
    ]
  });
}

// ———————————————
// file operations
// ———————————————
// Defines file operations

mix
  .copyWatched(`${PATHS.src}/img/favicons/*`, PATHS.dist)
  .sourceMaps(prodSourceMaps, 'source-map')
  .react(`${PATHS.src}/js/index.js`, PATHS.dist)
  .sass(`${PATHS.src}/scss/index.scss`, PATHS.dist)
  .sass(`${PATHS.src}/scss/editor.scss`, PATHS.dist);

// Vendor extraction does not work with HMR
if (!isUsingHMR) {
  mix.extract(['vue']);
}
