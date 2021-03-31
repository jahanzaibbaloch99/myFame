import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Signin from '../Screens/SignIn';
import Signup from '../Screens/Signup';
import Onboarding from '../Screens/OnBoardingScreen';
import Introduction from '../Screens/Introduction';
import {useSelector} from 'react-redux';
import FilterScreen from '../Screens/FilterScreen';
// import Home from '../Screens/Home';
import BottomTabBar from './BottomTabNavigation';
import CreatePost from '../Screens/CreatePost';
import Spinner from '../Components/Commmon/Spinner';
const Stack = createStackNavigator();

const StackNavigation = (props) => {
  const {AuthToken, AccessToken, splash} = useSelector((state) => state.Auth);
  const [singinCheck, setsinginCheck] = useState(false);
  const [authCheck, setAuthCheck] = useState(false);
  useEffect(() => {
    const singinCheck = Boolean(AuthToken && AccessToken);
    setsinginCheck(singinCheck);
    const authCheck = Boolean(AuthToken && !AccessToken);
    setAuthCheck(authCheck);
  }, [AuthToken, AccessToken]);
  if (splash) return <Spinner color="black" size="small" />;
  return (
    <NavigationContainer>
      {singinCheck ? (
        <Stack.Navigator>
          <Stack.Screen name="Introduction" component={Introduction} />
        </Stack.Navigator>
      ) : authCheck ? (
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="Home"
            component={BottomTabBar}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="CreatePost"
            component={CreatePost}
          />
          <Stack.Screen name="Filter" component={FilterScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Onboard" component={Onboarding} />
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default StackNavigation;
