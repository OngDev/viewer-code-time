const { BrowserWindow, Menu } = require("electron");

const createAppWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
    });

    const menuTemplate = [{
        label: 'file',
        submenu: [
            { role: 'quit' },
            { role: 'close' }
        ]
    },
    {
        label: 'tools',
        submenu: [
            { role: 'toggleDevTools' }
        ]
    },
    ];
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);

    win.loadFile("./renderers/home.html");

    win.on("closed", () => {
        win = null;
    });
};

module.exports = createAppWindow;