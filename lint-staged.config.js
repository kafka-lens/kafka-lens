module.exports = {
  '*.{js,jsx}': ['yarn --silent lint:fix', 'git add'],
  '*.{css,scss}': ['yarn --silent lint:css:fix', 'git add'],
};
