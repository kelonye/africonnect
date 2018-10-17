const DEFAULT_STATE = 0;

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'BALANCE': {
      return action.payload;
    }

    default:
      return state;
  }
};
