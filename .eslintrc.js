module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    mocha: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'google',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    '@typescript-eslint/no-namespace': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'require-jsdoc': 0,
  },
};
