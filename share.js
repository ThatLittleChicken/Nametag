if (sessionStorage.getItem('user')){
    var user = JSON.parse(sessionStorage.getItem('user'));
} else {
    alert("Please login to continue");
    window.location.replace("index.html");
}

document.getElementById('copy').addEventListener('click', () => {
    navigator.clipboard.writeText('https://startup.nametag.click/tag.html?user=' + user);
    alert(`Copied link for ${user}`);
});

timer();

async function timer() {
    let progress = 0;
    let interval = setInterval(() => {
        progress += .1;
        progress = Math.round(progress * 10) / 10;
        document.getElementById('progress').style.width = `${progress}%`;
        if (progress >= 100) {
            clearInterval(interval);
            progress = 0;
            document.getElementById('progress').style.width = `${progress}%`;
            setTimeout(() => {
                timer();
            }, 1000);
        }
    }, 50);
}

