const { app, BrowserWindow, nativeImage, ipcMain } = require('electron')
const fs = require('fs');


const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 540,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  win.setIcon(nativeImage.createFromPath('auto-linkedin-app-icon.png'))

  
  ipcMain.on('load-hub', () => {
    win.setSize(800, 540)
    win.loadFile('templates/hub.html');
  });
  
  ipcMain.on('load-login', () => {
    try { fs.rmSync('cache/cookies.json') }
    catch (e) { console.error(e); }

    win.setSize(500, 700)
    win.loadFile('templates/login.html');
  });

  
  if (!fs.existsSync('cache/cookies.json'))  {
    win.setSize(500, 700)
    win.loadFile('templates/login.html')

  }
  else win.loadFile('templates/hub.html')

  win.center();
}



app.whenReady().then(() => {
  createWindow()
})