const initialState = {
  UserData: {},
  loading: false,
  error: false,
  AccessToken: null,
  AuthToken: null,
  SigupLoading: false,
  SignInLoading: false,
  splash: false,
};
export default (state = initialState, actions) => {
  switch (actions.type) {
    case 'SIGN_IN':
      return {
        ...state,
        ...actions.payload,
      };
    case 'ASYNC_STORAGE_TOKEN':
      return {
        ...state,
        ...actions.payload,
      };
    case "USER_DATA":
      return {
        ...state,
        ...actions.payload
      }
    case 'LOGOUT':
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
