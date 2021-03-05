import React from 'react';
import {Text, ImageBackground, View, ScrollView, TouchableOpacity} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
const FilterScreen = (props) => {
  const [imageData, setImageData] = React.useState('');
  async function getPathForFirebaseStorage(uri) {
    if (Platform.OS === 'ios') return uri;
    const stat = await RNFetchBlob.fs.stat(uri);
    return stat.path;
  }
  React.useEffect(() => {
    if (props.route.params) {
      const fileUri = myData(props.route.params.Data.uri);
      setImageData(fileUri);
    }
  }, [props.route]);
  const myData = async (uri) => {
    return await getPathForFirebaseStorage(uri);
  };
  return (
    <View
      style={{flex: 1, backgroundColor: 'red'}}>
      <ImageBackground
        source={{uri: 'https://reactjs.org/logo-og.png'}}
        resizeMode="contain"
        style={{flex: 1, resizeMode: 'cover', justifyContent: 'center'}}
      />
      <View>
      <ScrollView>
        <TouchableOpacity style={{backgroundColor:"white" , height:10,width:20}}>
          <Text>Filter1</Text>
        </TouchableOpacity>
      </ScrollView>
      </View>
    </View>
  );
};

export default FilterScreen;
