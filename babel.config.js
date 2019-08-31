const electronVersion = require('electron/package.json').version;

const developmentEnvironments = ['development', 'test'];

module.exports = api => {
  const isDevelopment = api.env(developmentEnvironments);
  api.cache(true);

  const presets = [
    ['@babel/preset-env', { targets: { electron: electronVersion } }],
    ['@babel/preset-react', { development: isDevelopment }],
  ];
  const plugins = isDevelopment ? ['react-hot-loader/babel'] : [];

  return {
    presets,
    plugins,
  };
};
