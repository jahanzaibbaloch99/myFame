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
          console.log(ele, 'ELEE<M');
          return JSON.parse(ele.user);
        });
      const userData = await fireStore()
        .collection('Users')
        .doc(Res.user.uid)
        .get()
        .then((snapShot) => {
          console.log(snapShot, 'SNA');
          snapShot.forEach((doc) => doc.data());
        });
      if (userData.userName !== undefined) {
        await Auth()
          .currentUser.getIdTokenResult()
          .then((data) => {
            console.log(data, 'TOKEN');
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
            console.log('ELSE DATA', data);
            AsyncStorage.setItem('AuthToken', data);
            AsyncStorage.setItem('AccessToken', data);
            dispatch({
              type: 'SIGN_IN',
              payload: {loading: false, AuthToken: data, AccessToken: data},
            });
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
        payload: {loading: false},
      });
    }
  };
};

export const SignupCreater = (email, password) => {
  console.log('WOW');
  return async (dispatch) => {
    console.log('WO');
    dispatch({
      type: 'SIGN_IN',
      payload: {loading: true},
    });
    console.log('WOWW');
    try {
      console.log(email);
      console.log(password, 'PASS');
      const Res = await Auth()
        .createUserWithEmailAndPassword(email, password)
        .then((ele) => {
          console.log('SIUP ELE ', ele);
          return JSON.parse(ele.user);
        });
      console.log(Res.user.uid , "UID");
      if (Res.user) {
        const TokenData = await Auth()
          .currentUser.getIdTokenResult()
          .then(async (doc) => {
            console.log('UP TOK', doc);
            await AsyncStorage.setItem('AccessToken', JSON.stringify(doc));
            await AsyncStorage.setItem('AuthToken', JSON.stringify(doc));
            return doc;
          });
        console.log(TokenData, 'DTOKE');
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
