const initialState = {
  ImagePostData: [],
};
export default (state = initialState, actions) => {
    console.log(actions.payload , "PAYLOAD")
  switch (actions.type) {
    case 'POST_IMAGE_DATA':
      return {
        ...state,
        ...actions.payload,
      };
    case 'LOGOUT':
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
