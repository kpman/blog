module.exports = {
  parser: 'babel-eslint',
  extends: ['yoctol', 'prettier'],
  env: {
    browser: true,
    node: true,
  },
  plugins: ['import', 'prettier'],
  rules: {
    'import/no-extraneous-dependencies': 'off',

    'array-callback-return': 'off',

    'react/prop-types': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',

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
