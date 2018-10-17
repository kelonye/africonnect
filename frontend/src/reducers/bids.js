const DEFAULT_STATE = [];

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'BIDS': {
      return action.payload;
    }

    default:
      return state;
  }
};
