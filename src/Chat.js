import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import './Chat.css';
import MicIcon from '@material-ui/icons/Mic';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import axios from './axios';
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

function Chat({ messages }) {
  const { roomID } = useParams();
  const [input, setInput] = useState('');
  const [roomName, setRoomName] = useState('');

  let [{ roomkey }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomID) {
      db.collection('rooms')
        .doc(roomID)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data().name);
          dispatch({
            type: actionTypes.SET_KEY,
            roomkey: roomID,
          });
        });
      // console.log('Message', re);
    }
  }, [roomID]);

  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post('/api/messages/new', {
      message: input,
      name: 'AdminUser',
      timestamp: new Date().toLocaleString('en-IN'),
      received: true,
      roomID: roomID,
    });
    setInput('');
  };

  const url = 'https://avatars.dicebear.com/api/human/22/45454.svg';
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={url} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last Seen {''}
            {messages[messages.length - 1]?.timestamp}
          </p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${message.received && 'chat__reciever'}`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">{message.timestamp}</span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholde="Type a message"
            type="text"
          ></input>

          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
