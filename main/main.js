const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const path = require('path');
const url = require('url');

const adminApi = require('./kafka/adminApi');
const offsetApi = require('./kafka/offsetApi');
const consumerApi = require('./kafka/consumerApi');
const brokerApi = require('./kafka/brokerApi');
const logger = require('./utils/logger');

process.env.DEBUG = false;

// * Disable error dialogs by overriding
// * FIX: https://goo.gl/YsDdsS
dialog.showErrorBox = (title, content) => {
  logger.log(`${title}\n${content}`);
};

// * Stores reference to active consumers for disconnecting when needed
let currConsumerGroupShutdownMethod;

// * Creates a new window
let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({ show: false });
  mainWindow.maximize();
  mainWindow.show();
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, '../client/dist/index.html'),
      protocol: 'file',
      slashes: true,
    }),
  );
  mainWindow.on('closed', () => app.quit());

  // Building menu
  const devToolsMenuTemplate = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Quit',
          accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
          click() {
            app.quit();
          },
        },
        {
          label: 'DevTools',
          accelerator: process.platform === 'darwin' ? 'Command+Shift+I' : 'Ctrl+Shift+I',
          click() {
            mainWindow.webContents.openDevTools();
          },
        },
      ],
    },
  ];
  const mainMenu = Menu.buildFromTemplate(devToolsMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// When the window is closed but the app is still running in the background,
// create new window upon activation
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/*
 *
 * EVENT LISTENERS ARE HERE
 *
 */

// * Listens for URI string from client connection page
ipcMain.on('topic:getTopics', (e, kafkaHostUri) => {
  adminApi
    .getTopicData(kafkaHostUri)
    .then(result => mainWindow.webContents.send('topic:getTopics', result))
    .catch(error => {
      if (error === 'ignore') return logger.log('ignored getTopicData');
      return mainWindow.webContents.send('topic:getTopics', { error });
    });
});

/**
 * @param {Object} e is event
 * @param {{topicName, kafkaHostURI, partitionId, offset}} offset and partition are optional args
 */
ipcMain.on('partition:getMessages', (e, args) => {
  logger.log('get msg request received', args);
  if (currConsumerGroupShutdownMethod) currConsumerGroupShutdownMethod();
  currConsumerGroupShutdownMethod = consumerApi.getMessagesFromTopic(
    args.kafkaHostURI,
    args.topicName,
    mainWindow,
    args.partitionId,
  );
});

ipcMain.on('partition:getData', (e, args) => {
  const results = [];
  results[0] = offsetApi.getLatestOffset(args.kafkaHostURI, args.topicName, args.partitionId);
  results[1] = offsetApi.getEarliestOffset(args.kafkaHostURI, args.topicName, args.partitionId);
  results[2] = adminApi.getPartitionMsgCount(args.kafkaHostURI, args.topicName, args.partitionId);
  results[3] = adminApi.getPartitionBrokers(args.kafkaHostURI, args.topicName, args.partitionId);

  Promise.all(results).then(result => {
    const data = {
      highwaterOffset: result[0],
      earliestOffset: result[1],
      msgCount: result[2],
      leader: result[3][0],
      replicas: result[3][1],
    };
    mainWindow.webContents.send('partition:getData', data);
  });
});

ipcMain.on('broker:getBrokers', (e, args) => {
  logger.log('broker:getBrokers received in main.js args:', args);
  brokerApi
    .getBrokerData(args.kafkaHostURI)
    .then(data => mainWindow.webContents.send('broker:getBrokers', data))
    .catch(error => mainWindow.webContents.send('broker:getBrokers', { error }));
  setInterval(() => {
    brokerApi
      .getBrokerData(args.kafkaHostURI)
      .then(data => mainWindow.webContents.send('broker:getBrokers', data))
      .catch(error => mainWindow.webContents.send('broker:getBrokers', { error }));
  }, 10000);
});
