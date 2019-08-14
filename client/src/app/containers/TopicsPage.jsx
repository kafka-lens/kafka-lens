import React from 'react';

import { getState } from '../state/state';

function TopicsPage(props) {
  const [state, dispatch] = getState();

  return (
    <div>
      {state.topics.topics}
      <button onClick={() => dispatch({
        type: 'SET_TOPICS',
        payload: [1,2,3],
      })}> Set Topics</button>
    </div>
  )
}

export default TopicsPage;