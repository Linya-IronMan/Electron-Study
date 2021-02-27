const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const { Promise } = require('globalthis/implementation');
const { resolve } = require('path');

let win; // 设置一个全局变量存储 BrowserWindow 实例，否则会被垃圾回收掉

app.on('ready', () => {
    win = new BrowserWindow({
        width: 300,
        height: 300,
        webPreferences: {
            nodeIntegration: true // 新版本中默认将node禁用，但是这里会用到本地文件，所以打开
        }
    })

    win.loadFile('./index.html')
    setTimeout(handleIPC, 500)
})

function handleIPC() {
    win.webContents.send('do-some-render-work');

    ipcMain.handle('work-notification', async () => {
        let res = await new Promise((resolve, reject) => {
            let notification = new Notification({
                title: '任务结束',
                body: '是否开始休息',
                actions: [{ text: '开始休息', type: 'button' }],
                closeButtonText: '继续工作'
            })
            notification.show()
            notification.on('action', () => {
                resolve('rest')
            })
            notification.on('close', () => {
                resolve('work')
            })
        })
        return res
        
    })
   
}
