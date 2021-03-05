import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Button from '../Components/Commmon/Button';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import {useDispatch} from 'react-redux';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
const {height, width} = Dimensions.get('screen');

const CreatePost = (props) => {
  console.log(props, 'PROPS');
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [videoKey, setVideoKey] = useState(null);
  const [userData, setUserData] = useState({});
  const [ImageData, setImageData] = useState({});
  const [Image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const {profileImage, UserData, videoUri} = props.route.params;
    if (profileImage) {
      setImageData(profileImage);
    }
    if (UserData) {
      setUserData(UserData);
    }
    if (videoUri) {
      setImage(videoUri);
    }
  });
  const onPublish = async () => {
    if (description) {
      try {
        setLoading(true)
        let url;
        const storageRef = storage().ref(
          `buckets/PostImages/${userData.userId}/`,
        );
        const uploadTask = await storageRef
          .child(
            ImageData.name || `Documents${ImageData.type}${ImageData.size}`,
          )
          .putFile(Image);
        let ref = storage().ref(uploadTask.metadata.fullPath);
        url = await ref.getDownloadURL().then((url) => url);
        const db = firestore();
        const batch = db.batch();
        const Dataref = db
          .collection('ImagePosts')
          .doc()
          .set({
            ImageUrl: url || '',
            description: description,
            userData: userData,
            userId: userData.userId,
            comments: [],
            likes: [],
          });
        const ImagePostData = db
          .collection('ImagePosts')
          .get()
          .then((doc) => {
            doc.forEach((snapShot) => {
              return snapShot.data();
            });
           
            console.log(doc, 'DCOC');
          });
          dispatch({
            type: 'POST_IMAGE_DATA',
            payload: {ImagePostData},
          });
          setLoading(false)
      } catch (e) {
        setLoading(false)
        console.log(e);
      }
    }
    // create post in the database (API)
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: 'white', borderColor: 'black'},
      ]}>
      <View style={styles.imageView}>
        {/* {profileURL ? (
          <Image source={{uri: profileURL}} style={styles.image} />
        ) : (
          <Image
            source={require('../../../../assets/avatar.png')}
            style={styles.image}
            resizeMode="contain"
          />
        )} */}
        <TextInput
          style={styles.input}
          placeholder="Lets start a post"
          placeholderTextColor="#919191"
          value={description}
          onChangeText={(e) => setDescription(e)}
        />
      </View>
      <View style={styles.view2}>
        <Button
          loader={loading}
          buttonText="Post"
          viewStyle={{
            ...styles.postBtn,
            backgroundColor: '#262626',
          }}
          textStyle={styles.postBtnText}
          onPress={onPublish}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: width / 1.03,
    marginHorizontal: width * 0.015,
    marginTop: width * 0.03,
    borderRadius: 8,
    height: width / 3.2,
    borderWidth: 0.5,
    borderColor: '#E1E1E1',
  },

  text1: {
    paddingRight: width * 0.01,
    fontSize: 12,
    color: '#434343',
    fontWeight: '500',
  },
  imageView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: width * 0.02,
    marginTop: width * 0.02,
  },
  image: {
    width: width / 8,
    height: width / 8,
    borderRadius: 90,
  },
  input: {
    marginLeft: width * 0.04,
    width: width / 1.2,
    color: '#E3E3E3',
    borderBottomColor: '#E3E3E3',
    borderBottomWidth: 0.5,
    marginTop: Platform.OS === 'ios' ? width * 0.05 : 0,
    paddingBottom: width * 0.05,
    color: 'black',
  },
  view2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: width * 0.18,
  },
  view: {
    width: width / 4,
    marginTop: width * 0.04,
    marginLeft: width * 0.17,
  },
  postBtn: {
    width: width / 3,
    marginTop: width * 0.04,
    marginLeft: width * 0.14,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 90,
    marginBottom: width * 0.04,
  },
  postBtnText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Helvetica',
  },
});
export default CreatePost;
