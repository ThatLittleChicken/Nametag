if (sessionStorage.getItem('username')){
    var user = sessionStorage.getItem('username');
    document.querySelector('body').classList.remove('d-none');
} else {
    alert("Please login to continue");
    window.location.replace("index.html");
}

let link = 'https://startup.nametag.click/tag.html?user=' + user;

let socket = configWebSocket();
generateQR();
timer();

function configWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    socket.onopen = (event) => {
        console.log('Connected to server');
    };
    socket.onclose = (event) => {
        console.log('Disconnected from server');
    };
    socket.onmessage = async (event) => {
        if (event.data.charAt(0) == 'F') {
            console.log('Failed to generate tmpTagId');
        } else {
            console.log(event.data.substring(1));
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

async function timer() {
    let progress = 0;
    let interval = setInterval(() => {
        progress += .1;
        progress = Math.round(progress * 10) / 10;
        document.getElementById('progress').style.width = `${progress}%`;
        if (progress >= 100) {
            clearInterval(interval);
            document.getElementById('progress').style.width = `0%`;
            setTimeout(() => {
                generateQR();
                timer();
            }, 1000);
        }
    }, 50);
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