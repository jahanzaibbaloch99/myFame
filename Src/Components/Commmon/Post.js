import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  View,
  TouchableWithoutFeedback,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Share,
  Dimensions,
  Modal,
} from 'react-native';
import Comment from '../Commmon/Comments';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import firestore from '@react-native-firebase/firestore';
const image = {uri: 'https://reactjs.org/logo-og.png'};
const Post = (props) => {
  const dispatch = useDispatch();
  const {post, UserData, index} = props;

  const {ImagePostData, Comments} = useSelector((state) => state.Post);
  const contentLiked =
    Boolean(post?.likes?.length) && post.likes.includes(UserData.userId);
  const sortLikedData = (id, userId) => {
    const newData = ImagePostData.map((val, ind) => {
      if (val.id === id) {
        val.likes = Object.assign([], val.likes);
        val.likes.push(userId);
      }
      return val;
    });
    dispatch({
      type: 'POST_IMAGE_DATA',
      payload: {ImagePostData: newData},
    });
  };
  const [like, setLike] = useState(false);
  console.log(index, 'INDEX');
  const [show, setShow] = useState(false);
  const CancelModal = () => {
    setShow(false);
  };
  const LikePost = async () => {
    try {
      sortLikedData(post.id, UserData.userId);
      await firestore()
        .collection('ImagePosts')
        .doc(post.id)
        .update({
          likes: firestore.FieldValue.arrayUnion(UserData.userId),
        });
    } catch (e) {
      sortUnlikeData(post.id, UserData.userId);
    }
  };
  const UnLikePost = async () => {
    try {
      console.likes('UNLIKE');
      sortUnlikeData(post.id, UserData.userId);
      await firestore()
        .collection('ImagePosts')
        .doc(post.id)
        .update({
          likes: firestore.FieldValue.arrayRemove(UserData.userId),
        });
    } catch (e) {
      sortLikedData(post.id, UserData.userId);
    }
  };
  const sortUnlikeData = (id, userId) => {
    console.log('UNLIKE', id, userId, 'USERID');
    const updatedContentData = [...ImagePostData];
    const selectedContent = getSelectedContent(id);
    const updatedItemWithoutLike = {
      ...selectedContent[1],
      likes: selectedContent[1]['likes'].filter((user) => user !== userId),
    };
    updatedContentData[selectedContent[0]] = updatedItemWithoutLike;
    // setContents(updatedContentData);
    console.log(updatedContentData);
    dispatch({
      type: 'POST_IMAGE_DATA',
      payload: {ImagePostData: updatedContentData},
    });
  };
  const getSelectedContent = (id) => {
    const itemIndex = contentsData.findIndex((snap) => snap.id === id);
    const item = contentsData.find((snap) => snap.id === id);
    return [itemIndex, item];
  };
  const onShare = async (Url) => {
    try {
      Share.share({
        message: post.ImageUrl,
      });
    } catch (e) {}
  };
  return (
    <View style={styles.container}>
      <Modal visible={show}>
        <Comment CancelModal={CancelModal} post={post} UserData={UserData} />
      </Modal>
      <TouchableWithoutFeedback>
        <ImageBackground
          source={{uri: post.ImageUrl}}
          style={{
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'center',
          }}>
          <View>
            {/* <Video
            source={{uri: videoUri}}
            style={styles.video}
            onError={(e) => console.log(e)}
            resizeMode={'cover'}
            repeat={true}
            paused={paused}
          /> */}

            <View style={styles.uiContainer}>
              <View style={styles.rightContainer}>
                {post?.userData?.ImageUrl ? (
                  <Image
                    style={styles.profilePicture}
                    source={{
                      uri: post.userData.ImageUrl.replace(/^\"(.+)\"$/, '$1'),
                    }}
                  />
                ) : (
                  <Image
                    style={styles.profilePicture}
                    source={require('../../../assets/avatar.png')}
                  />
                )}

                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={!contentLiked ? LikePost : null}>
                  <AntDesign
                    name={'heart'}
                    size={40}
                    color={`${contentLiked ? 'red' : 'white'}`}
                  />
                  <Text style={styles.statsLabel}>
                    {post?.likes ? post?.likes?.length : 0}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={() => setShow(true)}>
                  <FontAwesome name={'commenting'} size={40} color="white" />
                  <Text style={styles.statsLabel}>Comments</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={onShare}
                  style={styles.iconContainer}>
                  <Fontisto name={'share-a'} size={35} color="white" />
                  <Text style={styles.statsLabel}>Shares</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.bottomContainer}>
                <View>
                  <Text style={styles.handle}>@{post?.userData?.userName}</Text>
                  <Text style={styles.description}>{post.description}</Text>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('window').height,
  },
  videPlayButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 100,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  uiContainer: {
    height: '100%',
    justifyContent: 'flex-end',
  },
  bottomContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginVertical: 40,
  },
  handle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  description: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '300',
    marginBottom: 10,
  },
  songRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  songName: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
  },

  songImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 5,
    borderColor: '#4c4c4c',
  },

  //  right container
  rightContainer: {
    alignSelf: 'flex-end',
    height: 300,
    justifyContent: 'space-between',
    marginRight: 5,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
  },

  iconContainer: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  statsLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
  },
});
export default Post;
