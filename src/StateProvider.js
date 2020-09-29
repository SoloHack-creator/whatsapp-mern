import React, { createContext, useReducer, useContext, useState } from 'react';
import reducer, { initialState } from './reducer';

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch, messages, setMessages }}>
      {children}
    </StateContext.Provider>
    //children is App component
  );
};
//this is how it is used in Function component
export const useStateValue = () => useContext(StateContext);
