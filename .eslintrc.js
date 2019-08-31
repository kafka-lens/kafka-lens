module.exports = {
  parser: 'babel-eslint',
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
    'plugin:react/recommended',
    // 'plugin:import/react',
  ],
  plugins: ['prettier'],
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  rules: {
    'prettier/prettier': 'error',
    'max-len': ['warn', { code: 100 }],
    semi: ['error', 'always'],
    camelcase: 'error',
    indent: ['error', 2, { SwitchCase: 1 }],
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false,
      },
    ],
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true,
      },
    ],
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'no-console': 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.test.{js,jsx}', 'setupTests.js', '*.config.js'] },
    ],
  },
  settings: {
    'import/resolver': {
      node: {},
      webpack: {},
    },
  },
  overrides: [
    {
      files: ['*.test.jsx'],
      rules: {
        'react/jsx-props-no-spreading': 'off',
      },
    },
  ],
};
