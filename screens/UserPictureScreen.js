import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  Button, 
  Image, 
  View,
   } from 'react-native';

import { ImagePicker } from 'expo';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: '头像',
  };

  state = {
    image: null,
  };

  componentWillMount() {
    const { navigation } = this.props;
    let user_picture = navigation.getParam('user_picture');
    this.setState({image:user_picture});
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        <Button
          title="更换图片"
          onPress={this._pickImage}
        />
        
      </View>
    );
  };
    
  //
  _pickImage = async () => {

    const { Permissions } = Expo;
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      //return Location.getCurrentPositionAsync({enableHighAccuracy: true});
    } else {
      throw new Error('CAMERA_ROLL permission not granted');
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      //上传图片
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
