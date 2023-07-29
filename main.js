const { app, BrowserWindow, ipcMain } = require('electron')
const isDev=require("electron-is-dev")
// include the Node.js 'path' module at the top of your file
const path = require('path')

// modify your existing createWindow() function
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    // webPreferences: {
    //   preload: path.join(__dirname, 'preload.js')
    // }
  })
  win.loadURL('http://localhost:3000')
  // win.loadFile("src/build/index.html")
  // if(isDev){
  //   //Development mode
  //   win.loadURL('http://localhost:3000')

  // }else{
  //   //Production Mode
  //   win.loadFile("src/build/index.html")
  // }
}

app.whenReady().then(() => {
    // createWindow()
  })

  
  // Add a handler for the silent-print ipc message
  // ipcMain.on('', (event) => {
  //   event.reply
  // })
  // ipcMain.on('silent-print', (event) => {
  //   // Print the window silently
  //   event.sender.print({silent: true}, (success, failureReason) => {
  //     // Signal that the print is finished
  //     event.reply('silent-print-result', success ? 'success' : failureReason);
  //   });
  // });

