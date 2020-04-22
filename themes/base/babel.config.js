module.exports = {
  sourceType: 'unambiguous',
  presets: [['airbnb']],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }]
  ],
};
