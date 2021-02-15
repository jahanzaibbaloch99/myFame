import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth"
export const getAuthTokenStorage = () => {
  return async (dispatch) => {
    dispatch({
      type: 'ASYNC_STORAGE_TOKEN',
      payload: {splash: true},
    });
    const accessToken = await AsyncStorage.getItem('AccessToken');
    const authToken = await AsyncStorage.getItem('AuthToken');
    if (accessToken ||  authToken) {
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
        },
      });
    }
    dispatch({
      type: 'ASYNC_STORAGE_TOKEN',
      payload: {splash: false},
    });
  };
};

export const Logout = () => {
  return async dispatch => {
    await auth().signOut();
    await AsyncStorage.clear()
    dispatch({
      type:"LOGOUT"
    })
  }
}