import Auth, {firebase} from '@react-native-firebase/auth';
import fireStore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const SinginCreater = (email, password) => {
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
          return ele;
        });
        console.log(Res,"RES")
      const userData = await fireStore()
        .collection('Users')
        .doc(Res.user.uid)
        .get()
        .then((snapShot) => {
          console.log(snapShot.data(), 'SNA');
          return snapShot.data;
        });
      if (userData.userName !== undefined) {
        await Auth()
          .currentUser.getIdTokenResult()
          .then((data) => {
            console.log(data, 'TOKEN');
            AsyncStorage.setItem('AuthToken', data);
            dispatch({
              type: 'SIGN_IN',
              payload: {loading: false, AuthToken: data, AccessToken: null},
            });
          });
      } else {
        await Auth()
          .currentUser.getIdTokenResult()
          .then((data) => {
            console.log('ELSE DATA', data.token);
            AsyncStorage.setItem('AuthToken', data.token);
            AsyncStorage.setItem('AccessToken', data.token);
            dispatch({
              type: 'SIGN_IN',
              payload: {
                loading: false,
                AuthToken: data,
                AccessToken: data.token,
                AuthToken: data.token,
              },
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
      console.log(e, 'Ee');
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
          return ele;
        });
      console.log(Res.user.uid, 'UID');
      if (Res.user) {
        const TokenData = await Auth()
          .currentUser.getIdTokenResult()
          .then(async (doc) => {
            console.log('UP TOK', doc);
            await AsyncStorage.setItem(
              'AccessToken',
              JSON.stringify(doc.token),
            );
            await AsyncStorage.setItem('AuthToken', JSON.stringify(doc.token));
            return doc.token;
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
            UserData:{userId:Res.user.uid}
          },
        });
      
      dispatch({
        type: 'SIGN_IN',
        payload: {
          loading: false,
        },
      });
    } catch (e) {
      console.log(e, 'Ee');
      dispatch({
        type: 'SIGN_IN',
        payload: {
          loading: false,
        },
      });
    }
  };
};
