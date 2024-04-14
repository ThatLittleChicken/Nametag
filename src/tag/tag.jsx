import React from "react";
import { useSearchParams } from "react-router-dom";
import './tag.css';

export function Tag() {
    const [userData, setUserData] = React.useState({});
    const [invalidLink, setInvalidLink] = React.useState(false);
    const [searchParams] = useSearchParams();
    const tmpTagId = searchParams.get("tmpId");

    React.useEffect(() => {
        if (tmpTagId) {
            getUserData().then((data) => setUserData(data)).catch(() => setInvalidLink(true));
        } else {
            setUserData({name: 'John Doe', phone: '800 123 4567', email: 'johndoe@gmail.com', insta: '@john_doe', fb: '', x: '', linkedin: '@john_doe', others: ''});
        }
    }, []);

    React.useEffect(() => {
        document.title = `Name Tag | ${userData["name"] ? userData["name"].split(" ")[0] + '\'s' : ''} Tag`;
    }, [userData["name"]]);

    //Get user data
    async function getUserData() {
        let userData = {};
        try {
            const response = await fetch(`/api/userData/public?tmpTagId=${tmpTagId}`);
            userData = await response.json();
        } catch {
            throw new Error('Error getting user data');
        }
        return userData;
    }

    //Invalid link message
    const InvalidLink = () => {
        if (invalidLink) {
            return (
                <h1>Link expired / Tag doesn't exist.</h1>
            );
        }
        return null;
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
        <main className="d-flex flex-column justify-content-around align-items-center">
            <div className="container h-auto">
                <div className="border rounded p-5 m-5 col-xxl-6 col-xl-7 col-lg-8 col-md-9 col-sm-10 col-11 mx-auto">
                    <InvalidLink />
                    <h1 id="name" className="">{userData["name"]}</h1>
                    <h2 id="phone" className="">{userData["phone"]}</h2>
                    <ul className="">
                        {socials}
                    </ul>
                    <p id="email" className="">{userData["email"]}</p>
                </div>
            </div>
        </main>
    );
}