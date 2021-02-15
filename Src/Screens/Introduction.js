import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  NativeModules,
  StyleSheet,
} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {useDispatch, useSelector} from 'react-redux';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import RNFetchBlob from 'rn-fetch-blob';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from "../Components/Commmon/Button"
var ImagePicker = NativeModules.ImageCropPicker;

const Introduction = (props) => {
  const modalizeRef = useRef(null);
  const [isPanelActive, setIsPanelActive] = React.useState(false);
  const [firstname, setfirstname] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [profileImage, setProfileImage] = React.useState({});
  const {UserData} = useSelector((state) => state.Auth);
  const [profileLoading, setProfileLoading] = React.useState(false);
  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const [panelProps, setPanelProps] = React.useState({
    showCloseButton: true,
    fullWidth: true,
    onClose: () => closePanel(),
    openLarge: true,
    onPressCloseButton: () => closePanel(),
  });
  const closePanel = () => {
    setIsPanelActive(false);
  };
  const openGallery = async () => {
    ImagePicker.openPicker({
      saveToPhotos: true,
      cropping: true,
      cropperCircleOverlay: true,
    }).then(async (image) => {
      const path =
        Platform.OS === 'ios' ? image?.uri || image?.path : image.path;
      var fileNameReal = path.split('/').pop();
      var fileType = fileNameReal.split('.').pop();

      let profileImage = {
        name: fileNameReal,
        uri: path,
        cropRect: image.cropRect,
        type: image?.mime,
        mime: fileType,
      };

      setProfileImage(profileImage);
    });
  };
  const openCamera = async () => {
    ImagePicker.openCamera({
      saveToPhotos: true,
      cropping: true,
      cropperCircleOverlay: true,
    }).then(async (image) => {
      const path =
        Platform.OS === 'ios' ? image?.uri || image?.path : image.path;
      var fileNameReal = path.split('/').pop();
      var fileType = fileNameReal.split('.').pop();

      let profileImage = {
        name: fileNameReal,
        uri: path,
        cropRect: image.cropRect,
        type: image?.mime,
        mime: fileType,
      };

      setProfileImage(profileImage);
    });
  };
  const dispatch = useDispatch();

  const changeUserName = (e) => {
    setUserName(e);
  };
  const changeName = (e) => {
    setfirstname(e);
  };
  const changeLast = (e) => {
    setLastName(e);
  };
  const uploadToServer = async () => {
    setProfileLoading(true);
    let url = '';
    try {
      if (profileImage?.uri) {
        console.log(profileImage?.uri ,"URI")
        const storageRef = await storage().ref(
          `buckets/avatar/${UserData.userId}/`,
        );
        async function getPathForFirebaseStorage(uri) {
          if (Platform.OS === 'ios') return uri;
          const stat = await RNFetchBlob.fs.stat(uri);
          return stat.path;
        }
        const fileUri = await getPathForFirebaseStorage(profileImage.uri);
        const uploadTask = await storageRef
          .child(
            profileImage.name ||
              `Documents${profileImage.type}${profileImage.size}`,
          )
          .putFile(fileUri);
        let ref = storage().ref(uploadTask.metadata.fullPath);
        url = await ref.getDownloadURL().then((url) => url);
      }
      const db = firestore();
      const batch = db.batch();
      const Dataref = db.collection('Users').doc(UserData.userId).update({
        firstName: firstname || "",
        ImageUrl: url || "",
        lastName: lastName || "",
        userName: userName || "",
      });

      console.log(Dataref,"REF")
      // const updated = batch.set(Dataref, {
      //   firstName: firstname || "",
      //   ImageUrl: url || "",
      //   lastName: lastName || "",
      //   userName: userName || "",
      // });
      // console.log(updated , "UPDATED")
      setProfileImage(false);
      await AsyncStorage.removeItem('AccessToken');
      dispatch({
        type: 'SIGN_IN',
        payload: {
          loading: false,
          AccessToken: null,
        },
      });
    } catch (e) {
      setProfileImage(false);
      showMessage({
        message: e.message,
        duration: 3000,
        type: 'danger',
      });
      console.log(e, 'E');
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'rgb(255,255,255)'}}>
      <Modalize ref={modalizeRef} modalHeight={200}>
        <TouchableOpacity onPress={openCamera} style={{alignItems: 'center'}}>
          <View
            style={{
              marginTop: '10%',
              width: '90%',
              height: 47,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'black',
              borderRadius: 90,
            }}>
            <Text style={{color: 'white', fontSize: 18}}>Camera</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={openGallery} style={{alignItems: 'center'}}>
          <View
            style={{
              marginTop: '10%',
              width: '90%',
              height: 47,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'black',
              borderRadius: 90,
            }}>
            <Text style={{color: 'white', fontSize: 18}}>Gallery</Text>
          </View>
        </TouchableOpacity>
      </Modalize>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{width: '80%', marginTop: '20%', marginLeft: '5%'}}>
          <TouchableOpacity onPress={onOpen}>
          {profileImage?.uri ? (
              <Image
                source={{uri: profileImage?.uri}}
                style={{width: 88, height: 88, borderRadius: 90}}
              />
            ) : (
              <View
                style={{
                  backgroundColor: '#D3D3D3',
                  width: 88,
                  height: 88,
                  borderRadius: 88 / 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
              </View>
            )}
          </TouchableOpacity>
          <View style={{marginTop: '5%', width: '60%', marginLeft: '3%'}}>
            <Text style={{fontSize: 30, fontWeight: '500', lineHeight: 35}}>
              Welcome!
            </Text>
            <Text
              style={{
                width: '110%',
                fontSize: 16,
                fontWeight: '300',
                fontStyle: 'normal',
                lineHeight: 35,
                color: 'rgb(40,40,40)',
              }}>
              Let’s start with the basics.
            </Text>
          </View>
          <View style={styles.view2}>
            <View style={styles.view3}>
              <View
                style={{
                  width: '50%',
                  marginRight: '10%',
                  paddingVertical: Platform.OS === 'ios' ? 18 : 0,
                }}>
                <FloatingLabelInput
                  label="First name"
                  value={firstname}
                  onChangeText={changeName}
                  containerStyles={{
                    borderBottomColor: 'rgb(239,239,239)',
                    borderWidth: 1,
                    paddingVertical: 10,
                    borderColor: 'white',
                  }}
                  customLabelStyles={{
                    colorBlurred: 'grey',
                    colorFocused: '#7780f4',
                  }}
                />
              </View>
              <View
                style={{
                  width: '50%',
                  marginRight: '10%',
                  paddingVertical: Platform.OS === 'ios' ? 18 : 0,
                }}>
                <FloatingLabelInput
                  label="Last name"
                  value={lastName}
                  onChangeText={changeLast}
                  containerStyles={{
                    borderBottomColor: 'rgb(239,239,239)',
                    borderWidth: 1,
                    paddingVertical: 10,
                    borderColor: 'white',
                  }}
                  customLabelStyles={{
                    colorBlurred: 'grey',
                    colorFocused: '#7780f4',
                  }}
                />
              </View>
            </View>
            {/* <AutoComplete
              containerStyle={styles.inputView3}
              inputContainerStyle={styles.input3}
              placeholder="Location (optional)"
              data={locationArray}
              defaultValue={Location && Location !== undefined ? Location : ''}
              onChangeText={changeLocation}
              keyboardShouldPersistTaps="always"
              renderItem={({item}) => (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                  }}
                  onPress={() => {
                    setCity(`${item.city}, ${item.region}, ${item.country}`),
                      setLocationArray([]);
                  }}>
                  <View>
                    <Text>{item.city}</Text>
                  </View>
                  <View>
                    <Text>{item.region}</Text>
                  </View>
                  <View>
                    <Text>{item.country}</Text>
                  </View>
                </TouchableOpacity>
              )}
            /> */}
            <View
              style={{
                width: '110%',
                marginTop: '8%',
                paddingTop: Platform.OS === 'ios' ? 18 : 0,
              }}>
              <FloatingLabelInput
                label="Username"
                value={userName}
                onChangeText={(e) => {
                  changeUserName(e);
                }}
                containerStyles={{
                  borderBottomColor: 'rgb(239,239,239)',
                  borderWidth: 1,
                  paddingVertical: 10,
                  borderColor: 'white',
                }}
                customLabelStyles={{
                  colorBlurred: 'grey',
                  colorFocused: '#7780f4',
                }}
              />
            </View>
            <Button
              onPress={uploadToServer}
              buttonText="Finish"
              viewStyle={styles.nextBtn}
              textStyle={styles.nextBtnText}
              loader={profileLoading}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)',
  },
  image: {
    width: '20%',
  },
  view1: {
    width: '80%',
    marginTop: '20%',
    marginLeft: '5%',
  },
  viewText1: {
    marginTop: '5%',
    width: '60%',
    marginLeft: '3%',
  },
  text1: {
    fontSize: 30,
    fontWeight: '500',
    lineHeight: 35,
  },
  text2: {
    width: '110%',
    fontSize: 16,
    fontWeight: '300',
    fontStyle: 'normal',
    lineHeight: 35,
    color: 'rgb(40,40,40)',
  },
  view2: {
    marginTop: '10%',
  },
  view3: {
    flexDirection: 'row',
  },
  input1: {
    width: '100%',
    color: 'rgb(175,175,175)',
    borderBottomColor: 'rgb(239,239,239)',
    borderBottomWidth: 1,
  },
  inputView: {
    width: '50%',
    marginRight: '10%',
    paddingTop: Platform.OS === 'ios' ? 18 : 0,
  },
  input2: {
    borderBottomColor: 'rgb(239,239,239)',
    borderBottomWidth: 1,
    color: 'rgb(175,175,175)',
    width: '100%',
  },
  inputView2: {
    width: '50%',
    paddingTop: Platform.OS === 'ios' ? 18 : 0,
  },
  input3: {
    width: '100%',
    borderBottomColor: 'rgb(239,239,239)',
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  inputView3: {
    width: '110%',
    marginTop: '8%',
    paddingTop: Platform.OS === 'ios' ? 18 : 0,
    backgroundColor: '#ffffff',
    borderWidth: 0,
  },
  input4: {
    width: '100%',
    color: 'rgb(175,175,175)',
    borderBottomColor: 'rgb(239,239,239)',
    borderBottomWidth: 1,
  },
  inputView4: {
    width: '110%',
    marginTop: '8%',
    paddingTop: Platform.OS === 'ios' ? 18 : 0,
  },
  nextBtn: {
    backgroundColor: 'black',
    marginTop: '20%',
    width: '110%',
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 90,
    marginBottom: '10%',
  },
  nextBtnText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'Helvetica',
  },
});

export default Introduction;
