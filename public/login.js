let loginMap = localStorage.getItem('loginMap') ?
JSON.parse(localStorage.getItem('loginMap')) : [];


function signUp(e){
    e.preventDefault();
    let username = document.getElementById("username").value;
	let password = document.getElementById("password").value;

    if (username == "" || password == "") {
        alert("Please enter username and password");
    } else if (password.length < 8) {
        alert("Password must be at least 8 characters long");
    } else {
        if (loginMap.some((user) => user[0] == username)) {
            alert("Username already exists");
        } else {
            loginMap.push([username, password]);
            localStorage.setItem('loginMap', JSON.stringify(loginMap));
            alert("Successfully signed up, please login to continue");
        }
    }
}
  
function login(e){
    e.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username == "" || password == "") {
        alert("Please enter username and password");
    } else {
        if (!loginMap.some((user) => user[0] == username)) {
            alert("Username does not exist");
        } else if (!loginMap.some((user) => user[0] == username && user[1] == password)) {
            alert("Incorrect password");
        } else if (loginMap.some((user) => user[0] == username && user[1] == password)) {
            sessionStorage.setItem('user', JSON.stringify(username));
            alert("Successfully logged in");
            window.location.replace("mytag.html");
        }
    }
}