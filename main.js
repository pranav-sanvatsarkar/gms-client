const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
var request = require('request');
var authUtility = require('./server_js/auth-utility');
var sessionInfo;
var sessionInfo = async function () {
    try {
        sessionInfo = await authUtility.getSessionInfo();
    } catch (ex) {
        console.log(ex);
    }
}
sessionInfo();

function createWindow() {
    var webPreferences = {
        preload: [
            path.resolve(__dirname, './client_js/index.js'),
            path.resolve(__dirname, './client_js/database-utility.js')
        ],
        devTools: true
    };
    win = new BrowserWindow({ width: 1000, height: 800, webPreferences: webPreferences });
    win.loadFile('index.html');
    win.webContents.openDevTools();
}

ipcMain.on('getAccounts', function (event, arg) {
    request(options, function (error, response, body) {
        event.sender.send('getAccountsResponse', JSON.parse(body));
    });
});

app.on('ready', createWindow);