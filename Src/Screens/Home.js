import React, {useEffect, useState} from 'react';
import {View, FlatList, Dimensions, Text} from 'react-native';
import Post from '../Components/Commmon/Post';
import {useDispatch, useSelector} from 'react-redux';
import Auth from '@react-native-firebase/auth';
import fireStore from '@react-native-firebase/firestore';
import Spinner from '../Components/Commmon/Spinner';
import Share from 'react-native-share';
const Home = () => {
  const dispatch = useDispatch();
  const {ImagePostData} = useSelector((state) => state.Post);
  const {UserData} = useSelector((state) => state.Auth);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(ImagePostData);
  }, [ImagePostData]);
  useEffect(() => {
    GetuserData();
    getPost();
  }, []);

  const getPost = async () => {
    try {
      setLoading(true);
      const db = fireStore();
      let imagePost = [];
      const ImagePost = db
        .collection('ImagePosts')
        .get()
        .then((doc) => {
          doc.forEach((snapShot) => {
            const data = {
              ...snapShot.data(),
              id: snapShot.id,
            };
            imagePost.push(data);
            return snapShot.data();
          });
          dispatch({
            type: 'POST_IMAGE_DATA',
            payload: {ImagePostData: imagePost},
          });
        });

      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e, 'E');
    }
  };
  const GetuserData = async () => {
    const Token = Auth().currentUser.uid;
    await fireStore()
      .collection('Users')
      .doc(Token)
      .get()
      .then((data) => {
        const newdata = data.data();
        dispatch({
          type: 'USER_DATA',
          payload: {UserData: newdata},
        });
      });
  };
  
  return (
    <View style={{flex: 1}}>
      {loading ? (
        <View>
          <Spinner size="small" color="black" />
        </View>
      ) : data?.length ? (
        <FlatList
          data={data}
          renderItem={({item, index}) => (
            <Post post={item} index={index} UserData={UserData} />
          )}
          showsVerticalScrollIndicator={false}
          snapToInterval={Dimensions.get('window').height}
          snapToAlignment={'start'}
          decelerationRate={'fast'}
        />
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Text> No Post Added Yet</Text>
        </View>
      )}
    </View>
  );
};

export default Home;
