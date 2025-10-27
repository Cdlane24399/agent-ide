const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { handleInput } = require('./agents/myAgent.js');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  win.loadFile('renderer/index.html');
}

app.whenReady().then(createWindow);

ipcMain.handle('run-agent', async (event, userInput) => {
  try {
    const output = await handleInput(userInput);
    return { success: true, output };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
