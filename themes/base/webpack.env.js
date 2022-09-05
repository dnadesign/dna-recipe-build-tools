// Import settings from `.env` file
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

// —————————
// constants
// —————————
// Customise these as desired

const theme = 'base';
const defaultLocalDomain = 'local.dna.co.nz';

// Path definitions
export const PATHS = {
  src: './src', // where source files are stored
  dist: './dist', // where generated files are stored
  static: './static', // where static files are stored
  templates: './templates', // where template files are stored
  public: `/_resources/themes/${theme}/dist/`, // where files are served from
};

// Feature detection
export const isUsingHTTPS =
  'WEBPACK_SSL_ENABLE' in process.env
    ? process.env.WEBPACK_SSL_ENABLE === 'true'
    : false;

// The domain name for local development (Used for webpackDevServer)
export const localDomain =
  'WEBPACK_DOMAIN' in process.env
    ? process.env.WEBPACK_DOMAIN
    : defaultLocalDomain;
export const localURL = `http${isUsingHTTPS ? 's' : ''}://${localDomain}`;

export const secureLocalDomain = {
  ca: process.env.WEBPACK_SSL_CA,
  cert: process.env.WEBPACK_SSL_CERT,
  key: process.env.WEBPACK_SSL_KEY,
};
