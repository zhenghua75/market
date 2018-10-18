import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
   } from 'react-native';

import { StackActions } from 'react-navigation';

export default class FindDetailScreen extends React.Component {
  static navigationOptions = {
    title: '发现',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={{marginHorizontal:12,marginVertical:24,backgroundColor:'#fff',
      paddingHorizontal:12,paddingVertical:14,}}>
          <View style={{flexDirection:'row',alignItems:'center',}}>
            <Image source={require('../assets/images/06个人中心/头像.png')} style={{width:43,height:43,margin:10}}/>
            <Text style={{fontSize:14,color:'#3f3f3f',}}>不晓得什么山谷</Text>
          </View>
          <Text style={{fontSize:12,color:'#3f3f3f',padding:12,}}>“如果你花费7.2亿欧元收购一家负债2.2亿欧元的俱乐部，而且你还以11%的利息借贷，这意味着你没钱。”意大利《晚邮报》直言不讳地diss米兰新老板李勇鸿。</Text>
          <TouchableOpacity onPress={this._imageDetail}>
            <Image source={require('../assets/images/11发现/建材.png')} style={{width:Dimensions.get('window').width-80,
                    height:Math.floor((Dimensions.get('window').width-80)*1005/750),margin:21,}}/>
          </TouchableOpacity>
          <Text style={{fontSize:12,color:'#3f3f3f',padding:12,}}>“如果你花费7.2亿欧元收购一家负债2.2亿欧元的俱乐部，而且你还以11%的利息借贷，这意味着你没钱。”意大利《晚邮报》直言不讳地diss米兰新老板李勇鸿。</Text>

        </View>
      </ScrollView>
    );
  }

  _imageDetail= async ()=>{
    this.props.navigation.navigate('ImageDetail');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
