const Normalize = require('postcss-normalize');
const InlineSVG = require('postcss-inline-svg');
const Autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [Normalize(), InlineSVG(), Autoprefixer()]
};
