const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const path = require('path');
const url = require('url');

const adminApi = require('./kafka/adminApi');
const offsetApi = require('./kafka/offsetApi');
const consumerApi = require('./kafka/consumerApi');
const brokerApi = require('./kafka/brokerApi');

// * Disable error dialogs by overriding
// * FIX: https://goo.gl/YsDdsS
dialog.showErrorBox = function(title, content) {
  console.log(`${title}\n${content}`);
};

// * Stores reference to active consumers for disconnecting when needed
const consumers = {};

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
      slashes: true
    })
  );
  mainWindow.on('closed', () => app.quit());

  // Building menu
  const mainMenu = Menu.buildFromTemplate(addDevToolsToMenu);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// * When window is closed but app is still running in the background, create new window upon activation
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// * Add Chrome dev tools menu
const addDevToolsToMenu = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Quit',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        }
      },
      {
        label: 'DevTools',
        click() {
          mainWindow.webContents.openDevTools();
        }
      }
    ]
  }
];

/*
 *
 * EVENT LISTENERS ARE HERE
 *
 */

// * Listens for Uri string from client connection page
ipcMain.on('topic:getTopics', (e, uri) => {
  adminApi.getTopicData(uri, mainWindow);
});

/**
 * @param {Object} e is event
 * @param {Object} args is an object that contains topic name, host, offset and partition are optional args
 */
ipcMain.on('partition:getMessages', (e, args) => {
  console.log('get msg request received', args);
  consumers[args.topicName] = consumerApi.getMessagesFromTopic(args.host, args.topicName, mainWindow);
});

ipcMain.on('partition:stopMessages', (e, args) => {
  consumers[args.topicName].disconnect();
});

ipcMain.on('partition:getData', (e, args) => {
  const results = [];
  results[0] = offsetApi.getLatestOffset(args.kafkaHostURI, args.topicName, args.partitionId);
  results[1] = offsetApi.getEarliestOffset(args.kafkaHostURI, args.topicName, args.partitionId);
  results[2] = adminApi.getPartitionMsgCount(args.kafkaHostURI, args.topicName, args.partitionId);

  Promise.all(results).then(result => {
    const data = {
      highwaterOffset: result[0],
      earliestOffset: result[1],
      msgCount: result[2]
    };
    mainWindow.webContents.send('partition:getData', data);
  });
});

ipcMain.on('broker:getBrokers', (e, args) => {
  console.log('broker:getBrokers received in main.js args:', args);
  brokerApi.getBrokerData(args.kafkaHostURI, mainWindow);
})
