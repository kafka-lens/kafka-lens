import { hot } from 'react-hot-loader';
import React from 'react';

import Main from './Main';
// import HooksPage from './HooksPage';

// import { StateProvider } from '../state/state';
// import { brokerReducer, initialState as brokerReducerInitialState } from '../state/brokerReducer';
// import { topicReducer, initialState as topicReducerInitialState } from '../state/topicReducer';

const App = () => {
  // const initialState = {
  //   topics: topicReducerInitialState,
  //   brokers: brokerReducerInitialState,
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

// export default App;
export default hot(module)(App);
