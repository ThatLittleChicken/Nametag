//Get current user from session storage
if (sessionStorage.getItem('username')){
    var user = sessionStorage.getItem('username');
    document.querySelector('body').classList.remove('d-none');
} else {
    alert("Please login to continue");
    window.location.replace("index.html");
}

document.getElementById('user').textContent = user;

let userData = {};
getUserData(user).then((data) => {
    userData = data; 
    showUserData();
});

//Update user data every update
let inputIdArray = ['name','phone','email','insta','fb','x','linkedin','others'];

inputIdArray.forEach((id) => {
    let el = document.getElementById(id);
    [ "input", "keydown", "keyup", "drop", "focusout" ].forEach(function(event) {
        el.addEventListener(event, () => {
            updateField(el,id);
            userData[id] = document.getElementById(id).value;
            saveUserData();
        });
    });
});

//Save user data
async function saveUserData() {
    try {
        const response = await fetch('/api/userData', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({username : user, ...userData}),
        });
        userData = await response.json();
        localStorage.setItem('userData', JSON.stringify(userData));
    } catch {
        localStorage.setItem('userData', JSON.stringify(userData));
    }
}

//Get user data
async function getUserData(user) {
    let userData = {};
    try {
        const response = await fetch(`/api/userData?username=${user}`);
        userData = await response.json();

        if (response.status == 404) {
            userData = {name: '', phone: '', email: '', insta: '', fb: '', x: '', linkedin: '', others: ''};
        }
         
        localStorage.setItem('userData', JSON.stringify(userData));
    } catch {
        userData = localStorage.getItem('userData') ?? {};
    }
    return userData;
}

//Check user data and update fields
function showUserData() {
    for (let key in userData) {
        let el = document.getElementById(key);
        if (!el) continue;
        el.value = userData[key];
        updateField(el,key);
    }
}

function updateField(el,id){
    id = id + "F";
    let elF = document.getElementById(id);

    if (id == "phoneF") {
        el.value = el.value.replace(/[^(0-9\(\)\-) ]/g, '');
    }
    if (id == "emailF") {
        el.value = el.value.replace(/[^a-zA-Z0-9@.]/g, '');
    }

    if (elF && elF.tagName == "LI" && el.value == "") {
        elF.remove();
    } else if (elF) {
        elF.textContent = socialName(el.value,id);
    } else if (!elF && el.value != "") {
        addList(el.value,id);
    } 
}

function socialName(text, id) {
    switch(id){
        case "instaF":
            text.includes("Instagram:") ? text : text = `Instagram: ${text}`;
            break;
        case "fbF":
            text.includes("Facebook:") ? text : text = `Facebook: ${text}`;
            break;
        case "xF":
            text.includes("X/Twitter:") ? text : text = `X/Twitter: ${text}`;
            break;
        case "linkedinF":
            text.includes("LinkedIn:") ? text : text = `LinkedIn: ${text}`;
            break;
        case "othersF":
            text.includes("Others:") ? text : text = `Others: ${text}`;
            break;
        default:
            break;
    }
    return text;
}

//Add list to ul for socials
const ul = document.querySelector('ul');

function addList(text,id){
    text = socialName(text,id);
    const li = document.createElement('li')
    li.textContent = text;
    li.id = id;
    ul.appendChild(li);
}

//Logout
function logout() {
    fetch('/api/auth/logout', {
        method: 'delete',
    }).then(() => {
        sessionStorage.removeItem('username');
        window.location.href = 'index.html';
    });
}