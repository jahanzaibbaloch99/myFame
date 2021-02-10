import React from 'react';
import {TouchableOpacity, Text, ActivityIndicator, View} from 'react-native';

const Button = ({
  buttonText,
  viewStyle,
  textStyle,
  onPress,
  loader,
  disable,
}) => {
  return (
    <>
      {loader ? (
        <View style={viewStyle}>
          <ActivityIndicator color={'white'} />
        </View>
      ) : (
        <TouchableOpacity
          style={viewStyle}
          onPress={onPress}
          disabled={disable}>
          <Text style={textStyle}>{buttonText}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default Button;
