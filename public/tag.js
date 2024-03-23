//Get user
let user = getUserQueryString();

let userData = {};
if (user) {
    getUserData().then((data) => {userData = JSON.parse(data); showUserData();});
} else {
    userData = {name: 'John Doe', phone: '800 123 4567', email: 'johndoe@gmail.com', insta: '@john_doe', fb: '', x: '', linkedin: '@john_doe', others: ''};
    showUserData();
}

setInterval(() => {
    userData.name = `${randomString(Math.random()*10)} ${randomString(Math.random()*10)}`;
    showUserData();
}, 1000);

function randomString(length) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

//Get user data
async function getUserData() {
    let userData = {};
    try {
        const response = await fetch(`/api/userData?username=${user}`);
        userData = await response.json();
        
        localStorage.setItem('userData', JSON.stringify(userData));
    } catch {
        userData = localStorage.getItem('userData') ?? {};
    }
    return userData;
}

//Show user data for tag
function showUserData() {
    for (let key in userData) {
        if (key == "username" || key == "ip") continue;
        let elF = document.getElementById(`${key}F`);
        
        if (elF && elF.tagName == "LI" && userData[key] == "") {
            elF.remove();
        } else if (elF) {
            elF.textContent = socialName(userData[key],`${key}F`);
        } else if (!elF && userData[key] != "") {
            addList(userData[key],`${key}F`);
        } 
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

//Get query string
function getUserQueryString() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
    return params.user;
}