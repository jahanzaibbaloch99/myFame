import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';



const CreatePost = () => {
    const [description, setDescription] = useState('');
    const [videoKey, setVideoKey] = useState(null);

    const onPublish = async () => {
        // create post in the database (API)
        if (!videoKey) {
            console.warn('VIdeo is not yet uploaded');
            return;
        }

        try {

        } catch (e) {
            console.error(e);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder={'Description'}
                style={styles.textInput}
            />
            <TouchableOpacity onPress={onPublish}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Publish</Text>
                </View>
            </TouchableOpacity>
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
export default CreatePost;