const { BrowserWindow } = require('electron');
const authService = require('../services/auth-service');
const envVariables = require("../env-variables");
const createAppWindow = require('../main/app-process');

let win = null;

const { redirectUri } = envVariables;

function createAuthWindow() {
    destroyAuthWin();

    win = new BrowserWindow({
        width: 400,
        height: 600,
        minWidth: 400,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: false,
            enableRemoteModule: false,
        },
    })

    win.loadURL(authService.getAuthenticationURL());

    const { session: { webRequest } } = win.webContents;

    console.log(redirectUri);
    const filter = {
        urls: [
            `${redirectUri}*`
        ]
    };

    webRequest.onBeforeRequest(filter, async ({ url }) => {
        await authService.loadTokens(url);
        createAppWindow();
        return destroyAuthWin();
    });

    win.on('authenticated', () => {
        destroyAuthWin();
    });

    win.on('closed', () => {
        win = null;
    });
}

function destroyAuthWin() {
    if (!win) return;
    win.close();
    win = null;
}

function createLogoutWindow() {
    const logoutWindow = new BrowserWindow({
        show: false,
    });

    logoutWindow.loadURL(authService.getLogOutUrl());

    logoutWindow.on('ready-to-show', async () => {
        logoutWindow.close();
        await authService.logout();
    });
}

module.exports = {
    createAuthWindow,
    createLogoutWindow,
};