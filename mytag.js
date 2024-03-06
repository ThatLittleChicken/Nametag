//Get current user from session storage
if (sessionStorage.getItem('user')){
    var user = JSON.parse(sessionStorage.getItem('user'));
} else {
    alert("Please login to continue");
    window.location.replace("index.html");
}

document.getElementById('user').textContent = user;

//Get user data from local storage
let allUserData = JSON.parse(localStorage.getItem('allUserData')) ?? {};

if (!allUserData[user]) {
    allUserData[user] = {name: '', phone: '', email: '', insta: '', fb: '', x: '', linkedin: '', others: ''};
} else {
    for (let key in allUserData[user]) {
        let el = document.getElementById(key);
        el.value = allUserData[user][key];
        updateField(el,key);
    }
}

//Update user data every update
let inputIdArray = ['name','phone','email','insta','fb','x','linkedin','others'];

inputIdArray.forEach((id) => {
    let el = document.getElementById(id);
    [ "input", "keydown", "keyup", "drop", "focusout" ].forEach(function(event) {
        el.addEventListener(event, () => {
            updateField(el,id);
            allUserData[user][id] = document.getElementById(id).value;
            localStorage.setItem('allUserData', JSON.stringify(allUserData));
        });
    });
});

function updateField(el,id){
    id = id + "F";
    let elF = document.getElementById(id);

    if(id == "phoneF"){
        el.value = el.value.replace(/[^(0-9\(\)\-) ]/g, '');
    }
    if(id == "emailF"){
        el.value = el.value.replace(/[^a-zA-Z0-9@.]/g, '');
    }
    if(elF && elF.tagName == "LI" && el.value == "") {
        elF.remove();
    } else if (!elF && el.value != ""){
        addList(el.value,id);
    }
    elF.textContent = socialName(el.value,id);
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

