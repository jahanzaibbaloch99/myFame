import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Button from '../Components/Commmon/Button';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import auth, {firebase} from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import fireStore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {height, width} = Dimensions.get('window');
const Onboard = (props) => {
  const dispatch = useDispatch();
  const [facebookToken, setFacebookToken] = React.useState('');
  const [fbloading, setLoading] = React.useState(false);
  const onFacebookLogin = async () => {
    setLoading(true);
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.isCancelled) {
      setLoading(false);
    }
    const data = await AccessToken.getCurrentAccessToken();
    if (data) {
      const faceBookCrediental = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );
      const Authentic = auth()
        .signInWithCredential(faceBookCrediental)
        .then((snap) => {
          AsyncStorage.setItem('AuthToken', data.accessToken);
          return snap;
        })
        .then((data) => {
          return data;
        });
      const UserData = auth().currentUser;
      console.log(UserData, 'USERDATA');
      setLoading(false);
      await fireStore()
        .collection('Users')
        .doc(UserData.uid)
        .set({
          email: UserData.email,
          createdAt: firebase.firestore.Timestamp.now(),
          firstName: UserData.displayName,
          lastName: '',
          userName:
            UserData.displayName +
            Math.random(900 * 9)
              .toFixed()
              .toString(),
          userId: UserData.uid,
          ImageUrl: UserData.photoURL,
        });
      dispatch({
        type: 'SIGN_IN',
        payload: {
          loading: false,
          AuthToken: data.accessToken,
          AccessToken: null,
          UserData: {userId: UserData.uid},
        },
      });
    }
  };
  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
      }}>
      <Button
        buttonText="Facebook"
        viewStyle={{
          backgroundColor: '#1DA1F2',
          marginTop: '12%',
          width: width / 1.1,
          height: 47,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 90,
        }}
        textStyle={styles.joinEnticeBtnText}
        onPress={() => onFacebookLogin()}
        loader={fbloading}
      />
      <Button
        buttonText="Twitter"
        viewStyle={{
          backgroundColor: '#1DA1F2',
          marginTop: '12%',
          width: width / 1.1,
          height: 47,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 90,
        }}
        textStyle={styles.joinEnticeBtnText}
        onPress={() => props.navigation.navigate('Signup')}
      />
      <Button
        buttonText="Join MyFame"
        viewStyle={styles.joinEnticeBtn}
        textStyle={styles.joinEnticeBtnText}
        onPress={() => props.navigation.navigate('Signup')}
      />
      <Button
        buttonText="Sign in"
        viewStyle={styles.signBtn}
        textStyle={styles.signBtnText}
        onPress={() => props.navigation.navigate('Signin')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: width / 5,
  },
  sectionOne: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  viewText1: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 1.5,
    marginTop: width * 0.3,
  },
  text1: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Helvetica Neue',
    lineHeight: 41.51,
  },
  viewText2: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 1.1,
    marginTop: '5%',
  },
  text2: {
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    fontFamily: 'Helvetica Neue',
    lineHeight: 25,
  },
  joinEnticeBtn: {
    backgroundColor: 'black',
    marginTop: '12%',
    width: width / 1.1,
    height: 47,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 90,
  },
  joinEnticeBtnText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'Helvetica',
  },
  signBtn: {
    borderColor: 'black',
    marginTop: '7%',
    width: width / 1.1,
    height: 47,
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signBtnText: {
    color: 'black',
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Helvetica',
  },
  viewText3: {
    alignItems: 'center',
    width: width / 1.1,
    marginTop: width * 0.3,
    marginBottom: width * 0.26,
  },
  text3: {fontSize: 20, fontWeight: '400'},
  viewText4: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(16,16,16)',
  },
  sectionTwo: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(16,16,16)',
  },
  viewText4: {marginTop: '20%', width: '75%'},
  text4: {
    color: 'white',
    fontSize: 34,
    fontWeight: '500',
    fontFamily: 'Helvetica Neue',
  },
  viewText5: {marginTop: '7.5%', width: '75%'},
  text5: {
    color: '#9C9C9C',
    fontSize: 22,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 30,
    fontFamily: 'Helvetica Neue',
  },
  cardMainView: {
    backgroundColor: 'white',
    width: '80%',
    marginTop: '20%',
    borderRadius: 8,
  },
  cardCenterView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: '10%',
    marginBottom: '10%',
  },
  cardLeft: {
    flexDirection: 'column',
  },
  cardLeftText1: {
    fontSize: 18,
    marginTop: '10%',
  },
  cardLeftText2: {
    fontSize: 18,
    marginTop: '30%',
  },
  cardLeftText3: {
    fontSize: 18,
    marginTop: '30%',
  },
  cardLeftText4: {
    fontSize: 18,
    marginTop: '30%',
  },
  cardRight: {
    flexDirection: 'column',
  },
  cardRightText1: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: '10%',
  },
  cardRightText2: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: '30%',
  },
  cardRightText3: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: '30%',
  },
  cardRightText4: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: '30%',
  },
  joinEnticeBtn2: {
    marginTop: '20%',
    marginLeft: '35%',
    height: 40,
    borderColor: 'white',
    width: '40%',
    borderWidth: 0.5,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinEnticeBtnText2: {
    color: 'white',
  },
  line: {
    width: '85%',
    marginTop: '20%',
    marginBottom: '20%',
    borderBottomColor: 'rgb(82,82,82)',
    borderBottomWidth: 0.5,
  },
  viewText6: {
    width: '75%',
  },
  text6: {
    color: 'white',
    fontSize: 36,
    fontWeight: '700',
    fontFamily: 'Helvetica Neue',
    lineHeight: 43.96,
  },
  viewText7: {marginTop: '7.5%', width: '80%'},
  text7: {
    color: '#9C9C9C',
    fontSize: 22,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 26,
    fontFamily: 'Helvetica Neue',
  },
  sectionThree: {
    marginTop: '20%',
  },
  view1: {
    marginLeft: '5%',
  },
  view2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text8: {
    marginLeft: '8%',
    color: 'white',
    fontSize: 22,
    lineHeight: 30,
  },
  view3: {
    width: '98%',
    marginTop: '6%',
  },
  text9: {
    color: 'rgb(156,156,156)',
    fontSize: 18,
    lineHeight: 30,
  },
  view4: {
    marginLeft: '5%',
    marginTop: '20%',
  },
  text10: {
    marginLeft: '8%',
    color: 'white',
    fontSize: 22,
  },
  view5: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text11: {
    marginLeft: '8%',
    color: 'white',
    fontSize: 22,
  },
  view6: {
    width: '98%',
    marginTop: '6%',
  },
  text12: {
    color: 'rgb(156,156,156)',
    fontSize: 18,
  },
  view7: {
    marginLeft: '8%',
    marginTop: '20%',
  },
  view8: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text13: {
    marginLeft: '8%',
    color: 'white',
    fontSize: 22,
  },
  view9: {
    width: '98%',
    marginTop: '6%',
  },
  text14: {
    color: 'rgb(156,156,156)',
    fontSize: 18,
  },
  joinEnticeBtn3: {
    marginTop: '20%',
    marginLeft: '35%',
    height: 40,
    backgroundColor: 'white',
    width: '40%',
    borderWidth: 0.5,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10%',
  },
  joinEnticeBtnText3: {
    color: 'black',
    fontSize: 15,
  },
});

export default Onboard;
