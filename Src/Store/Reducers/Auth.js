const initialState = {
  UserData: {},
  loading: false,
  error: false,
  AccessToken: null,
  AuthToken: null,
  SigupLoading: false,
  SignInLoading: false,
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
