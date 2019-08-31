const electronVersion = require('electron/package.json').version;

const developmentEnvironments = ['development', 'test'];

module.exports = api => {
  api.cache(true);
  const isDevelopment = api.env(developmentEnvironments);

  const presets = [
    ['@babel/preset-env', { targets: { electron: electronVersion } }],
    '@babel/preset-react',
  ];
  const plugins = isDevelopment ? ['react-hot-loader/babel'] : [];

  return {
    presets,
    plugins,
  };
};
