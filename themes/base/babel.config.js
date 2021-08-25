module.exports = {
  sourceType: 'unambiguous',
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: { version: 3 }
      }
    ],
    'airbnb'
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-runtime',
    'react-html-attrs'
  ],
  env: {
    dev: { plugins: [] },
    test: {
      plugins: [
        [
          '__coverage__',
          {
            ignore: '*.test.*'
          }
        ]
      ]
    }
  }
};
