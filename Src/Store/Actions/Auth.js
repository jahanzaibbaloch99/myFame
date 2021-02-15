export const getAuthTokenStorage = () => {
  return async (dispatch) => {
    dispatch({
      type: 'ASYNC_STORAGE_TOKEN',
      payload: {splash: true},
    });
    const accessToken = await AsyncStorage.getItem('AccessToken');
    const authToken = await AsyncStorage.getItem('AuthToken');
    if (accessToken || accountType || authToken) {
      dispatch({
        type: 'ASYNC_STORAGE_TOKEN',
        payload: {
          splash: false,
          AuthToken: authToken,
          AccessToken: accessToken,
        },
      });
    } else {
      dispatch({
        type: 'ASYNC_STORAGE_TOKEN',
        payload: {
          splash: false,
          authToken: null,
          accessToken: null,
          accountType: null,
        },
      });
    }
    dispatch({
      type: 'ASYNC_STORAGE_TOKEN',
      payload: {splash: false},
    });
  };
};
