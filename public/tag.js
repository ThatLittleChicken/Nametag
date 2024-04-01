//Get user
let tmpTagId = getTmpIdQuery();

let userData = {};
if (tmpTagId) {
    getUserData().then((data) => {userData = data; showUserData();});
} else {
    userData = {name: 'John Doe', phone: '800 123 4567', email: 'johndoe@gmail.com', insta: '@john_doe', fb: '', x: '', linkedin: '@john_doe', others: ''};
    showUserData();
}

//Get user data
async function getUserData() {
    let userData = {};
    try {
        const response = await fetch(`/api/userData/public?tmpTagId=${tmpTagId}`);
        userData = await response.json();
    } catch {
        console.log("Error getting user data");
    }
    return userData;
}

//Show user data for tag
function showUserData() {
    for (let key in userData) {
        if (key == "username" || key == "ip" || key == "tmpTagId" || key == "_id") continue;
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

//Get tmpId query string
function getTmpIdQuery() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    return params.tmpId;
}