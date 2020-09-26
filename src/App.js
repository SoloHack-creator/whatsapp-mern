import React, { useEffect, useState } from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js';
import axios from './axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import { useStateValue } from './StateProvider';
function App() {
  const [messages, setMessages] = useState([]);

  const [{ user, roomkey }, dispatch] = useStateValue();

  useEffect(() => {
    axios
      .get('api/messages/sync')
      .then((response) => setMessages(response.data));
  }, []);

  useEffect(() => {
    if (roomkey) {
      axios
        .get(`api/messages/findByID/${roomkey}`)
        .then((response) => setMessages(response.data));
    }
  }, [roomkey]);

  console.log(messages);
  //to connect with pusher which connects with mongooseDB
  useEffect(() => {
    const pusher = new Pusher('f19bef233c85ab4f93b9', {
      cluster: 'ap2',
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (data) => {
      setMessages([...messages, data]);
      console.log('after set', messages);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  // console.log('initial', messages);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomID">
                <Chat messages={messages} />
              </Route>
              <Route path="/">
                <Chat messages={messages} />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
