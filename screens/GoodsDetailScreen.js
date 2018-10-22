import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
   } from 'react-native';

import Swiper from 'react-native-swiper';

export default class GoodsDetailScreen extends React.Component {
  static navigationOptions = {
    title: '商品详情',
    headerTitleStyle: {
      alignSelf: 'center',
      textAlign: 'center',
      width: '100%',
    },
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={{flexDirection:'row',justifyContent:'space-around',padding:12,}}>
          <Text style={{fontSize:16,color:'#3f3f3f',}}>商品</Text>
          <Text style={{fontSize:16,color:'#ff8f00',}}>评论</Text>
        </View>
        <Swiper style={styles.wrapper} dotColor={'#999999'} activeDotColor={'#ff8f00'} 
          width={Dimensions.get('window').width}
          height={Math.floor(Dimensions.get('window').width * 564/750)}>
          <View style={styles.slide}>
            <Image source={require('../assets/images/05商品/banner.png')} style={styles.swiperImage}/>
          </View>
          <View style={styles.slide}>
            <Image source={require('../assets/images/05商品/banner.png')} style={styles.swiperImage}/>
          </View>
          <View style={styles.slide}>
            <Image source={require('../assets/images/05商品/banner.png')} style={styles.swiperImage}/>
          </View>
        </Swiper>
        <View style={{padding:12,}}>
          <Text style={{fontSize:16,color:'#3f3f3f',}}>三股大三股大三股大三股大三股大三股大三股大三股大三股大三股大三股大三股大三股大三股大三股大</Text>
          <View style={{flexDirection:'row',alignItems:'center',}}>
            <Text style={{fontSize:19,color:'#ff8f00',}}>¥38.00</Text>
            <Text style={{fontSize:14,color:'#999999',marginLeft:12,}}>¥49.00</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
