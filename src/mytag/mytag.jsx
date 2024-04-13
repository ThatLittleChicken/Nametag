import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthState } from '../login/authState';
import './mytag.css';

export function MyTag({ userName, authState }) {
    if (authState !== AuthState.Authenticated) {
        const navigate = useNavigate();

        alert("Please login to continue");
        useEffect(() => {
            navigate('/');
        }, []);
    }

    useEffect(() => {
        document.title = "Name Tag | Login";
    }, []);

    const [userData, setUserData] = React.useState({});
    getUserData(userName).then((data) => setUserData(data));

    function updateData(e) {
        saveUserData({...userData, [e.target.id]: e.target.value});
        setUserData(userData);
    }

    //Get user data
    async function getUserData(user) {
        let userData = {};
        try {
            const response = await fetch(`/api/userData?username=${user}`);
            userData = await response.json();

            if (response.status == 404) {
                //userData = {name: '', phone: '', email: '', insta: '', fb: '', x: '', linkedin: '', others: ''};
            }
            
            localStorage.setItem('userData', JSON.stringify(userData));
        } catch {
            userData = localStorage.getItem('userData') ?? {};
        }
        return userData;
    }

    //Save user data
    async function saveUserData(userData) {
        try {
            const response = await fetch('/api/userData', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({username : user, ...userData}),
            });
            userData = await response.json();
            localStorage.setItem('userData', JSON.stringify(userData));
        } catch {
            localStorage.setItem('userData', JSON.stringify(userData));
        }
    }

    return (
        <main className="container mw-100">
            <div className="row">
                <div className="overflow-y-scroll col-md-5 col-12 border-end">
                    <p className="m-3 fs-5">Logged in as: <span id="user">{userName}</span></p>
                    <form className="row m-3 g-3">
                        <div className="col-12">
                            <label for="name" className="form-label">Name</label>
                            <TagInput name="name" update={updateData} />
                        </div>

                        <div className="col-12">
                            <label for="phone" className="form-label">Phone Number</label>
                            <TagInput name="phone" update={updateData} />
                        </div>

                        <div className="col-12">
                            <label for="email" className="form-label">Email</label>
                            <TagInput name="email" update={updateData} />
                        </div>

                        <div className="col-12">
                            <label for="insta" className="form-label">Instagram</label>
                            <TagInput name="insta" update={updateData} />
                        </div>
                        <div className="col-12">
                            <label for="fb" className="form-label">Facebook</label>
                            <TagInput name="fb" update={updateData} />
                        </div>
                        <div className="col-12">
                            <label for="x" className="form-label">X/Twitter</label>
                            <TagInput name="x" update={updateData} />
                        </div>
                        <div className="col-12">
                            <label for="linkedin" className="form-label">LinkedIn</label>
                            <TagInput name="linkedin" update={updateData} />
                        </div>
                        <div className="col-12">
                            <label for="others" className="form-label">Other Social Media</label>
                            <TagInput name="others" update={updateData} />
                        </div>
                    </form>
                </div>
                <div className="col-12 col-md-7 d-flex flex-column align-items-center justify-content-center overflow-y-scroll tag">
                    <div className="container">
                        <div className="border rounded p-5 m-3 col-xxl-6 col-xl-7 col-lg-8 col-md-10 col-sm-10 mx-auto">
                            <h1 id="nameF" className="">{userData["name"] ?? "John Doe"}</h1>
                            <h2 id="phoneF" className="=">{userData["phone"] ?? "800 123 4567"}</h2>
                            <ul className="">
                                <li id="instaF">Instagram: @john_doe</li>
                                <li id="fbF">Facebook: @john_doe</li>
                                <li id="xF">X/Twitter: @john_doe</li>
                                <li id="linkedinF">LinkedIn: @john_doe</li>
                                <li id="othersF">Others: @john_doe</li>
                            </ul>
                            <p id="emailF" className="">johndoe@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

const TagInput = ({ name, update }) => {
    return (
        <input 
            type="text" 
            name={name} 
            id={name} 
            onChange={(e) => update(e)} 
            onFocus={(e) => update(e)} 
            onBlur={(e) => update(e)} 
            className="form-control" 
        />
    );
}