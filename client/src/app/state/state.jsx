import PropTypes from 'prop-types';
import React, { createContext, useContext, useReducer } from 'react';

const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const getState = () => useContext(StateContext);

StateProvider.propTypes = {
  children: PropTypes.arrayOf().isRequired,
  initialState: PropTypes.objectOf().isRequired,
  reducer: PropTypes.func.isRequired,
};
