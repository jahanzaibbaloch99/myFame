import React, {useState} from 'react';
import {View, Image, Dimensions, TextInput} from 'react-native';
import Button from './Button';
// import Input from '../../Input/Input';
import firestore from '@react-native-firebase/firestore';
import {showMessage} from 'react-native-flash-message';
import {useDispatch} from 'react-redux';
const {width, height} = Dimensions.get('window');

const CommentBox = (props) => {
  const dispatch = useDispatch();
  const {post, UserData} = props;
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const addComment = async () => {
    if (comment) {
      try {
        setLoading(true);
        const db = firestore();
        const batch = db.batch();
        const Dataref = db
          .collection('ImagePosts')
          .doc(post.id)
          .collection('Comments')
          .doc()
          .set({
            UserData: UserData,
            commment: comment,
          });
        showMessage({
          message: 'Comment Succefully Posted',
          type: 'danger',
          duration: 3000,
        });
        props.getComments();
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e, 'COMMENT');
      }
    }
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        width:"95%",
        marginHorizontal: width * 0.03,
        marginVertical: width * 0.02,
      }}>
      {UserData.ImageUrl ? (
        <Image
          source={{uri: UserData.ImageUrl.replace(/^\"(.+)\"$/, '$1')}}
          style={{
            width: width / 8,
            height: width / 8,
            borderRadius: 100,
            marginRight: width * 0.03,
          }}
        />
      ) : (
        <Image
          source={require('../../../assets/avatar.png')}
          style={{
            width: width / 8,
            height: width / 8,
            borderRadius: 100,
            marginRight: width * 0.03,
          }}
        />
      )}
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#b8b8b8',
          justifyContent: 'space-between',
          paddingHorizontal: width * 0.03,
        }}>
        <TextInput
          style={{height: width / 9 , width:"90%" , backgroundColor:"white"}}
          placeholder="Add a reply...."
          onChangeText={(e) => setComment(e)}
          value={comment}
        />
        <Button
          onPress={addComment}
          buttonText="Send"
          textStyle={{color: '#727272'}}
          loader={loading}
          disable={loading}
        />
      </View>
    </View>
  );
};

export default CommentBox;
