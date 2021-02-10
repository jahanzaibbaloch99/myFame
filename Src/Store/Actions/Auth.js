import {SignupCreater, SinginCreater} from '../../Utils/Firebase/Auth';
export const SigninExisting = (val) => {
  return async (dispatch) => {
    const {email, password} = val;
    dispatch({
      type: 'SIGN_IN',
      payload: {loading: true},
    });
    const data = await SinginCreater(email, password);
    console.log(data, 'DATA');
  };
};
export const singUpNew = (val) => {
  return async (dispatch) => {
    const {email, password} = val;
    dispatch({
      type: 'SIGN_UP',
      payload: {loading: true},
    });
    const data = await SignupCreater(email, password);
    console.log(data, 'DATA');
  };
};
