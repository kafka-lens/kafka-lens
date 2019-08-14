export const initialState = {
  topics: [],
};

function topicReducer(state=initialState, action) {
  switch (action.type) {
    case 'SET_TOPICS':
      return {
        ...state,
        topics: action.payload,
      }
    default:
      return state;
  }
};

export const topicReducer = topicReducer;