import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './SidebarChat.css';
import db from './firebase';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import axios from './axios';

function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState(25);
  const [messages, setMessages] = useState([]);
  const [{ user, roomkey }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomkey) {
      axios.get(`api/messages/findByID/${roomkey}`).then((response) => {
        setMessages(response.data);
        console.log('inside side', response.data);
      });
    }
  }, [roomkey]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt('Please enter name for chat');
    if (roomName) {
      db.collection('rooms').add({ name: roomName });
    }
  };

  const url = `https://avatars.dicebear.com/api/human/22/${seed}.svg`;
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={url} />

        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{messages[messages.length - 1]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add New Chat</h2>
    </div>
  );
}

export default SidebarChat;
