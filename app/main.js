const electron = require('electron');
const authService = require('./services/auth-service');
const {createAuthWindow} = require('./services/auth-process');
const createAppWindow = require('./main-window');

const { app, BrowserWindow, Menu, ipcMain } = electron;

async function showWindow() {
  try {
    await authService.refreshTokens();
    return createAppWindow();
  } catch (err) {
    createAuthWindow();
  }
}


app.on('ready', showWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

module.exports = {
    createAppWindow
}