import Auth from '@react-native-firebase/auth';
import fireStore from "@react-native-firebase/firestore"
export const SinginCreater = async (email, password) => {
  try {
    const Res = await Auth()
      .signInWithEmailAndPassword(email, password)
      .then((ele) => {
          return JSON.parse(ele.user)
      });
    return Res;
  } catch (e) {
    return e;
  }
};

export const SignupCreater = async (email, password) => {
  try {
    const Res = await Auth()
      .createUserWithEmailAndPassword(email, password)
      .then((ele) => {
        return JSON.parse(ele.user)
    });
    if (Res.user) {
      const await 
    }
    return Res;
  } catch (e) {
    return e;
  }
};
