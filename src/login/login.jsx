import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthState } from './authState';
import Button from 'react-bootstrap/Button';
import './login.css';

export function Login({ userName, authState, onAuthChange }) {
    const [username, setUserName] = React.useState(userName);
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();

    React.useEffect(() => {
        document.title = "Name Tag | Login";
    }, []);

    async function signUp(){
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
    
            if (response?.ok) {
                localStorage.setItem('username', username);
                alert("Successfully signed up");
                onAuthChange(username, AuthState.Authenticated);
                navigate('/mytag', { replace: true });
            } else if (response?.status == 409) {
                alert("Username already exists");
            } else {
                alert(`Error: ${response.json().msg}`);
            }
        }
    }

    async function login(){    
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
                localStorage.setItem('username', username);
                alert("Successfully logged in");
                onAuthChange(username, AuthState.Authenticated);
                navigate('/mytag', { replace: true });
            } else if (response.status == 401 || response.status == 404) {
                alert("Incorrect password or username does not exist");
            } else {
                alert(`Error: ${response.json().msg}`);
            }
        }
    }

    return (
        <main className="d-flex flex-column justify-content-around align-items-center">
            <div className="border rounded p-5 m-5">
                <h1 className="mb-2 pb-2 border-bottom">Name Tag</h1>
                <form className="row justify-content-end g-3">
                    <div className="col-md-6">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input 
                            type="text" 
                            name="username" 
                            id="username" 
                            placeholder="Username" 
                            value={username}
                            onChange={(e) => setUserName(e.target.value.replace(/\s/g, ''))} 
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="Password" 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="form-control"
                        />
                    </div>
                    <div className="col-auto text-end">
                        <Button onClick={() => signUp()} className="btn btn-primary">Sign up</Button>
                    </div>
                    <div className="col-auto text-end">
                        <Button onClick={() => login()} className="btn btn-primary">Login</Button>
                    </div>
                </form>
            </div>
        </main>
    );
}
