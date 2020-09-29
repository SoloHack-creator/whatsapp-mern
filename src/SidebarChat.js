import './SidebarChat.css';

import React, { useEffect, useState } from 'react';

import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';

function SidebarChat({ id, name, addNewChat }) {
  const { messages } = useStateValue();
  const [seed, setSeed] = useState(25);
  //const [messages, setMessages] = useState([]);
  //const [{ user, roomkey }, dispatch] = useStateValue();

  // useEffect(() => {
  //   const abortController = new AbortController();
  //   if (roomkey) {
  //     axios.get(`api/messages/findByID/${roomkey}`).then((response) => {
  //       setMessages(response.data);
  //     });
  //   }
  //   return () => {
  //     abortController.abort();
  //   };
  // }, [roomkey]);

  console.log('5 inside sidebarchat');
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
          {/* <p>thanks</p> */}
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
