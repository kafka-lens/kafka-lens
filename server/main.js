const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const path = require('path');
const url = require('url');

const adminApi = require('./kafka/adminApi');
const consumerApi = require('./kafka/consumerApi');

// Disable error dialogs by overriding
// FIX: https://goo.gl/YsDdsS
dialog.showErrorBox = function(title, content) {
  console.log(`${title}\n${content}`);
};

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 900, height: 680 });
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, '../client/dist/index.html'),
      protocol: 'file',
      slashes: true
    })
  );
  mainWindow.on('closed', () => (mainWindow = null));

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

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

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
      }
    ]
  },
  {
    label: 'Developer Tools',
    submenu: [
      {
        label: 'Toggle DevTools',
        accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: 'reload'
      }
    ]
  }
];

/*
 *
 * EVENT LISTENERS ARE HERE
 *
 *
 */
ipcMain.on('topic:getTopics', (e, uri) => {
  adminApi.getTopicData(uri, mainWindow);
});

ipcMain.on('topic:getPartitions', (e, args) => {
  adminApi.getPartitionData(args.uri, 'asdf', mainWindow);
});

ipcMain.on('partition:getTestMessages', (e, args) => {
  consumerApi.getMessagesFromPartition('asdf', 'test1', mainWindow);
});

ipcMain.on('partition:getMessages', (e, args) => {
  console.log('get msg request received', args);
  consumerApi.getMessagesFromPartition(
    args.host,
    args.topic,
    mainWindow,
    args.offset || undefined,
    args.partition || undefined
  );
});
