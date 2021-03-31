const initialState = {
  ImagePostData: [],
  Comments: [],
};
export default (state = initialState, actions) => {
  switch (actions.type) {
    case 'POST_IMAGE_DATA':
      return {
        ...state,
        ...actions.payload,
      };
    case 'LIKE_UPDATE':
      console.log(actions.payload, 'PAYLOAD ');
      return {
        ...state,
        ImagePostData: state.ImagePostData[actions.payload.index].likes.push(
          actions.payload.userId,
        ),
      };
    case 'LOGOUT':
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
