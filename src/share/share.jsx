import React from 'react';
import useWebSocket from 'react-use-websocket';
import { useNavigate } from 'react-router-dom';
import { AuthState } from '../login/authState';
import Button from 'react-bootstrap/Button';
import './share.css';

export function Share({ userName, authState }) {
    if (authState !== AuthState.Authenticated) {
        const navigate = useNavigate();

        alert("Please login to continue");
        React.useEffect(() => {
            navigate('/');
        }, []);
    }

    const tmpTagId = React.useRef('');
    const link = React.useRef('');
    const timerTime = 600000;

    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const wsUrl = `${protocol}://${window.location.host}/ws`;
    const { sendJsonMessage } = useWebSocket(wsUrl, {
        onOpen: () => {
            console.log('Connected to server');
            // Check if tmpTagId is still valid
            if (new Date().getTime() < localStorage.getItem('expireTime')) {
                tmpTagId.current = localStorage.getItem('tmpTagId');
                link.current = `https://startup.nametag.click/tag?tmpId=${tmpTagId.current}`;
                updateQR();
                timer(timerTime, localStorage.getItem('expireTime')-timerTime);
            } else {
                reqNewTag();
            }
        },
        onClose: () => {
            console.log('Disconnected from server');
            localStorage.setItem('tmpTagId', tmpTagId.current);
        },
        onMessage: (event) => {
            if (event.data.charAt(0) == 'F') {
                console.log('Failed to generate tmpTagId');
            } else if (event.data.charAt(0) == 'T'){
                tmpTagId.current = event.data.substring(1);
                link.current = `https://startup.nametag.click/tag?tmpId=${tmpTagId.current}`;
                updateQR();
                newTimer(timerTime);
            }
        },
    });

    function reqNewTag() {
        fetch(`/api/user/${userName}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.authenticated) {
                sendJsonMessage(data.username);
            }
        });
    }

    function newTimer(timerTime) {
        let beginningDate = new Date().getTime();
        timer(timerTime, beginningDate);
    
        localStorage.setItem('expireTime', beginningDate + timerTime);
    }

    const [width, setWidth] = React.useState('0%');

    function timer(timerTime, beginningDate) {  
        let interval = setInterval(progressBar, 100);
      
        function progressBar() {
            var milisFromBegin = new Date().getTime() - beginningDate;
            setWidth(`${milisFromBegin / timerTime * 100}%`);
            showCountdown(timerTime - milisFromBegin);
      
            if (width >= 100) {
                clearInterval(interval);
                setWidth('0%');
                reqNewTag(socket);
            }
        }
    }

    const [countdown, setCountdown] = React.useState('0s');
    
    function showCountdown(milis) {
        if (milis > 60000*2) {
            setCountdown(`${Math.floor(milis/60000)}mins ${Math.floor((milis%60000)/1000)}s`);
        } else if (milis > 60000) {
            setCountdown(`${Math.floor(milis/60000)}min ${Math.floor((milis%60000)/1000)}s`);
        } else if (milis >= 0) {
            setCountdown(`${Math.floor(milis/1000)}s`);
        } 
    }

    const [qr, setQR] = React.useState('https://upload.wikimedia.org/wikipedia/commons/2/2f/Rickrolling_QR_code.png?20200615212723');
    const [blur, setBlur] = React.useState('blur(1rem)');
    
    function updateQR() {
        setQR(`https://api.qrserver.com/v1/create-qr-code/?data=${link.current}&size=500x500&margin=15`);
        setTimeout(() => {setBlur('none');}, 200);
    }

    function copyLink() {
        navigator.clipboard.writeText(link.current);
        alert(`Copied link for ${userName}`);
    }

    return (
        <main className="d-flex flex-column justify-content-center align-items-center">
            <h1 className="mb-2 share">{userName}'s Name Tag</h1>
            <div className="container d-flex justify-content-center align-items-center">
                <img src={qr} alt="Name Tag Link" id="qr" style={{ 'filter': blur }}
                className="border rounded p-5 mx-5 col-xxl-4 col-xl-4 col-lg-5 col-md-6 col-sm-8 col-10 mx-auto"></img>
            </div>
            <Button onClick={() => copyLink()} className="btn btn-secondary my-3">Copy Link</Button>
            <h3 className="w-75 d-flex justify-content-between align-items-end">Regenerating in... 
                <span className="fs-4 fw-normal text-end flex-even">{countdown}</span>
            </h3>
            <div className="progress w-75">
                <div id="progress" style={{ 'width': width }} className="progress-bar" role="progressbar"></div>
            </div>
        </main>
    );
}