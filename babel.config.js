const electronVersion = require('electron/package.json').version;

module.exports = api => {
  api.cache(true);

  const presets = [
    ['@babel/preset-env', { targets: { electron: electronVersion } }],
    '@babel/preset-react',
  ];
  const plugins = [];

  return {
    presets,
    plugins,
  };
};
