import React from "react"
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Signin from '../Screens/SignIn';
import Signup from '../Screens/Signup';
import Onboarding from '../Screens/OnBoardingScreen';
import Introduction from '../Screens/Introduction';
const Stack = createStackNavigator();

const StackNavigation = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name="Onboard" component={Onboarding} options={{headerShown:true}} />
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="Signup" component={Signup}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;