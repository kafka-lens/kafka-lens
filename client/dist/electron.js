const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const {Menu} = electron;

const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 900, height: 680});
  mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, './index.html'),
      protocol: 'file',
      slashes: true
  }));
  mainWindow.on('closed', () => mainWindow = null);
  
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
        label: ''
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
]