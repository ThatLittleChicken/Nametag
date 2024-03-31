const username = sessionStorage.getItem('username');

async function signUp(e){
    e.preventDefault();
    const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;

    if (username == "" || password == "") {
        alert("Please enter username and password");
    } else if (password.length < 8) {
        alert("Password must be at least 8 characters long");
    } else {
        const response = await fetch(`/api/auth/signup`, {
            method: 'post',
            body: JSON.stringify({ username: username, password: password }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
        });

        if (response.ok) {
            sessionStorage.setItem('username', username);
            alert("Successfully signed up");
            window.location.replace('mytag.html');
        } else if (response.status == 409) {
            alert("Username already exists");
        } else {
            alert(`Error: ${response.json().msg}`);
        }
    }
}
  
async function login(e){
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username == "" || password == "") {
        alert("Please enter username and password");
    } else {
        const response = await fetch(`/api/auth/login`, {
            method: 'post',
            body: JSON.stringify({ username: username, password: password }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
        });
        
        if (response.ok) {
            sessionStorage.setItem('username', username);
            alert("Successfully logged in");
            window.location.replace('mytag.html');
        } else if (response.status == 401 || response.status == 404) {
            alert("Incorrect password or username does not exist");
        } else {
            alert(`Error: ${response.json().msg}`);
        }
    }
}

async function getUser(username) {
    let scores = [];
    // See if we have a user with the given email.
    const response = await fetch(`/api/user/${username}`);
    if (response.status === 200) {
      return response.json();
    }
  
    return null;
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