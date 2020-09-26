import React from 'react';
import './Login.css';
import { Avatar, Button } from '@material-ui/core';
import { auth, provider, providerFacebook } from './firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

function Login() {
  //{}-state/{user}
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) =>
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        })
      )
      .catch((error) => alert(error.message));
  };

  const signInFacebook = () => {
    auth
      .signInWithPopup(providerFacebook)
      .then((result) =>
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        })
      )
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/897px-WhatsApp.svg.png"></img>
        <div className="login__text">
          <h1>Sign in to WhatsApp</h1>
        </div>
        <div>
          <Button type="submit" className="Login__google" onClick={signIn}>
            Sign In with Google
          </Button>
        </div>
        <div>
          <p> or</p>

          <Button
            type="submit"
            className="Login__facebook"
            onClick={signInFacebook}
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg"></img>
            Sign In with Facebook
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
