//Data placeholder
let user = JSON.parse(sessionStorage.getItem('user')) ?? 'john_doe';

let allUserData = JSON.parse(localStorage.getItem('allUserData')) ?? {};
allUserData[user] ? {} : allUserData[user] = {name: 'John Doe', phone: '800 123 4567', email: 'johndoe@gmail.com', insta: '@john_doe', fb: '', x: '', linkedin: '@john_doe', others: ''};

//Show user data for tag
for (let key in allUserData[user]) {
    let elF = document.getElementById(`${key}F`);
    elF.textContent = socialName(allUserData[user][key],`${key}F`);

    if(elF && elF.tagName == "LI" && allUserData[user][key] == "") {
        elF.remove();
    } else if (!elF && allUserData[user][key] != ""){
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
    const li = document.createElement('li')
    li.textContent = text;
    li.id = id;
    ul.appendChild(li);
  }
