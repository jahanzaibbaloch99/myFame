import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import {useDispatch} from 'react-redux';
import {SignupCreater} from '../Utils/Firebase/Auth';
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth"
import Button from "../Components/Commmon/Button";
import {useSelector} from "react-redux";
import {Logout} from "../Store/Actions/Auth";
import { Use } from 'react-native-svg';
const {height,width} = Dimensions.get("window")
const Welcome = (props) => {
  const dispatch = useDispatch();
  const {UserData} = useSelector(state => state.Auth)
 const [userData, setUserData] = React.useState({});
  React.useEffect(() => {
    getuserData()
  },[]);
  const Singout = () => {
    dispatch(Logout())
  }
  console.log(UserData,"SSs")
  const getuserData = async() => {
    const uid = await auth().currentUser;
    console.log(uid , "UUId")
    const data = await firestore().collection("Users").doc(uid.uid).get().then(snap => {
      console.log(snap,"SNAP");
      console.log(snap.data() , "DATASNAP")
      return snap.data()})
    console.log(data , "DATAa")
    setUserData(data)
  }
  console.log(userData , "USErs")
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          flexDirection:"column"
        }}>
        <Text>Welcome To MyFame</Text>
        <View><Text>User Email : {userData.email || ""}</Text></View>

        <View><Text>UserName : {userData.userName || ""}</Text></View>
        <View><Text>firstName : {userData.firstName || ""}</Text></View>
        <View><Text>UserId : {userData.userId}</Text></View>
        <Button
          onPress={Singout}
          buttonText="Logout"
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
        />

      </View>
    </SafeAreaView>
  );
};

export default Welcome;
