export const initialState = {
  topics: [],
};

export const topicReducer = (state=initialState, action) => {
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