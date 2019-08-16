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
  children: PropTypes.node.isRequired,
  initialState: PropTypes.objectOf(PropTypes.object).isRequired,
  reducer: PropTypes.func.isRequired,
};
