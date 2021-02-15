import Auth, {firebase} from '@react-native-firebase/auth';
import fireStore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage, ShowMessage} from 'react-native-flash-message';
export const SinginCreater = (email, password) => {
  return async (dispatch) => {
    dispatch({
      type: 'SIGN_IN',
      payload: {SiginLoading: true},
    });
    try {
      const Res = await Auth()
        .signInWithEmailAndPassword(email, password)
        .then((ele) => {
          console.log(ele, 'ELEE<M');
          return ele;
        });
      console.log(Res, 'RES');
      const userData = await fireStore()
        .collection('Users')
        .doc(Res.user.uid)
        .get()
        .then((snapShot) => {
          return snapShot.data();
        });
      if (userData.userName !== undefined) {
        await Auth()
          .currentUser.getIdTokenResult()
          .then((data) => {
            AsyncStorage.setItem('AuthToken', data.token);
            dispatch({
              type: 'SIGN_IN',
              payload: {
                SiginLoading: false,
                AuthToken: data.token,
                AccessToken: null,
                UserData: userData,
              },
            });
          });
      } else {
        await Auth()
          .currentUser.getIdTokenResult()
          .then((data) => {
            AsyncStorage.setItem('AuthToken', data.token);
            AsyncStorage.setItem('AccessToken', data.token);
            dispatch({
              type: 'SIGN_IN',
              payload: {
                SiginLoading: false,
                AccessToken: data.token,
                AuthToken: data.token,
                UserData: userData,
              },
            });
          });
      }
      dispatch({
        type: 'SIGN_IN',
        payload: {
          SiginLoading: false,
        },
      });
    } catch (e) {
      showMessage({
        message: e.message,
        duration: 3000,
        type: 'danger',
      });
      console.log(e, 'Ee');
      dispatch({
        type: 'SIGN_IN',
        payload: {SiginLoading: false},
      });
    }
  };
};

export const SignupCreater = (email, password) => {
  return async (dispatch) => {
    dispatch({
      type: 'SIGN_IN',
      payload: {SignupLoading: true},
    });
    try {
      const Res = await Auth()
        .createUserWithEmailAndPassword(email, password)
        .then((ele) => {
          return ele;
        });
      if (Res.user) {
        const TokenData = await Auth()
          .currentUser.getIdTokenResult()
          .then(async (doc) => {
            await AsyncStorage.setItem(
              'AccessToken',
              JSON.stringify(doc.token),
            );
            await AsyncStorage.setItem('AuthToken', JSON.stringify(doc.token));
            return doc.token;
          });
        await fireStore().collection('Users').doc(Res.user.uid).set({
          email: email,
          createdAt: firebase.firestore.Timestamp.now(),
          firstName: '',
          lastName: '',
          userName: '',
          userId: Res.user.uid,
          ImageUrl: '',
        });
        dispatch({
          type: 'SIGN_IN',
          payload: {
            SigupLoading: false,
            AuthToken: TokenData,
            AccessToken: TokenData,
            UserData: {userId: Res.user.uid},
          },
        });

        dispatch({
          type: 'SIGN_IN',
          payload: {
            SignupLoading: false,
          },
        });
      }
    } catch (e) {
      showMessage({
        message: e.message,
        duration: 3000,
        type: 'danger',
      });
      dispatch({
        type: 'SIGN_IN',
        payload: {
          SignupLoading: false,
        },
      });
    }
  };
};
