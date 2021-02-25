import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import PhotoEditor from 'react-native-photo-editor';

import { useNavigation } from '@react-navigation/native';

const Camera = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [data , setData] = useState("")
    const camera = useRef();

    const navigation = useNavigation();

    const onRecord = async () => {
            const data = await camera.current.takePictureAsync();
           setData(data)
            // navigation.navigate('CreatePost', { videoUri: data.uri });
    };
    const onEdit = () => {
        PhotoEditor.Edit({
            path:data.uri,
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
              onDone: () => {
                console.log('on done');
              },
              onCancel: () => {
                console.log('on cancel');
              }
        })
    }
    return (
        <View style={styles.container}>
            <RNCamera
                ref={camera}
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.on}
                onPictureTaken={() => onEdit()}
            />
            <View style={{ backgroundColor: "black", justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity>
                    <Text style={{ color: "white", fontSize: 20 }} >Filters</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onRecord}
                    style={styles.buttonRecord}
                />
            </View>

        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
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