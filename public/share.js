//Get current user from session storage
if (sessionStorage.getItem('username')){
    var user = sessionStorage.getItem('username');
    document.querySelector('body').classList.remove('d-none');
} else {
    alert("Please login to continue");
    window.location.replace("index.html");
}

document.querySelector('h1').textContent = `${user}'s NameTag`;

let tmpTagId = '';
let link = '';
const timerTime = 600000;

let socket = configWebSocket();

// Check if tmpTagId is still valid
if (new Date().getTime() < localStorage.getItem('expireTime')) {
    tmpTagId = localStorage.getItem('tmpTagId');
    link = 'https://startup.nametag.click/tag.html?tmpId=' + tmpTagId;
    generateQR();
    timer(timerTime, localStorage.getItem('expireTime')-timerTime);
} else {
    reqNewTag(socket);
}

function configWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    socket.onopen = (event) => {
        console.log('Connected to server');
    };
    socket.onclose = (event) => {
        console.log('Disconnected from server');
        localStorage.setItem('tmpTagId', tmpTagId);
    };
    socket.onmessage = async (event) => {
        if (event.data.charAt(0) == 'F') {
            console.log('Failed to generate tmpTagId');
        } else if (event.data.charAt(0) == 'T'){
            tmpTagId = event.data.substring(1);
            link = 'https://startup.nametag.click/tag.html?tmpId=' + tmpTagId;
            generateQR();
            newTimer(timerTime);
        }
        //const msg = JSON.parse(await event.data.text());
        //console.log(msg);
    };
    return socket;
}

function reqNewTag(socket) {
    fetch(`/api/user/${user}`)
    .then((response) => response.json())
    .then((data) => {
        if (data.authenticated) {
            socket.send(JSON.stringify(data.username));
        }
    });
}

function newTimer(timerTime) {
    let beginningDate = new Date().getTime();
    timer(timerTime, beginningDate);

    localStorage.setItem('expireTime', beginningDate + timerTime);
}

function timer(timerTime, beginningDate) {  
    interval = setInterval(progressBar, 100);
  
    function progressBar() {
        var milisFromBegin = new Date().getTime() - beginningDate;
        var width = milisFromBegin / timerTime * 100;
        document.getElementById('progress').style.width = `${width}%`;
        showCountdown(timerTime - milisFromBegin);
  
        if (width >= 100) {
            clearInterval(interval);
            document.getElementById('progress').style.width = '0%';
            reqNewTag(socket);
        }
    }
}

function showCountdown(milis) {
    if (milis > 60000*2) {
        document.querySelector('span').textContent = `${Math.floor(milis/60000)}mins ${Math.floor((milis%60000)/1000)}s`;
    } else if (milis > 60000) {
        document.querySelector('span').textContent = `${Math.floor(milis/60000)}min ${Math.floor((milis%60000)/1000)}s`;
    } else {
        document.querySelector('span').textContent = `${Math.floor(milis/1000)}s`;
    }
}

function generateQR() {
    fetch(`https://api.qrserver.com/v1/create-qr-code/?data=${link}&size=500x500&margin=15`)
    .then((response) => response.blob())
    .then((data) => {
        const imgEl = document.getElementById('qr');
        imgEl.style.filter = 'blur(0px)';
        imgEl.setAttribute('src', URL.createObjectURL(data));      
    });
}

function copyLink() {
    navigator.clipboard.writeText(link);
    alert(`Copied link for ${user}`);
}

//animations
const navbar = document.querySelector('nav');
//navbar.style.transition = 'ease-in-out 0.3s';
window.onscroll = () => {
    if (window.scrollY > 10) {
        navbar.style.backgroundColor = 'rgb(255, 255, 255, 1)'
        navbar.classList.add('border-bottom');
    } else {
        navbar.style.backgroundColor = 'rgb(255, 255, 255, 0)'
        navbar.classList.remove('border-bottom');
    }
};