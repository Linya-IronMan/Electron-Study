const { app, BrowserWindow } = require('electron')

let win;

app.on('ready', () => {
    win = new BrowserWindow({
        width: 300,
        height: 300,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile('./index.html')
    setTimeout(handleIPC, 500)
})

function handleIPC() {
    win.webContents.send('do-some-render-work');
}