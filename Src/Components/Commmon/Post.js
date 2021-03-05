import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  View,
  TouchableWithoutFeedback,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
const image = {uri: 'https://reactjs.org/logo-og.png'};
const Post = (props) => {
    const {post} = props;
  console.log(props, 'PROPS');
  //   const [post, setPost] = useState(props.post);
  //   const [isLiked, setIsLiked] = useState(false);
  //   const [videoUri, setVideoUri] = useState('');

  //   const [paused, setPaused] = useState(false);

  //   const onPlayPausePress = () => {
  //     setPaused(!paused);
  //   };

  //   const onLikePress = () => {
  //     const likesToAdd = isLiked ? -1 : 1;
  //     setPost({
  //       ...post,
  //       likes: post.likes + likesToAdd,
  //     });
  //     setIsLiked(!isLiked);
  //   };

  //   const getVideoUri = async () => {
  //     if (post.videoUri.startsWith('http')) {
  //       setVideoUri(post.videoUri);
  //       return;
  //     }
  //     setVideoUri(await Storage.get(post.videoUri));
  //   };

  //   useEffect(() => {
  //     getVideoUri();
  //   },[]);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback>
        <ImageBackground
          source={{uri:post.ImageUrl}}
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
                <Image
                  style={styles.profilePicture}
                  // source={{uri: post.user.imageUri}}
                />

                <TouchableOpacity style={styles.iconContainer}>
                  <AntDesign name={'heart'} size={40} color={'red'} />
                  <Text style={styles.statsLabel}>Like</Text>
                </TouchableOpacity>

                <View style={styles.iconContainer}>
                  <FontAwesome name={'commenting'} size={40} color="white" />
                  <Text style={styles.statsLabel}>Commet</Text>
                </View>

                <View style={styles.iconContainer}>
                  <Fontisto name={'share-a'} size={35} color="white" />
                  <Text style={styles.statsLabel}>Shares</Text>
                </View>
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
    height: Dimensions.get('window').height - 100,
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
  },
  statsLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
  },
});
export default Post;
