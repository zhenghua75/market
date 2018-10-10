import React from 'react';

import { 
  ScrollView, 
  StyleSheet,
  Button,
  AsyncStorage,
  ImageBackground,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
 } from 'react-native';

export default class MyScreen extends React.Component {
  static navigationOptions = {
    title: '个人中心',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <ImageBackground source={require('../assets/images/06个人中心/wode.png')} style={styles.bkg}>
          <View style={styles.top}>
            <View style={styles.head}>
              <Image source={require('../assets/images/06个人中心/头像.png')} style={styles.headImage}/>
              <Text style={styles.headText}>12345678901</Text>
            </View>
            <TouchableOpacity onPress={this._modifyPwd} style={styles.editBtn}>
              <Image source={require('../assets/images/06个人中心/编辑.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.info}>
            <View style={styles.box}>
              <Text style={styles.text}>0</Text>
              <Text style={styles.text}>收藏</Text>
            </View>
            <View style={styles.span}/>
            <TouchableOpacity style={styles.box} onPress={this._cart}>
              <Text style={styles.text}>0</Text>
              <Text style={styles.text}>购物车</Text>
            </TouchableOpacity>
            <View style={styles.span}/>
            <View style={styles.box}>
              <Text style={styles.text}>0</Text>
              <Text style={styles.text}>消息</Text>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.order}>
          <View style={styles.orderLeft}>
            <Image source={require('../assets/images/06个人中心/订单(1).png')} style={styles.orderImage}/>
            <Text style={styles.orderText}>订单</Text>
          </View>
          <Text style={styles.allOrderText}>全部订单</Text>
        </View>
        <View style={styles.ship}>
          <View style={styles.shipBox}>
            <View style={styles.shipCircle}>
              <Image source={require('../assets/images/06个人中心/待付款.png')} style={styles.shipImage}/>
              <View style={styles.circle}>
                <Text style={styles.circleText}>0</Text>
              </View>
            </View>
            <Text style={styles.shipText}>待付款</Text>
          </View>
          <View style={styles.shipBox}>
            <View style={styles.shipCircle}>
              <Image source={require('../assets/images/06个人中心/待收货.png')} style={styles.shipImage}/>
              <View style={styles.circle}>
                <Text style={styles.circleText}>0</Text>
              </View>
            </View>
            <Text style={styles.shipText}>待收货</Text>
          </View>
          <View style={styles.shipBox}>
            <View style={styles.shipCircle}>
              <Image source={require('../assets/images/06个人中心/待评价.png')} style={styles.shipImage}/>
              <View style={styles.circle}>
                <Text style={styles.circleText}>0</Text>
              </View>
            </View>
            <Text style={styles.shipText}>待评价</Text>
          </View>
          <View style={styles.shipBox}>
            <View style={styles.shipCircle}>
              <Image source={require('../assets/images/06个人中心/退换货.png')} style={styles.shipImage}/>
              <View style={styles.circle}>
                <Text style={styles.circleText}>0</Text>
              </View>
            </View>
            <Text style={styles.shipText}>退换货</Text>
          </View>
        </View>
        <View style={styles.columnGroup1}>
          <View style={styles.row}>
            <Image source={require('../assets/images/06个人中心/日记.png')} style={styles.rowImage}/>
            <Text style={styles.rowText}>日记</Text>
          </View>
          <View style={styles.row}>
            <Image source={require('../assets/images/06个人中心/定位.png')} style={styles.rowImage}/>
            <Text style={styles.rowText}>定位</Text>
          </View>
        </View>
        <View style={styles.columnGroup1}>
          <View style={styles.row}>
            <Image source={require('../assets/images/06个人中心/客服.png')} style={styles.rowImage}/>
            <Text style={styles.rowText}>客服</Text>
          </View>
          <View style={styles.row}>
            <Image source={require('../assets/images/06个人中心/附近工人.png')} style={styles.rowImage}/>
            <Text style={styles.rowText}>附近工人</Text>
          </View>
        </View>
        <Button title='退出' onPress={this._signOutAsync}/>
      </ScrollView>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.removeItem('userToken');
    this.props.navigation.navigate('SignIn');
  };

  _modifyPwd = async () => {
    this.props.navigation.navigate('ModifyPwd');
  };

  _cart = async () => {
    this.props.navigation.navigate('Cart');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: 15,
    backgroundColor: '#fff',
  },
  bkg:{
    width: Dimensions.get('window').width,
    height: Math.floor(Dimensions.get('window').width * 353/750),
  },
  top:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderBottomWidth:1,
    borderColor:'rgba(255, 255, 255, 0.22)',
    marginHorizontal:12,
    marginVertical:19,
  },
  head:{
    flexDirection:'row',
    alignItems:'center',
  },
  headImage:{
    height:55,
    width:55,
  },
  headText:{
    fontSize:20,
    color:'#ffffff',
  },
  box:{
    flex:0.33,
    alignItems:'center',
  },
  text:{
    fontSize:15,
    color:'#ffffff',
  },
  info:{
    flexDirection:'row',
  },
  span:{
    width:1,
    backgroundColor:'rgba(255, 255, 255, 0.22)',
  },
  order:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:12,
    borderBottomWidth:1,
    borderColor:'rgba(0, 0, 0, 0.22)',
    paddingVertical:12,
  },
  orderLeft:{
    flexDirection:'row',
  },
  orderImage:{
    height:14,
    width:18,
  },
  orderText:{
    marginLeft:12,
    fontSize:16,
    color:'#3f3f3f',
  },
  allOrderText:{
    fontSize:14,
    color:'#888888',
  },
  ship:{
    marginTop:14,
    flexDirection:'row',
  },
  shipBox:{
    alignItems:'center',
    flex:0.25,
  },
  shipCircle:{
    flexDirection:'row',
  },
  shipImage:{
    width:18,
    height:16,
  },
  shipText:{
    marginTop:6,
  },
  circle:{
    height:10,
    width:10,
    borderRadius:5,
    backgroundColor:'orange',
    alignItems:'center',
    justifyContent:'center',
    marginLeft:-5,
    marginTop:-5,
  },
  circleText:{
    color:'#ffffff',
    fontSize:10,
  },
  columnGroup1:{

  },
  row:{
    flexDirection:'row',
    borderBottomWidth:1,
    borderColor:'rgba(0, 0, 0, 0.22)',
  },
  rowText:{
    fontSize:16,
    color:'#3f3f3f',
    marginLeft:12,
  },
  editBtn:{
    height:44,
    width:44,
    alignItems:'center',
    justifyContent:'center',
  },
});
