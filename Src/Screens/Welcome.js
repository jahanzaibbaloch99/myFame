import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {SignupCreater} from '../Utils/Firebase/Auth';
const Welcome = (props) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}>
        <Text>Welcome Screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
