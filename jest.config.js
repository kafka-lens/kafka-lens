module.exports = {
  verbose: true,
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
  setupFiles: [
    './client/src/setupTests.js',
  ],
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/client/src/app/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/client/src/app/__mocks__/assetsTransformer.js',
    electron: '<rootDir>/client/src/app/__mocks__/electron.js',
  },
  moduleDirectories: [
    'node_modules',
  ],
  modulePaths: [
    '<rootDir>',
  ],
};
