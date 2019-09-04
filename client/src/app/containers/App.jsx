import React from 'react';
import { hot } from 'react-hot-loader';
import Main from './Main';
// import HooksPage from './HooksPage';

// import { StateProvider } from '../state/state';
// import { brokerReducer, initialState as brokerInitialState } from '../state/brokerReducer';
// import { topicReducer, initialState as topicInitialState } from '../state/topicReducer';

const App = () => {
  // const initialState = {
  //   topics: topicInitialState,
  //   brokers: brokerInitialState,
  // };

  // const mainReducer = ({ topics, brokers }, action) => ({
  //   topics: topicReducer(topics, action),
  //   brokers: brokerReducer(brokers, action),
  // });

  return (
    // <StateProvider initialState={initialState} reducer={mainReducer}>
    <Main />
    // {/* <HooksPage /> */}
    // </StateProvider>
  );
};

export default hot(module)(App);
