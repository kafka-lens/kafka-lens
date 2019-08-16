const electron = {
  ipcRenderer: {
    on: jest.fn(),
    send: jest.fn(),
  },
};

module.exports = electron;
