const electron = {
  ipcRenderer: {
    on: jest.fn(),
    send: jest.fn(),
  },
  remote: {
    getGlobal(variableName) {
      return global[variableName];
    },
  },
};

module.exports = electron;
