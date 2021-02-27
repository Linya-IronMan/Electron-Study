const {ipcRenderer} = require('electron')
const { Notification, document, setTimeout, alert } = require('globalthis/implementation')
// timer.js 
const Timer = require('timer.js')

function startWork() {
    new Timer({
        ontick: () => {
            updateTimer()
        },
        onend: () => {
            Notification()
        }
    })
    workTimer.start(10)
}

function updateTime(ms) {
    let timerContainer = document.getElementById('timer-container')
    timerContainer.innerText = ms;
}

async function notification() {
    let res = await ipcRenderer.invoke('work-notification')
    if (res === 'rest') {
        setTimeout(() => {
            alert('休息')
        }, 5000)
    } else if (res === 'work'){
        startWork();
    }
}

startWork();