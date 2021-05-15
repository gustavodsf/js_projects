'use strict';

var app = require('electron').app;
const {BrowserWindow} = require('electron')

var mainWindow = null;

app.on('ready', function() {
    let win = new BrowserWindow({width: 800, height: 600,fullscreen: true,nodeIntegration: false})
    win.on('closed', () => {
      win = null
    })
    win.loadURL('file://' + __dirname + '/app/index.html');
    win.$ = require('jquery');
});
