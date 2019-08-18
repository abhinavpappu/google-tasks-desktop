const { app, BrowserWindow } = require('electron');

let win

function createWindow() {
  win = new BrowserWindow({
    width: 400,
    height: 700,
    webPreferences: {
      webSecurity: false
    }
  });

  win.removeMenu();

  const webContents = win.webContents;

  win.on('closed', () => {
    win = null;
  });

  win.loadURL('https://calendar.google.com/calendar/r?opentasks=1')

  webContents.on('did-finish-load', function () {
    webContents.insertCSS(`
      .Kk7lMc-ae3xF {
        width: 100vw !important;
      }
    `);
    
    webContents.executeJavaScript(`
      setTimeout(() => {
        const $frame = document.querySelector('.Kk7lMc-ae3xF-L5Fo6c');
        console.log($frame);
        setTimeout(() => {
          const $head = $frame.contentWindow.document.head;
          console.log($head);
          $head.innerHTML += '<style>.G4zhSc, .CTxcDf { width: 100vw !important; }</style>'
        }, 1000);
      }, 1000);
    `)
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  app.quit();
})