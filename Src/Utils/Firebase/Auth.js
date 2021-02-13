import Auth, {firebase} from '@react-native-firebase/auth';
import fireStore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const SinginCreater = async (email, password) => {
  return async (dispatch) => {
    dispatch({
      type: 'SIGN_IN',
      payload: {loading: true},
    });
    try {
      const Res = await Auth()
        .signInWithEmailAndPassword(email, password)
        .then((ele) => {
          return JSON.parse(ele.user);
        });
      const userData = await fireStore()
        .collection('Users')
        .doc(Res.user.uid)
        .get()
        .then((snapShot) => {
          snapShot.forEach((doc) => doc.data());
        });
      if (userData.userName !== undefined) {
        await Auth()
          .currentUser.getIdTokenResult()
          .then((data) => {
            AsyncStorage.setItem('AuthToken', data);
            dispatch({
              type: 'SIGN_IN',
              payload: {loading: false, AuthToken: data},
            });
          });
      } else {
        await Auth()
          .currentUser.getIdTokenResult()
          .then((data) => {
            AsyncStorage.setItem('AuthToken', data);
            AsyncStorage.setItem('AccessToken', data);
            dispatch({
              type: 'SIGN_IN',
              payload: {loading: false, AuthToken: data, AccessToken: data},
            });
          });
      }
    } catch (e) {
      dispatch({
        type: 'SIGN_IN',
        payload: {loading: false},
      });
    }
  };
};

export const SignupCreater = (email, password) => {
  return async (dispatch) => {
    dispatch({
      type: 'SIGN_IN',
      payload: {loading: true},
    });
    try {
      const Res = await Auth()
        .createUserWithEmailAndPassword(email, password)
        .then((ele) => {
          return JSON.parse(ele.user);
        });
      if (Res.user) {
        const TokenData = await Auth()
          .currentUser.getIdTokenResult()
          .then(async (doc) => {
            await AsyncStorage.setItem('AccessToken', JSON.stringify(doc));
            await AsyncStorage.setItem('AuthToken', JSON.stringify(doc));
            return doc;
          });
        await fireStore().collection('Users').doc(res.user.uid).set({
          email: email,
          createdAt: firebase.firestore.Timestamp.now(),
          firstName: '',
          lastName: '',
          userName: '',
          userId: res.user.uid,
          ImageUrl: '',
        });
        dispatch({
          type: 'SIGN_IN',
          payload: {
            loading: false,
            AuthToken: TokenData,
            AccessToken: TokenData,
          },
        });
      }
      dispatch({
        type: 'SIGN_IN',
        payload: {
          loading: false,
        },
      });
    } catch (e) {
      dispatch({
        type: 'SIGN_IN',
        payload: {
          loading: false,
        },
      });
    }
  };
};
