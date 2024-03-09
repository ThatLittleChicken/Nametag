if (sessionStorage.getItem('user')){
    var user = JSON.parse(sessionStorage.getItem('user'));
} else {
    alert("Please login to continue");
    window.location.replace("index.html");
}

let link = 'https://startup.nametag.click/tag.html?user=' + user;

function copyLink() {
    navigator.clipboard.writeText(link);
    alert(`Copied link for ${user}`);
}

generateQR();
timer();

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

