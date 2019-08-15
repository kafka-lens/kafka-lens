module.exports = {
  parser: 'babel-eslint',
  extends: [
    'airbnb',
    'plugin:react/recommended',
    // 'plugin:import/react',
  ],
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  rules: {
    'max-len': ['warn', { code: 100 }],
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
    'no-plusplus': ["error", { "allowForLoopAfterthoughts": true }],
  },
  settings: {
    'import/resolver': {
      node: {},
      webpack: {},
    }
  },
  overrides: [
    {
      files: ['*.test.jsx'],
      rules: {
        'react/jsx-props-no-spreading': 'off',
      }
    }
  ]
};