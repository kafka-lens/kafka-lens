import React from 'react';

import { StateProvider } from '../state/state';
import { brokerReducer, initialState as brokerReducerInitialState } from '../state/brokerReducer';
import { topicReducer , initialState as topicReducerInitialState } from '../state/topicReducer';

const App = () => {
  const initialState = {
    topics: topicReducerInitialState,
    brokers: brokerReducerInitialState,
  }

  const mainReducer = ({topics, brokers}, action) => ({
    topics: topicReducer(topics, action),
    brokers: brokerReducer(brokers, action),
  });

  return (
    <StateProvider initialState={initialState} reducer={mainReducer}>
      // App content ...
    </StateProvider>
  );
}
