module.exports = {
  sourceType: 'unambiguous',
  presets: [['@babel/preset-env'], 'airbnb'],
  plugins: [
    [
      'polyfill-corejs3',
      {
        method: 'usage-global',
        version: '3.24',
      },
    ],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-runtime',
    'react-html-attrs',
  ],
  env: {
    dev: { plugins: [] },
    test: {
      plugins: [
        [
          '__coverage__',
          {
            ignore: '*.test.*',
          },
        ],
      ],
    },
  },
};
