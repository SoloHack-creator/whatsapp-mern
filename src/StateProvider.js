import React, { createContext, useReducer, useContext } from 'react';

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
  //children is App component
);
//this is how it is used in Function component
export const useStateValue = () => useContext(StateContext);
