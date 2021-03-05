import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  NativeModules,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Modalize} from 'react-native-modalize';
import Button from '../Components/Commmon/Button';
import {useSelector, useDispatch} from 'react-redux';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import RNFetchBlob from 'rn-fetch-blob';
var ImagePicker = NativeModules.ImageCropPicker;
export default function Profile() {
  const dispatch = useDispatch();
  async function getPathForFirebaseStorage(uri) {
    if (Platform.OS === 'ios') return uri;
    const stat = await RNFetchBlob.fs.stat(uri);
    return stat.path;
  }
  const modalizeRef = useRef(null);
  const editModalRef = useRef(null);
  const [isPanelActive, setIsPanelActive] = React.useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const userProf = useSelector((state) => state.Auth.UserData);
  useEffect(() => {
    if (userProf.firstName) {
      setFirstName(userProf.firstName);
    }
    if (userProf.lastName) {
      setLastName(userProf.lastName);
    }
  }, [userProf]);

  console.log(userProf, 'USERS');
  useEffect(() => {
    setUserProfile(userProf);
  }, [userProf]);
  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const EditOpen = () => {
    editModalRef.current.open();
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
      if (profileImage?.uri) {
        console.log(profileImage?.uri, 'URI');
        const storageRef = await storage().ref(
          `buckets/avatar/${userProfile.userId}/`,
        );
        // async function getPathForFirebaseStorage(uri) {
        //   if (Platform.OS === 'ios') return uri;
        //   const stat = await RNFetchBlob.fs.stat(uri);
        //   return stat.path;
        // }
        let url = '';
        const fileUri = await getPathForFirebaseStorage(profileImage.uri);
        const uploadTask = await storageRef
          .child(
            profileImage.name ||
              `Documents${profileImage.type}${profileImage.size}`,
          )
          .putFile(fileUri);
        let ref = storage().ref(uploadTask.metadata.fullPath);
        url = await ref.getDownloadURL().then((url) => url);

        const db = firestore();
        const batch = db.batch();
        const Dataref = db
          .collection('Users')
          .doc(userProfile.userId)
          .update({
            ImageUrl: url || '',
          });
        console.log(Dataref);
        await firestore()
          .collection('Users')
          .doc(userProfile.userId)
          .get()
          .then((data) => {
            const newdata = data.data();
            console.log(newdata, 'NEw');
            dispatch({
              type: 'USER_DATA',
              payload: {UserData: newdata},
            });
          });
      }
    });
  };
  const updateProfile = async () => {
    if (firstName || lastName) {
      console.log('WORK');
      try {
        const db = firestore();
        const batch = db.batch();
        const ref = db.collection('Users').doc(userProfile.userId);
        batch.update(ref, {
          firstName: firstName,
          lastName: lastName,
        });
        batch.commit().then(() => {
          db.collection('Users')
            .doc(userProfile.userId)
            .get()
            .then((data) => {
              const newdata = data.data();
              console.log(newdata, 'NEw');
              dispatch({
                type: 'USER_DATA',
                payload: {UserData: newdata},
              });
            });
          console.log('UPDATED');
        });
      } catch (e) {
        console.log(e, 'E');
      }
    }
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
      if (profileImage?.uri) {
        console.log(profileImage?.uri, 'URI');
        const storageRef = await storage().ref(
          `buckets/avatar/${userProfile.userId}/`,
        );
        // async function getPathForFirebaseStorage(uri) {
        //   if (Platform.OS === 'ios') return uri;
        //   const stat = await RNFetchBlob.fs.stat(uri);
        //   return stat.path;
        // }
        let url = '';
        const fileUri = await getPathForFirebaseStorage(profileImage.uri);
        const uploadTask = await storageRef
          .child(
            profileImage.name ||
              `Documents${profileImage.type}${profileImage.size}`,
          )
          .putFile(fileUri);
        let ref = storage().ref(uploadTask.metadata.fullPath);
        url = await ref.getDownloadURL().then((url) => url);

        const db = firestore();
        const batch = db.batch();
        const Dataref = db
          .collection('Users')
          .doc(userProfile.userId)
          .update({
            ImageUrl: url || '',
          });
        await firestore()
          .collection('Users')
          .doc(userProfile.userId)
          .get()
          .then((data) => {
            const newdata = data.data();
            console.log(newdata, 'NEw');
            dispatch({
              type: 'USER_DATA',
              payload: {UserData: newdata},
            });
          });
      }
      // setProfileImage(profileImage);
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
          <TouchableOpacity
            onPress={openGallery}
            style={{alignItems: 'center'}}>
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
        <Modalize ref={editModalRef} modalHeight={250}>
          <View style={{marginTop: 10}}>
            <FloatingLabelInput
              label="First Name"
              value={firstName}
              onChangeText={(e) => setFirstName(e)}
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
            <FloatingLabelInput
              label="Last Name"
              value={lastName}
              onChangeText={(e) => setLastName(e)}
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

          <TouchableOpacity
            onPress={updateProfile}
            style={{alignItems: 'center'}}>
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
              <Text style={{color: 'white', fontSize: 18}}>Save</Text>
            </View>
          </TouchableOpacity>
        </Modalize>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{alignSelf: 'center'}}>
            <View style={styles.profileImage}>
              {userProfile && userProfile?.ImageUrl ? (
                <Image
                  source={{uri: userProfile?.ImageUrl}}
                  style={styles.image}
                  resizeMode="center"></Image>
              ) : (
                <Image
                  source={{uri: 'https://reactjs.org/logo-og.png'}}
                  style={styles.image}
                  resizeMode="center"></Image>
              )}
            </View>
            <TouchableOpacity onPress={onOpen} style={styles.add}>
              <Icon
                name="camera"
                size={25}
                color="#DFD8C8"
                style={{marginTop: 6, marginLeft: 2}}></Icon>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={EditOpen} style={styles.add}>
            <Icon name="edit" size={25} color="#DFD8C8"></Icon>
          </TouchableOpacity>
          <View style={styles.infoContainer}>
            <Text style={[styles.text, {fontWeight: '200', fontSize: 36}]}>
              {userProfile.firstName && userProfile.firstName}
            </Text>
            <Text style={[styles.text, {color: '#AEB5BC', fontSize: 14}]}>
              {userProfile?.userName && userProfile?.userName}
            </Text>
          </View>

          {/* <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <Text style={[styles.text, {fontSize: 24}]}>483</Text>
            <Text style={[styles.text, styles.subText]}>Posts</Text>
          </View>
          <View
            style={[
              styles.statsBox,
              {borderColor: '#DFD8C8', borderLeftWidth: 1, borderRightWidth: 1},
            ]}>
            <Text style={[styles.text, {fontSize: 24}]}>45,844</Text>
            <Text style={[styles.text, styles.subText]}>Followers</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={[styles.text, {fontSize: 24}]}>302</Text>
            <Text style={[styles.text, styles.subText]}>Following</Text>
          </View>
        </View> */}
          {/* 
        <View style={{marginTop: 32}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.mediaImageContainer}>
              <Image
                source={{uri: 'https://reactjs.org/logo-og.png'}}
                style={styles.image}
                resizeMode="cover"></Image>
            </View>
            <View style={styles.mediaImageContainer}>
              <Image
                source={{uri: 'https://reactjs.org/logo-og.png'}}
                style={styles.image}
                resizeMode="cover"></Image>
            </View>
            <View style={styles.mediaImageContainer}>
              <Image
                source={{uri: 'https://reactjs.org/logo-og.png'}}
                style={styles.image}
                resizeMode="cover"></Image>
            </View>
          </ScrollView>
          <View style={styles.mediaCount}>
            <Text
              style={[
                styles.text,
                {fontSize: 24, color: '#DFD8C8', fontWeight: '300'},
              ]}>
              70
            </Text>
            <Text
              style={[
                styles.text,
                {fontSize: 12, color: '#DFD8C8', textTransform: 'uppercase'},
              ]}>
              Media
            </Text>
          </View>
        </View> */}
          {/* <Text style={[styles.subText, styles.recent]}>Recent Activity</Text> */}
          {/* <View style={{alignItems: 'center'}}>
          <View style={styles.recentItem}>
            <View style={styles.activityIndicator}></View>
            <View style={{width: 250}}>
              <Text
                style={[styles.text, {color: '#41444B', fontWeight: '300'}]}>
                Started following{' '}
                <Text style={{fontWeight: '400'}}>Jake Challeahe</Text> and{' '}
                <Text style={{fontWeight: '400'}}>Luis Poteer</Text>
              </Text>
            </View>
          </View>

          <View style={styles.recentItem}>
            <View style={styles.activityIndicator}></View>
            <View style={{width: 250}}>
              <Text
                style={[styles.text, {color: '#41444B', fontWeight: '300'}]}>
                Started following{' '}
                <Text style={{fontWeight: '400'}}>Luke Harper</Text>
              </Text>
            </View>
          </View>
        </View> */}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  text: {
    fontFamily: 'HelveticaNeue',
    color: '#52575D',
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginHorizontal: 16,
  },
  subText: {
    fontSize: 12,
    color: '#AEB5BC',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
  },
  dm: {
    backgroundColor: '#41444B',
    position: 'absolute',
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    backgroundColor: '#34FFB9',
    position: 'absolute',
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  add: {
    backgroundColor: '#41444B',
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 32,
  },
  statsBox: {
    alignItems: 'center',
    flex: 1,
  },
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  mediaCount: {
    backgroundColor: '#41444B',
    position: 'absolute',
    top: '50%',
    marginTop: -50,
    marginLeft: 30,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    shadowColor: 'rgba(0, 0, 0, 0.38)',
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 20,
    shadowOpacity: 1,
  },
  recent: {
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 10,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  activityIndicator: {
    backgroundColor: '#CABFAB',
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20,
  },
});
