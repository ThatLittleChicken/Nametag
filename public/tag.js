//Data placeholder
let user = JSON.parse(sessionStorage.getItem('user')) ?? 'john_doe';

let allUserData;
getUserData();
allUserData[user] ? {} : allUserData[user] = {name: 'John Doe', phone: '800 123 4567', email: 'johndoe@gmail.com', insta: '@john_doe', fb: '', x: '', linkedin: '@john_doe', others: ''};

setInterval(() => {
    allUserData[user].name = `${randomString(Math.random()*10)} ${randomString(Math.random()*10)}`;
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
    allUserData = {};
    try {
        const response = await fetch('/api/allUserData');
        allUserData = await response.json();

        localStorage.setItem('allUserData', JSON.stringify(allUserData));
    } catch {
        allUserData = JSON.parse(localStorage.getItem('allUserData')) ?? {};
    }
    showUserData();
}

//Show user data for tag
function showUserData() {
    for (let key in allUserData[user]) {
        let elF = document.getElementById(`${key}F`);
        
        if (elF && elF.tagName == "LI" && allUserData[user][key] == "") {
            elF.remove();
        } else if (elF && allUserData[user][key] != "") {
            elF.textContent = socialName(allUserData[user][key],`${key}F`);
        } else if (!elF && allUserData[user][key] != "") {
            addList(allUserData[user][key],`${key}F`);
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
