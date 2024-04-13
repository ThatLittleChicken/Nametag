import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function App() {

    return (
        <BrowserRouter>
            <div className='body'>App will display here</div>
        </BrowserRouter>
    );
}

function NotFound() {
    return <main className='container-fluid text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;