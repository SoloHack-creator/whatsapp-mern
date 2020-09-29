import React, { useEffect, useState } from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js';
import axios from './axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import { useStateValue } from './StateProvider';
import reducer, { initialState } from './reducer';
function App() {
  // const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get('api/messages/sync')
  //     .then((response) => setMessages(response.data));
  // }, []);
  const { messages, setMessages, state, dispatch } = useStateValue();

  // useEffect(() => {
  //   const abortController = new AbortController();
  //   if (state.roomkey) {
  //     axios
  //       .get(`api/messages/findByID/${state.roomkey}`, {
  //         signal: abortController.signal,
  //       })
  //       .then((response) => setMessages(response.data));
  //   }

  //   return () => {
  //     abortController.abort();
  //   };
  // }, [state.roomkey]);

  console.log('1inside app');
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

  console.log('initial user', state.user);

  return (
    <div className="app">
      {!state.user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomID">
                <Chat messages={messages} dispaly={state.user} />
              </Route>
              <Route path="/">
                <Chat messages={messages} dispaly={state.user} />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
