/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import StackNavigation from './Src/Stacknavigator/Stacknavigator';
const App = () => {
  const Auth = useSelector((state) => state.Auth);
  return (
    <>
      <StackNavigation />
    </>
  );
};

export default App;
