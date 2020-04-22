// Import settings from `.env` file
require('dotenv').config();

// —————————
// constants
// —————————
// Customise these as desired

const theme = 'base';
const defaultLocalDomain = 'dna.test';

// Path definitions
const PATHS = {
  src: './src', // where source files are stored
  dist: './dist', // where generated files are stored
  static: './static', // where static files are stored
  templates: './templates', // where template files are stored
  public: `/themes/${theme}/dist` // where files are served from
};
module.exports.PATHS = PATHS;

// Feature detection
const isUsingHTTPS =
  'WEBPACK_SSL_ENABLE' in process.env ? process.env.WEBPACK_SSL_ENABLE : false;
module.exports.isUsingHTTPS = isUsingHTTPS;

// The domain name for local development (Used for webpackDevServer)
const localDomain =
  'WEBPACK_DOMAIN' in process.env
    ? process.env.WEBPACK_DOMAIN
    : defaultLocalDomain;
const localURL = `http${isUsingHTTPS ? 's' : ''}://${localDomain}`;
module.exports.localDomain = localDomain;
module.exports.localURL = localURL;

const secureLocalDomain = {
  key: process.env.WEBPACK_SSL_KEY,
  cert: process.env.WEBPACK_SSL_CERT,
  ca: process.env.WEBPACK_SSL_CA
};
module.exports.secureLocalDomain = secureLocalDomain;
