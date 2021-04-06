const {ipcRenderer} = require('electron') // 用于进程间通信
const Timer = require('timer.js')

// const { Notification, document, setTimeout, alert } = require('globalthis/implementation')


function startWork() {
    let workTimer = new Timer({
        ontick: (data) => {
            updateTime(data)
        },
        onend: () => {
            notification()
        }
    })
    workTimer.start(5)
}

function updateTime(ms) {
    let timerContainer = document.getElementById('timer-container')
    console.log(ms, '========')
    let s = (ms / 1000).toFixed(0)
    let ss = s % 60
    let mm = (s / 60).toFixed(0)

    timerContainer.innerText = `${mm.toString().padStart(2,0)} : ${ss.toString().padStart(2,0)}`;
}

async function notification() {
    
    let res = await ipcRenderer.invoke('work-notification')
    if (res === 'rest') {
        console.log('rest !!!!')
        setTimeout(() => {
            alert('休息')
        }, 5000)
    } else if (res === 'work'){
        startWork();
    }
}

startWork();