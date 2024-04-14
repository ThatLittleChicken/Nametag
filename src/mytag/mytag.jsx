import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthState } from '../login/authState';
import './mytag.css';

export function MyTag({ userName, authState }) {
    if (authState !== AuthState.Authenticated) {
        const navigate = useNavigate();

        alert("Please login to continue");
        React.useEffect(() => {
            navigate('/');
        }, []);
    }

    const [userData, setUserData] = React.useState({});

    React.useEffect(() => {
        document.title = "Name Tag | My Tag";
        getUserData(userName).then((data) => setUserData(data));
    }, []);

    //Update user data
    function updateData(e) {
        e.preventDefault();

        if (e.target.id === 'phone') {
            e.target.value = e.target.value.replace(/[^(0-9\(\)\-) ]/g, '');
        } else if (e.target.id === 'email') {
            e.target.value = e.target.value.replace(/[^(a-zA-Z0-9@.)]/g, '');
        }

        if (userData[e.target.id] !== e.target.value) {
            saveUserData({...userData, [e.target.id]: e.target.value});
            setUserData({...userData, [e.target.id]: e.target.value});
        }
    }

    //Get user data
    async function getUserData(user) {
        let userData = {};
        try {
            const response = await fetch(`/api/userData?username=${user}`);
            if (response.ok) {
                userData = await response.json();
            } else if (response.status == 404) {
                //userData = {name: '', phone: '', email: '', insta: '', fb: '', x: '', linkedin: '', others: ''};
                userData = {username: user};
            }
            localStorage.setItem('userData', JSON.stringify(userData));
        } catch (e) {
            console.log(e);
            userData = JSON.parse(localStorage.getItem('userData')) ?? {};
        }
        return userData;
    }

    //Save user data
    async function saveUserData(userData) {
        try {
            const response = await fetch('/api/userData', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({username : userName, ...userData}),
            });
            userData = await response.json();
            localStorage.setItem('userData', JSON.stringify(userData));
        } catch {
            localStorage.setItem('userData', JSON.stringify(userData));
        }
    }

    //Check user data and update social fields
    const [socials, setSocials] = React.useState([]); 

    React.useEffect(() => {
        let socials = [];
        for (let key in userData) {
            if (key === 'name' || key === 'phone' || key === 'email' || key === '_id' || key === 'ip' || key === 'username' || key === 'tmpTagId') continue;
            if (userData[key] !== '') {
                socials.push(
                    <li id={key} key={key}>{socialsName(key, userData[key])}</li>
                );
            }
        }
        setSocials(socials);
    }, [userData]);

    function socialsName(key, value) {
        if (key === 'insta') {
            return `Instagram: @${value}`;
        } else if (key === 'fb') {
            return `Facebook: ${value}`;
        } else if (key === 'x') {
            return `X/Twitter: ${value}`;
        } else if (key === 'linkedin') {
            return `LinkedIn: ${value}`;
        } else if (key === 'others') {
            return `Others: ${value}`;
        }
    }

    return (
        <main className="container mw-100">
            <div className="row">
                <div className="overflow-y-scroll col-md-5 col-12 border-end">
                    <p className="m-3 fs-5">Logged in as: <span id="user">{userName}</span></p>
                    <form className="row m-3 g-3">
                        <div className="col-12">
                            <label htmlFor="name" className="form-label">Name</label>
                            <TagInput name="name" value={userData} update={updateData}/>
                        </div>

                        <div className="col-12">
                            <label htmlFor="phone" className="form-label">Phone Number</label>
                            <TagInput name="phone" value={userData} update={updateData}/>
                        </div>

                        <div className="col-12">
                            <label htmlFor="email" className="form-label">Email</label>
                            <TagInput name="email" value={userData} update={updateData}/>
                        </div>

                        <div className="col-12">
                            <label htmlFor="insta" className="form-label">Instagram</label>
                            <TagInput name="insta" value={userData} update={updateData}/>
                        </div>
                        <div className="col-12">
                            <label htmlFor="fb" className="form-label">Facebook</label>
                            <TagInput name="fb" value={userData} update={updateData}/>
                        </div>
                        <div className="col-12">
                            <label htmlFor="x" className="form-label">X/Twitter</label>
                            <TagInput name="x" value={userData} update={updateData}/>
                        </div>
                        <div className="col-12">
                            <label htmlFor="linkedin" className="form-label">LinkedIn</label>
                            <TagInput name="linkedin" value={userData} update={updateData}/>
                        </div>
                        <div className="col-12">
                            <label htmlFor="others" className="form-label">Other Social Media</label>
                            <TagInput name="others" value={userData} update={updateData}/>
                        </div>
                    </form>
                </div>
                <div className="col-12 col-md-7 d-flex flex-column align-items-center justify-content-center overflow-y-auto tag">
                    <div className="container">
                        <div className="border rounded p-5 m-3 col-xxl-6 col-xl-7 col-lg-8 col-md-10 col-sm-10 mx-auto">
                            <h1 id="name" className="">{userData["name"] ?? "John Doe"}</h1>
                            <h2 id="phone" className="=">{userData["phone"] ?? "800 123 4567"}</h2>
                            <ul className="">
                                {socials}
                            </ul>
                            <p id="emailF" className="">{userData["email"] ?? "johndoe@gmail.com"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

const TagInput = ({ name, value, update }) => {
    return (
        <input 
            type="text" 
            name={name} 
            id={name} 
            defaultValue={value[name]}
            onChange={(e) => update(e)} 
            onFocus={(e) => update(e)} 
            onBlur={(e) => update(e)} 
            className="form-control" 
        />
    );
}