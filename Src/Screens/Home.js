import React, {useEffect, useState} from 'react';
import {View, FlatList, Dimensions} from 'react-native';
import Post from '../Components/Commmon/Post';
import {useDispatch, useSelector} from 'react-redux';
import Auth from '@react-native-firebase/auth';
import fireStore from '@react-native-firebase/firestore';
import Spinner from '../Components/Commmon/Spinner';
const Home = () => {
  const dispatch = useDispatch();
  const {ImagePostData} = useSelector((state) => state.Post);
  console.log(ImagePostData, 'POST');
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([
    {name: 'dsa'},
    {name: 'dsa'},
    {name: 'dsa'},
  ]);
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
            imagePost.push(snapShot.data());
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
  // useEffect(() => {
  //   const fetchPost = async () => {
  //     // fetch all the posts
  //     try {
  //       const response = await API.graphql(graphqlOperation(listPosts));
  //       setPosts(response.data.listPosts.items);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };

  //   fetchPost();
  // }, []);

  return (
    <View>
      <FlatList
        data={ImagePostData}
        renderItem={({item}) => <Post post={item} />}
        showsVerticalScrollIndicator={false}
        snapToInterval={Dimensions.get('window').height - 130}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
      />
    </View>
  );
};

export default Home;
