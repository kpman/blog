module.exports = {
  parser: 'babel-eslint',
  extends: ['yoctol', 'prettier'],
  env: {
    node: true,
    jest: true,
  },
  plugins: ['import', 'prettier'],
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'array-callback-return': 'off',
    'react/prop-types': 'off',
    'react/jsx-wrap-multilines': 'off',
    'jsx-a11y/anchor-has-content': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
      },
    ],
  },
};
