const { app, BrowserWindow, ipcMain, Notification } = require('electron'); // 作用？
// const { Promise } = require('globalthis/implementation');
const { resolve } = require('path');

let win; // 设置一个全局变量存储 BrowserWindow 实例，否则会被垃圾回收掉

app.on('ready', () => {
    win = new BrowserWindow({
        width: 300,
        height: 300,
        webPreferences: {
            nodeIntegration: true // 新版本中默认将node禁用（为了安全的考虑），但是这里会用到本地文件，所以打开
        }
    })

    win.loadFile('./index.html') // loadURL 加载远程页面
    setTimeout(handleIPC, 500)
})

function handleIPC() {
    win.webContents.send('do-some-render-work');

    ipcMain.handle('work-notification', async function() {
        let res = await new Promise((resolve, reject) => {
            let notification = new Notification({
                title: '任务结束',
                body: '是否开始休息',
                actions: [{ text: '开始休息', type: 'button' }], // 这段在windows 下没有什么作用
                closeButtonText: '继续工作' // 这个也是 只在 MacOS 下有可用。
            })
            notification.show()
            notification.on('action', () => { // 点击 无用
                resolve('rest')
            })
            notification.on('click', () => {
                console.log('click happen')
                resolve('rest')
            })
            notification.on('close', () => { // 点击了关闭按钮
                console.log('close happen')
                resolve('work')
            })
        })
        return res
        
    })
   
}
