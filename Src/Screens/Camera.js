import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  NativeModules,
  Image,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import PhotoEditor from 'react-native-photo-editor';
// import RNFetchBlob from 'rn-fetch-blob';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import RNFS from 'react-native-fs';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {Modalize} from 'react-native-modalize';
import RNFetchBlob from 'rn-fetch-blob';
import Button from "../Components/Commmon/Button"
var ImagePicker = NativeModules.ImageCropPicker;

const Camera = (props) => {
  const {navigation} = props;
  const {UserData} = useSelector((state) => state.Auth);
  const [isRecording, setIsRecording] = useState(false);
  const [newPic, setNewpic] = useState(false);
  const [picUri, setUri] = useState('');
  const modalizeRef = useRef(null);
  useFocusEffect(
    React.useCallback(() => {
      onOpen();
    }, []),
  );
  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const [data, setData] = useState('');
  const camera = useRef();
  async function getPathForFirebaseStorage(uri) {
    if (Platform.OS === 'ios') return uri;
    const stat = await RNFetchBlob.fs.stat(uri);
    return stat.path;
  }
  const openCamera = async () => {
    ImagePicker.openCamera({
      saveToPhotos: true,
      cropping: true,
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
        const fileUri = await getPathForFirebaseStorage(profileImage.uri);
        setUri(fileUri);
        console.log(profileImage?.uri, 'URI');
        PhotoEditor.Edit({
          path: fileUri,
          stickers: [
            'sticker0',
            'sticker1',
            'sticker2',
            'sticker3',
            'sticker4',
            'sticker5',
            'sticker6',
            'sticker7',
            'sticker8',
            'sticker9',
            'sticker10',
          ],
          //   hiddenControls: [
          //     'clear',
          //     'crop',
          //     'draw',
          //     'save',
          //     'share',
          //     'sticker',
          //     'text',
          //   ],
          colors: undefined,
          onDone: async () => {
            modalizeRef.current?.close();
            navigation.navigate('CreatePost', {
              videoUri: fileUri,
              profileImage: profileImage,
              UserData: UserData,
            });

            // let url;
            // const storageRef = storage().ref(
            //   `buckets/PostImages/${UserData.userId}/`,
            // );
            // const uploadTask = await storageRef
            //   .child(
            //     profileImage.name ||
            //       `Documents${profileImage.type}${profileImage.size}`,
            //   )
            //   .putFile(fileUri);
            // let ref = storage().ref(uploadTask.metadata.fullPath);
            // url = await ref.getDownloadURL().then((url) => url);

            // const db = firestore();
            // const batch = db.batch();
            // const Dataref = db
            //   .collection('ImagePosts')
            //   .doc()
            //   .set({
            //     ImageUrl: url || '',
            //   });
            // console.log('on done');
          },
          onCancel: () => {
            console.log('on cancel');
          },
        });
        // const storageRef = await storage().ref(
        //   `buckets/avatar/${userProfile.userId}/`,
        // );
        // async function getPathForFirebaseStorage(uri) {
        //   if (Platform.OS === 'ios') return uri;
        //   const stat = await RNFetchBlob.fs.stat(uri);
        //   return stat.path;
        // }
        // let url = '';
        // const fileUri = await getPathForFirebaseStorage(profileImage.uri);
        // const uploadTask = await storageRef
        //   .child(
        //     profileImage.name ||
        //       `Documents${profileImage.type}${profileImage.size}`,
        //   )
        //   .putFile(fileUri);
        // let ref = storage().ref(uploadTask.metadata.fullPath);
        // url = await ref.getDownloadURL().then((url) => url);

        // const db = firestore();
        // const batch = db.batch();
        // const Dataref = db
        //   .collection('Users')
        //   .doc(userProfile.userId)
        //   .update({
        //     ImageUrl: url || '',
        //   });
        // await firestore()
        //   .collection('Users')
        //   .doc(userProfile.userId)
        //   .get()
        //   .then((data) => {
        //     const newdata = data.data();
        //     console.log(newdata, 'NEw');
        //     dispatch({
        //       type: 'USER_DATA',
        //       payload: {UserData: newdata},
        //     });
        //   });
      }
      // setProfileImage(profileImage);
    });
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
        // console.log(profileImage?.uri, 'URI');
        // const storageRef = await storage().ref(
        //   `buckets/avatar/${userProfile.userId}/`,
        // );
        // async function getPathForFirebaseStorage(uri) {
        //   if (Platform.OS === 'ios') return uri;
        //   const stat = await RNFetchBlob.fs.stat(uri);
        //   return stat.path;
        // }
        const fileUri = await getPathForFirebaseStorage(profileImage.uri);
        PhotoEditor.Edit({
          path: fileUri,
          stickers: [
            'sticker0',
            'sticker1',
            'sticker2',
            'sticker3',
            'sticker4',
            'sticker5',
            'sticker6',
            'sticker7',
            'sticker8',
            'sticker9',
            'sticker10',
          ],
          //   hiddenControls: [
          //     'clear',
          //     'crop',
          //     'draw',
          //     'save',
          //     'share',
          //     'sticker',
          //     'text',
          //   ],
          colors: undefined,
          onDone: async () => {
            modalizeRef.current?.close();
            navigation.navigate('CreatePost', {
              videoUri: fileUri,
              profileImage: profileImage,
              UserData: UserData,
            });
          },
          onCancel: () => {
            console.log('on cancel');
          },
        }); // const uploadTask = await storageRef
        //   .child(
        //     profileImage.name ||
        //       `Documents${profileImage.type}${profileImage.size}`,
        //   )
        //   .putFile(fileUri);
        // let ref = storage().ref(uploadTask.metadata.fullPath);
        // url = await ref.getDownloadURL().then((url) => url);

        // const db = firestore();
        // const batch = db.batch();
        // const Dataref = db
        //   .collection('Users')
        //   .doc(userProfile.userId)
        //   .update({
        //     ImageUrl: url || '',
        //   });
        // console.log(Dataref);
        // await firestore()
        //   .collection('Users')
        //   .doc(userProfile.userId)
        //   .get()
        //   .then((data) => {
        //     const newdata = data.data();
        //     console.log(newdata, 'NEw');
        //     dispatch({
        //       type: 'USER_DATA',
        //       payload: {UserData: newdata},
        //     });
        //   });
      }
    });
  };
  // const navigation = useNavigation();

  // const onRecord = async () => {
  //     const data = await camera.current.takePictureAsync();
  //     setData(data)
  //     navigation.navigate('Filter', { Data: data });
  // };
  // useEffect(() => {
  //     if (data) {
  //         onEdit()
  //     }
  // }, [data])
  const onEdit = async () => {
    async function getPathForFirebaseStorage(uri) {
      if (Platform.OS === 'ios') return uri;
      const stat = await RNFetchBlob.fs.stat(uri);
      return stat.path;
    }
    const fileUri = await getPathForFirebaseStorage(data.uri);

    // async function getPathForFirebaseStorage(uri) {
    //     if (Platform.OS === 'ios') return uri;
    //     const stat = await RNFetchBlob.fs.stat(uri);
    //     return stat.path;
    // }
    // const fileUri = await getPathForFirebaseStorage(data.uri);
    // PhotoEditor.Edit({
    //     path: fileUri,
    //     stickers: [
    //         'sticker0',
    //         'sticker1',
    //         'sticker2',
    //         'sticker3',
    //         'sticker4',
    //         'sticker5',
    //         'sticker6',
    //         'sticker7',
    //         'sticker8',
    //         'sticker9',
    //         'sticker10',
    //     ],
    //     //   hiddenControls: [
    //     //     'clear',
    //     //     'crop',
    //     //     'draw',
    //     //     'save',
    //     //     'share',
    //     //     'sticker',
    //     //     'text',
    //     //   ],
    //     colors: undefined,
    //     onDone: () => {
    //         console.log('on done');
    //     },
    //     onCancel: () => {
    //         console.log('on cancel');
    //     }
    // })
  };
  return (
    <View style={styles.container}>
      <View>
        <Button />
      </View>
      <Modalize ref={modalizeRef} modalHeight={200}>
        <TouchableOpacity onPress={openCamera} style={{alignItems: 'center'}}>
          {/* {picUri && (
            <Image
              source={{uri: picUri}}
              style={{height: '100%', width: '100%'}}
            />
          )} */}

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
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonRecord: {
    alignSelf: 'center',
    marginVertical: 10,
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#ff4343',
  },
  buttonStop: {
    alignSelf: 'center',
    marginVertical: 20,
    height: 30,
    width: 30,
    borderRadius: 3,
    backgroundColor: '#ff4343',
  },
});
export default Camera;
