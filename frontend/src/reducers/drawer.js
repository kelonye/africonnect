const DEFAULT_STATE = true;

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'SHOW_DRAWER': {
      return true;
    }

    case 'HIDE_DRAWER': {
      return false;
    }

    default:
      return state;
  }
};
