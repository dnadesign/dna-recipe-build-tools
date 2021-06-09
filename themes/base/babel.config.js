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
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
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
