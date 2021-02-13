import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {SignupCreater, SinginCreater} from '../Utils/Firebase/Auth';
const Signup = (props) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const emailOnChange = (e) => {
    setEmail(e);
  };
  const OnPasswordChange = (e) => {
    setPassword(e);
  };
  const singupAccount = async () => {
    useDispatch(SinginCreater({email, password}));
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
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
        </View>
        <View
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
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
