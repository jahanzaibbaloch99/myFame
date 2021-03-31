import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Linking,
  ScrollView,
} from 'react-native';
const {width} = Dimensions.get('window');

import Button from '../Commmon/Button';
import CommentBox from './CommentBox';
// import ReplyCard from './ReplyCard';
// import Hyperlink from 'react-native-hyperlink';
import {useDispatch, useSelector} from 'react-redux';
// import HeartUnlike from '../../../../assets/HeartLoveUnLikeSmall.svg';
// import CommentsSquareshow from '../../../../assets/CommentSquareSmallshow.svg';

const CommentCard = (props) => {
  return (
    <ScrollView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 15,
        }}>
        <View style={{marginVertical: 10}}>
          {props?.UserData.ImageUrl ? (
            <Image
              source={{
                uri: props.UserData.ImageUrl.replace(/^\"(.+)\"$/, '$1'),
              }}
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
        </View>
        <View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 8,
              borderWidth: 0.5,
              borderColor: '#d8d8d8',
              backgroundColor: 'white',
              paddingLeft: width * 0.03,
              paddingTop: width * 0.03,
              paddingBottom: width * 0.03,
              paddingRight: width * 0.06,
            }}>
            <Text
              style={{
                position: 'absolute',
                right: width * 0.05,
                top: width * 0.025,
                fontSize: 12,
                color: '#595959',
              }}>
              {/* {createdAt && moment(createdAt).fromNow()} */}
            </Text>
            <View>
              <TouchableOpacity>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    lineHeight: 22,
                    color: '#1f1f1f',
                    marginLeft: width * 0.025,
                  }}>
                  {props?.UserData?.firstName}
                </Text>
                {/* <View style={{width: width / 2}}>
                  <Text
                    style={{
                      marginBottom: width * 0.05,
                      marginLeft: width * 0.025,
                    }}>
                    userName
                  </Text>
                </View> */}
              </TouchableOpacity>
              <View style={{flex: 1, paddingLeft: width * 0.025}}>
                <Text style={{color: '#595959', fontSize: 14}}>
                  {props.commment}
                </Text>
              </View>
            </View>
          </View>
          {/* <CommentBox /> */}
        </View>
      </View>
    </ScrollView>
  );
};

export default CommentCard;
