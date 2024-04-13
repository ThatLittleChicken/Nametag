import React from 'react';
import { BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { Login } from './login/login.jsx';
import { MyTag } from './mytag/mytag.jsx';
// import { Share } from './share/share';
// import { Tag } from './tag/tag';
import { AuthState } from './login/authState';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function App() {
    const [username, setUserName] = React.useState(localStorage.getItem('username') || '');
    const currentAuthState = username ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);
    const navigate = useNavigate();

    function logout() {
        fetch('/api/auth/logout', {
            method: 'delete',
        }).catch(() => {
            // Logout failed. Assuming offline
        }).then(() => {
            localStorage.removeItem('username');
            setAuthState(AuthState.Unauthenticated);
            navigate('/');
        });
    }
    
    return (
        <div className="d-flex flex-column">
            <header className="border-bottom">
                <nav className="navbar py-3">
                    <NavLink to="/" className="navbar-brand ps-4">Name Tag</NavLink>
                    <menu className="navbar-nav m-0 d-flex flex-row flex-grow-1 list-unstyled">
                        {authState === AuthState.Authenticated && (
                            <li className="nav-item px-2">
                                <NavLink to="mytag" className="nav-link">My Tag</NavLink>
                            </li>
                        )}
                        {authState === AuthState.Authenticated && (
                            <li className="nav-item px-2">
                                <NavLink to="share" className="nav-link">Share</NavLink>
                            </li>
                        )}
                        {authState === AuthState.Authenticated && (
                            <li className="nav-item px-2 ms-auto pe-4">
                                <Button onClick={() => logout()} className="btn btn-secondary">Logout</Button>
                            </li>
                        )}
                    </menu>
                </nav>
            </header>

            <Routes>
                <Route 
                    exact
                    path="/" 
                    element={<Login 
                        userName={username} 
                        authState={authState} 
                        onAuthChange={(username, authState) => {
                            setUserName(username);
                            setAuthState(authState);
                        }}
                    />} 
                />
                <Route 
                    path="mytag" 
                    element={<MyTag 
                        userName={username} 
                        authState={authState}
                    />} 
                />
                {/* <Route path="share" element={<Share userName={username} />} />
                <Route path="tag" element={<Tag />} /> */}
                <Route path="*" element={<NotFound />} />
            </Routes>

            <footer className="container-fluid border-top">
                <div className="mx-4 py-3">
                    <span>Gent Yong</span>
                    <a href="https://github.com/ThatLittleChicken/Nametag" className="float-end">GitHub</a>
                </div>
            </footer>
        </div>
    );
}

function NotFound() {
    return <main className='container-fluid text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;