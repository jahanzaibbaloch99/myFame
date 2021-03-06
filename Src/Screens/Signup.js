import React from 'react';
import {
  View,
  Image,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {SignupCreater} from '../Utils/Firebase/Auth';
import Button from '../Components/Commmon/Button';
import {useDispatch, useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';

const {width, height} = Dimensions.get('window');

const Signup = (props) => {
  const {SignupLoading} = useSelector((state) => state.Auth);
  const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isUserValid, setUserValid] = React.useState(true);
  const [isPasswordValid, setPasswordValid] = React.useState(true);
  const emailOnChange = (val) => {
    const validate = emailRegex.test(String(val).toLocaleLowerCase());
    if (validate) {
      setEmail(val);
      setUserValid(true);
    } else {
      setEmail(val);
      setUserValid(false);
    }
  };
  const OnPasswordChange = (val) => {
    if (val.trim().length >= 7) {
      setPassword(val);
      setPasswordValid(true);
    } else {
      setPassword(val);
      setPasswordValid(false);
    }
  };
  const singupAccount = () => {
    console.log('WORKING');
    if (email && password && isPasswordValid && isUserValid) {
      dispatch(SignupCreater(email, password));
    } else {
      showMessage({
        message: 'Please Fill Form Accordingly',
        type: 'danger',
        duration: 3000,
      });
    }
  };
  return (
    <SafeAreaView style={{flex: 1 , backgroundColor:"white"}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}>
        <View style={{height:"20%",width:"50%" , justifyContent:"center" ,alignContent:"center" , alignItems:"center"}}><Image style={{height:"100%" ,width:"100%"}} source={require("../../assets/Logo.png")} resizeMode="contain"/></View>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            marginTop:15
          }}>
          <TextInput
            onChangeText={emailOnChange}
            placeholder={'Enter Your Email'}
            style={{
              width: '95%',
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
          {isUserValid ? null : (
            <Text
              style={{
                color: '#FF0000',
                fontSize: 14,
                marginLeft: width * 0.05,
                marginTop: width * 0.01,
              }}>
              Please Enter A Valid Email
            </Text>
          )}
        </View>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
          }}>
          <TextInput
            placeholder={'Enter Your Password'}
            onChangeText={OnPasswordChange}
            secureTextEntry={true}
            style={{
              width: '95%',
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
          {isPasswordValid ? null : (
            <Text
              style={{
                color: '#FF0000',
                fontSize: 14,
                marginLeft: width * 0.05,
                marginTop: width * 0.01,
              }}>
              Please enter a valid password that’s Should be atleast 7
              characters Long!
            </Text>
          )}
        </View>
        <Button
          buttonText="Sign Up"
          viewStyle={{
            backgroundColor: '#262626',
            marginTop: '12%',
            width: width / 1.1,
            height: 47,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 90,
          }}
          textStyle={{
            color: 'white',
            fontSize: 15,
            fontFamily: 'Helvetica',
          }}
          onPress={singupAccount}
          loader={SignupLoading}
        />
        {/* <View
          style={{
            width: '100%',
            marginVertical: 15,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            height: '5%',
          }}>
          <TouchableOpacity
            onPress={singupAccount}
            style={{
              borderRadius: 10,
              height: '100%',
              backgroundColor: '#242424',
              width: '50%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white'}}>Sing Up</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default Signup;
