import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import CommentBox from './CommentBox';
import CommentCard from './CommentCard';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../Commmon/Button';
import firestore from '@react-native-firebase/firestore';
import Spinner from '../Commmon/Spinner';
const {width} = Dimensions.get('window');

const Comments = (props) => {
  const {post, UserData, CancelModal} = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {Comments} = useSelector((state) => state.Post);
  console.log(Comments, 'COMMENTS ');
  useEffect(() => {
    getComments();
  }, [post]);
  const getComments = async () => {
    try {
      setLoading(true);
      const db = firestore();

      let Comments = [];
      console.log(post, 'POST');
      await db
        .collection('ImagePosts')
        .doc(post.id)
        .collection('Comments')
        .get()
        .then((snapShot) => {
          console.log(snapShot, 'SNAP COMMETS');
          snapShot.forEach((snap) => {
            console.log(snap.data(), 'SNAPCOMMENT');
            Comments.push(snap.data());
          });
        });
      console.log(Comments, 'COMMENTS');
      dispatch({
        type: 'POST_IMAGE_DATA',
        payload: {Comments: Comments},
      });

      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e, 'E');
    }
  };
  const [comments, setComments] = useState([]);
  useEffect(() => {
    setComments(Comments);
  }, [Comments]);
  // useEffect(setComments(Comments), [Comments]);
  return (
    <View style={{flex: 1, backgroundColor: 'white', margin: 15}}>
      <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
        <Button
          buttonText="Close"
          viewStyle={{
            width: width / 4.5,
            marginTop: width * 0.04,
            marginLeft: width * 0.14,
            height: 24,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 90,
            marginBottom: width * 0.04,
            backgroundColor: '#262626',
          }}
          textStyle={{
            color: 'white',
            fontSize: 14,
            fontWeight: '500',
            fontFamily: 'Helvetica',
          }}
          onPress={CancelModal}
        />
      </View>
      {loading ? (
        <View>
          <Spinner size="small" color="black" />
        </View>
      ) : comments.length ? (
        <>
          <FlatList
            data={comments}
            scrollEnabled={true}
            renderItem={({item, index}) => (
              <CommentCard {...item} index={index} getComments={getComments} />
            )}
          />
        </>
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <Text>No Coment Posted Yet</Text>
        </View>
      )}
      <View
        style={{
          flexDirection: 'column',
          alignContent: 'flex-end',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          marginVertical: 15,
        }}>
        <CommentBox post={post} UserData={UserData} getComments={getComments} />
      </View>
    </View>
  );
};

export default Comments;
