const initialState = {
  data: '',
  loading: false,
  error: false,
  accessToken: null,
  authToken: null,
};
export default (state = initialState, actions) => {
  switch (actions.type) {
    case 'SIGN_IN':
      return {
        ...state,
        ...actions.payload,
      };
    case 'STATE_UPDATE':
      return {
        ...state,
        ...actions.payload,
      };
    case 'UPDATE_TOKENS':
      return {
        ...state,
        ...actions.payload,
      };
    case 'ASYNC_STORAGE_TOKEN':
      return {
        ...state,
        ...actions.payload,
      };

    case 'LINKEDINREF':
      return {
        ...state,
        linkedinRef: actions.payload,
      };
    case 'LOGOUT':
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
