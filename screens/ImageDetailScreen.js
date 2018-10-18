import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  Image,
  Dimensions,
  Button,
  TouchableOpacity,
   } from 'react-native';

import { StackActions } from 'react-navigation';

export default class ImageDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
    title: '2/4',
    headerTitleStyle:{
      color:'#fff',
      alignSelf: 'center',
      textAlign: 'center',
      width: '100%',
    },
    headerStyle: {
      backgroundColor: '#000',
    },
    headerRight: (
        <TouchableOpacity onPress={()=>{navigation.goBack();}} 
          style={{alignItems:'center',justifyContent:'center',width:22,height:22}}>
          <Image source={require('../assets/images/11发现/叉号(1).png')}/>
        </TouchableOpacity>
      ),
  };};

  render() {
    return (
      <ScrollView style={styles.container}>
        <Image source={require('../assets/images/11发现/建材.png')} style={{width:Dimensions.get('window').width,
                    height:Math.floor(Dimensions.get('window').width*1005/750),}}/>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
