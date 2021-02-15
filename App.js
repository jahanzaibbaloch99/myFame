/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import StackNavigation from './Src/Stacknavigator/Stacknavigator';
import SplashScreen from 'react-native-splash-screen';
import FlashMessage from 'react-native-flash-message';
import {getAuthTokenStorage} from "./Src/Store/Actions/Auth"
const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    SplashScreen.hide();
  },[]); 
  useEffect(() => {
    dispatch(getAuthTokenStorage())
  },[])
  return (
    <>
      <StackNavigation />
      <FlashMessage position="top" />
    </>
  );
};

export default App;
