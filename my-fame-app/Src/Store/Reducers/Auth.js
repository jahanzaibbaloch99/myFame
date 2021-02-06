const initialState = {
  data: "",
  loading: false,
  userLoading: false,
  accessToken: null,
  authToken: null,
};
export default (state = initialState, actions) => {
  switch (actions.type) {
    case "STATE_UPDATE":
      return {
        ...state,
        ...actions.payload,
      };
    case "UPDATE_TOKENS":
      return {
        ...state,
        ...actions.payload,
      };
    case "ASYNC_STORAGE_TOKEN":
      return {
        ...state,
        ...actions.payload,
      };

    case "LINKEDINREF":
      return {
        ...state,
        linkedinRef: actions.payload,
      };
    case "LOGOUT":
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
