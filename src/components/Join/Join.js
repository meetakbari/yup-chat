import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import './Join.css'

const Join = () => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return(
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Yup Chat</h1>
                <div><input placeholder="Type your name" className="joinInput" type="text" name="name" id="name" onChange={(event) => setName(event.target.value)} /></div>
                <div><input placeholder="Create a new room or join one" className="joinInput" type="text" name="room" id="room" onChange={(event) => setRoom(event.target.value)}/></div>
                <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className="btn mt-20" type="submit">Join In</button>
                </Link>
            </div>
        </div>
    );
}

export default Join;