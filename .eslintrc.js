module.exports = {
  parser: 'babel-eslint',
  extends: [
    'airbnb',
    'plugin:react/recommended',
    // 'plugin:import/react',
  ],
  env: {
    'browser': true,
    'node': true,
  },
  rules: {
    semi: ['error', 'always'],
    camelcase: 'error',
    indent: ['error', 2],
    'prefer-const': [
      'error',
      {
        'destructuring': 'any',
        'ignoreReadBeforeAssign': false
      }
    ],
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true
      }
    ],
    'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
    'no-console': 'off',
  },
  'settings': {
    'import/resolver': 'webpack',
  }
};