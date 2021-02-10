import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const Onboard = (props) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity style={{marginVertical: 10}}>
        <Text>FACEBOOK</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{marginVertical: 10}}>
        <Text>Twitters</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Signin')}
        style={{marginVertical: 10}}>
        <Text>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginVertical: 10}}
        onPress={() => props.navigation.navigate('Signup')}>
        <Text>Singup</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Onboard;
