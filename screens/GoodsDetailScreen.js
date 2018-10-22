import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
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
            <Image source={require('../assets/images/05商品/banner.png')}/>
          </View>
          <View style={styles.slide}>
            <Image source={require('../assets/images/05商品/banner.png')}/>
          </View>
          <View style={styles.slide}>
            <Image source={require('../assets/images/05商品/banner.png')}/>
          </View>
        </Swiper>
        <View style={{padding:12,}}>
          <Text style={{fontSize:16,color:'#3f3f3f',}}>三股大三股大三股大三股大三股大三股大三股大三股大三股大三股大三股大三股大三股大三股大三股大</Text>
          <View style={{flexDirection:'row',alignItems:'center',marginTop:26,}}>
            <Text style={{fontSize:19,color:'#ff8f00',}}>¥38.00</Text>
            <Text style={{fontSize:14,color:'#999999',marginLeft:12,}}>¥49.00</Text>
          </View>
          <View style={{flexDirection:'row',}}>
            <View style={{flexDirection:'row',flex:0.5,}}>
              <Text style={{fontSize:14,color:'#999999',}}>快递：包邮</Text>
              <Text style={{fontSize:14,color:'#999999',marginLeft:30}}>销量：4527件</Text>
            </View>
            <Text style={{fontSize:14,color:'#999999',flex:0.5,textAlign:'right',}}>重庆市</Text>
          </View>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',padding:12,backgroundColor:'#e5e5e5',}}>
          <Image source={require('../assets/images/05商品/正品保证.png')} />
          <Text style={{fontSize:14,color:'#999999',marginLeft:6,}}>正品保证</Text>
        </View>
        <View>
          <View style={{flexDirection:'row',justifyContent:'space-between',
            marginHorizontal:12,paddingVertical:12,
            borderBottomWidth:1,borderColor:'#e5e5e5',
          }}>
            <Text style={{fontSize:14,color:'#999999',}}>选择：规格</Text>
            <Image source={require('../assets/images/04订单/右箭头.png')} />
          </View>
          <View style={{marginHorizontal:12,paddingVertical:12,borderBottomWidth:1,borderColor:'#e5e5e5',}}>
            <Text style={{fontSize:14,color:'#999999',}}>评价（0）</Text>
          </View>
          <View style={{flexDirection:'row',padding:12,}}>
            <View style={{backgroundColor:'#ff8f00',width:33,height:33,}}/>
            <Text style={{fontSize:18,color:'#3f3f3f',marginLeft:7,}}>王五的五金店</Text>
          </View>
          <View style={{flexDirection:'row',padding:12,}}>
            <View style={{alignItems:'center',flex:0.33}}>
              <Text style={{fontSize:16,color:'#3f3f3f',}}>331</Text>
              <Text style={{fontSize:14,color:'#888888',marginTop:7}}>全部</Text>
            </View>
            <View style={{width:1,height:50,backgroundColor:'#e5e5e5',}}/>
            <View style={{alignItems:'center',flex:0.33}}>
              <Text style={{fontSize:16,color:'#3f3f3f',}}>331</Text>
              <Text style={{fontSize:14,color:'#888888',marginTop:7}}>新品</Text>
            </View>
            <View style={{width:1,height:50,backgroundColor:'#e5e5e5',}}/>
            <View style={{alignItems:'center',flex:0.33}}>
              <Text style={{fontSize:16,color:'#3f3f3f',}}>331</Text>
              <Text style={{fontSize:14,color:'#888888',marginTop:7}}>促销</Text>
            </View>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-around',borderBottomWidth:1,borderColor:'#e5e5e5',
            marginHorizontal:12,paddingVertical:12,
          }}>
            <View style={{width:80,height:30,borderWidth:1,borderColor:'#e5e5e5',alignItems:'center',justifyContent:'center',}}>
              <Text style={{fontSize:16,color:'#3f3f3f'}}>全部商品</Text>
            </View>
            <TouchableOpacity onPress={this._store}>
              <View style={{width:80,height:30,borderWidth:1,borderColor:'#e5e5e5',alignItems:'center',justifyContent:'center',}}>
                <Text style={{fontSize:16,color:'#3f3f3f'}}>进店逛逛</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-around',
            marginHorizontal:12,paddingVertical:12,
          }}>
            <View style={{}}>
              <Text style={{fontSize:16,color:'#ff8f00'}}>商品描述</Text>
            </View>
            <View style={{}}>
              <Text style={{fontSize:16,color:'#3f3f3f'}}>规格参数</Text>
            </View>
          </View>
        </View>
        <Image source={require('../assets/images/05商品/detail.png')} style={{
          width:Dimensions.get('window').width,
          height:Math.floor(Dimensions.get('window').width * 1591/750),
        }}/>
        <View style={{marginTop:50,flexDirection:'row',}}>
          <View style={{alignItems:'center',flex:0.14,}}>
            <Image source={require('../assets/images/05商品/收藏选中.png')}/>
            <Text>收藏</Text>
          </View>
          <View style={{alignItems:'center',flex:0.14,}}>
            <Image source={require('../assets/images/05商品/购物车.png')}/>
            <Text>购物车</Text>
          </View>
          <View style={{alignItems:'center',flex:0.14,}}>
            <Image source={require('../assets/images/05商品/客服.png')}/>
            <Text>客服</Text>
          </View>
          <View style={{backgroundColor:'#e58810',flex:0.3,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:19,color:'#fff'}}>加入购物车</Text>
          </View>
          <View style={{backgroundColor:'#ff8f00',flex:0.3,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:19,color:'#fff'}}>立即购买</Text>
          </View>
        </View>
      </ScrollView>
    );
  }

  _store = async () => {
    this.props.navigation.navigate('Store');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
