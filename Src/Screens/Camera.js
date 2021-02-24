import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';

import { useNavigation } from '@react-navigation/native';

const Camera = () => {
    const [isRecording, setIsRecording] = useState(false);
    const camera = useRef();

    const navigation = useNavigation();

    const onRecord = async () => {
        if (isRecording) {
            camera.current.stopRecording();
        } else {
            const data = await camera.current.recordAsync();
            navigation.navigate('CreatePost', { videoUri: data.uri });
        }
    };

    return (
        <View style={styles.container}>
            <RNCamera
                ref={camera}
                onRecordingStart={() => setIsRecording(true)}
                onRecordingEnd={() => setIsRecording(false)}
                style={styles.preview}
            />
            <TouchableOpacity
                onPress={onRecord}
                style={
                    isRecording ? styles.buttonStop : styles.buttonRecord
                }
            />
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