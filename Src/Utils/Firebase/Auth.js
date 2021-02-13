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
          return ele
        });
        console.log(Res,"RES")
      const userData = await fireStore()
        .collection('Users')
        .doc(Res.user.uid)
        .get()
        .then((snapShot) => (snapShot.data()));
        console.log(userData,"DATA")
      if (userData.userName !== undefined) {
        await Auth()
          .currentUser.getIdTokenResult()
          .then((data) => {
            console.log(data , "DTATATOKEN")
            AsyncStorage.setItem('AuthToken', data.token);
            dispatch({
              type: 'SIGN_IN',
              payload: {loading: false, AuthToken: data.token,AccessToken:null,UserData:userData},
            });
          });
      } else {
        await Auth()
          .currentUser.getIdTokenResult()
          .then((data) => {
            console.log("ELESE")
            AsyncStorage.setItem('AuthToken', data.token);
            AsyncStorage.setItem('AccessToken', data.token);
            dispatch({
              type: 'SIGN_IN',
              payload: {loading: false, AuthToken: data.token, AccessToken: data.token , UserData:userData},
            });
          });
      }
    } catch (e) {
      console.log(e , "EEE")
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
        .then((ele) => ele);
        console.log(Res.user.uid , "RESSS")
      
        
        const TokenData = await Auth()
          .currentUser.getIdTokenResult()
          .then(async (doc) => {
            console.log(doc , "DOCCTOKEN")
            await AsyncStorage.setItem('AccessToken', JSON.stringify(doc.token));
            await AsyncStorage.setItem('AuthToken', JSON.stringify(doc.token));
            return doc.token;
          });
          const UserData = await fireStore().collection('Users').doc(Res.user.uid).set({
            email: email,
            createdAt: firebase.firestore.Timestamp.now(),
            firstName: '1212',
            lastName: '',
            userName: '',
            userId: Res.user.uid,
            ImageUrl: '',
            gender:"Not Specified",
          }).then((doc) => {
            console.log(doc , "DOC")
          })

      
          console.log(UserData , "userData")
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
      console.log(e , "E")
      dispatch({
        type: 'SIGN_IN',
        payload: {
          loading: false,
        },
      });
    }
  };
};
