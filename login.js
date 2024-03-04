const signup = document.getElementById("signB");
const login = document.getElementById("loginB");

signup.addEventListener("click", (e) => {
    e.preventDefault();
    var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;

    if (username == "" || password == "") {
        alert("Please enter username and password");
    } else {
        alert("Successfully signed up, please login to continue");
    }
});
  
login.addEventListener("click", (e) => {
    e.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username == "" || password == "") {
        alert("Please enter username and password");
    } else {
        alert("Successfully logged in");
    }
});