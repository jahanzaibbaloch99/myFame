import Auth from '@react-native-firebase/auth';
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
    return Res;
  } catch (e) {
    return e;
  }
};
