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

import { StackActions } from 'react-navigation';
import ApiPost from '../lib/ApiPost';

export default class MyScreen extends React.Component {
  static navigationOptions = {
    title: '个人中心',
  };
//"unpayed_cnt":"0","payed_cnt":"0","uncomment_cnt":0
  //"collect_cnt":"0","store_cnt":"0","bonus":"0","coupon_cnt":"0"

  state={
    userinfo:{}
  };

  _getUserInfo=async () =>{
    const userToken = await AsyncStorage.getItem('userToken');
    var data = {
      'Action':'GetUserInfo',
      'token':userToken,
    };
    let responseJson = await ApiPost(data);
    this.setState({
        userinfo:responseJson.Data
    });
  };

  componentWillMount() {
    this._getUserInfo();
  }

  _didFocusSubscription = {};
  
  componentDidMount() {
      this._didFocusSubscription = this.props.navigation.addListener(
          'didFocus',
          payload => {
              this._getUserInfo();
          }
      );
  }
  componentWillUnmount() {
      this._didFocusSubscription && this._didFocusSubscription.remove();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <ImageBackground source={require('../assets/images/06个人中心/uer_header_bg.png')} style={styles.bkg}>
          <View style={styles.top}>
            <TouchableOpacity style={styles.head} onPress={this._modUserInfo}>
              <Image source={{uri:this.state.userinfo.user_picture}} style={styles.headImage}/>
              <Text style={{fontSize:16,color:'#ffffff',paddingTop:10,}}>{this.state.userinfo.nick_name}</Text>
              <Text style={{fontSize:14,color:'#ffffff',paddingTop:6,}}>{this.state.userinfo.rank_name}</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <TouchableOpacity style={styles.order} onPress={this._allOrder}>
          <View style={styles.orderLeft}>
            <Image source={require('../assets/images/06个人中心/订单(1).png')} style={styles.orderImage}/>
            <Text style={styles.orderText}>订单</Text>
          </View>
          <Text style={styles.allOrderText}>全部订单</Text>
        </TouchableOpacity>
        <View style={styles.ship}>
          <View style={styles.shipBox}>
            <View style={styles.shipCircle}>
              <Image source={require('../assets/images/06个人中心/待付款.png')} style={styles.shipImage}/>
              <View style={styles.circle}>
                <Text style={styles.circleText}>{this.state.userinfo.unpayed_cnt}</Text>
              </View>
            </View>
            <Text style={styles.shipText}>待付款</Text>
          </View>
          <View style={styles.shipBox}>
            <View style={styles.shipCircle}>
              <Image source={require('../assets/images/06个人中心/待收货.png')} style={styles.shipImage}/>
              <View style={styles.circle}>
                <Text style={styles.circleText}>{this.state.userinfo.payed_cnt}</Text>
              </View>
            </View>
            <Text style={styles.shipText}>待收货</Text>
          </View>
          <View style={styles.shipBox}>
            <View style={styles.shipCircle}>
              <Image source={require('../assets/images/06个人中心/待评价.png')} style={styles.shipImage}/>
              <View style={styles.circle}>
                <Text style={styles.circleText}>{this.state.userinfo.uncomment_cnt}</Text>
              </View>
            </View>
            <Text style={styles.shipText}>待评价</Text>
          </View>
          <View style={styles.shipBox}>
            <View style={styles.shipCircle}>
              <Image source={require('../assets/images/06个人中心/退换货.png')} style={styles.shipImage}/>
            </View>
            <Text style={styles.shipText}>退换货</Text>
          </View>
        </View>
        <View style={styles.cardrow}>
            <View style={styles.cardhead}>
                <Text>我的余额</Text>
            </View>
            <View style={styles.cardpic}>
                <View style={styles.box2} onPress={this._infoList}>
                    <Text style={{fontSize:16,color:'#E86A4A',lineHeight:20}}>
                    {this.state.userinfo.user_money}</Text>
                    <Text style={{fontSize:14,color:'#ccc'}}>余额</Text>
                </View>
                <View style={styles.box2} onPress={this._infoList}>
                    <Text style={{fontSize:16,color:'#E86A4A',lineHeight:20}}>
                    {this.state.userinfo.pay_points}</Text>
                    <Text style={{fontSize:14,color:'#ccc'}}>积分</Text>
                </View>
            </View>
        </View>
        <View style={styles.cardrow}>
            <View style={styles.cardhead}>
                <Text>我喜欢</Text>
            </View>
            <View style={styles.cardpic}>
                <TouchableOpacity style={styles.box4}>
                    <Image source={require('../assets/images/06个人中心/收藏.png')}/>
                    <Text style={{fontSize:14,color:'#ccc',paddingTop:5}}>收藏</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.box4} onPress={this._cart}>
                    <Image source={require('../assets/images/06个人中心/collect.png')}/>
                    <Text style={{fontSize:14,color:'#ccc',paddingTop:5}}>关注</Text>
                </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    );
  }

  _modUserInfo = async () => {
    this.props.navigation.navigate('UserSetting');
  };

  _cart = async () => {
    this.props.navigation.navigate('Cart');
  };

  _infoList = async () => {
    this.props.navigation.navigate('InfoList');
  };

  _allOrder = async () => {
    this.props.navigation.navigate('AllOrder');
  };

  _customService = async () => {
    this.props.navigation.navigate('CustomService');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  bkg:{
    width: Dimensions.get('window').width,
    height: Math.floor(Dimensions.get('window').width * 353/750),
    backgroundColor:'#fff'
  },
  top:{
    justifyContent:'center',
    alignItems:'center',
    padding:14,
  },
  head:{
    justifyContent:'center',
    alignItems:'center',
  },
  headImage:{
    height:80,
    width:80,
    borderRadius:40,
  },
  box4:{
    flex:0.33,
    alignItems:'center',
    paddingVertical:10,
  },
  box2:{
    flex:0.5,
    alignItems:'center',
    paddingVertical:10,
  },
  cardrow:{
    marginTop:10,
    backgroundColor:'#ffffff',
    marginHorizontal:12,
    borderRadius:10,
    alignItems:'stretch',
  },
  cardhead:{
    paddingLeft:10,
    paddingVertical:10,
    borderBottomWidth:1,
    borderColor:'#eeeeee',
  },
  cardpic:{
    flexDirection:'row',
  },
  span:{
    width:1,
    backgroundColor:'rgba(255, 255, 255, 0.22)',
  },
  order:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:12,
    borderBottomWidth:1,
    borderColor:'rgba(0, 0, 0, 0.22)',
    paddingVertical:12,
    backgroundColor:'#fff'
  },
  orderLeft:{
    flexDirection:'row',
  },
  orderImage:{
    height:18,
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
    paddingVertical:20,
    flexDirection:'row',
    backgroundColor:'#fff',
  },
  shipBox:{
    alignItems:'center',
    flex:0.25,
  },
  shipCircle:{
    flexDirection:'row',
  },
  shipImage:{
    width:20,
    height:20,
  },
  shipText:{
    marginTop:6,
  },
  circle:{
    height:20,
    width:20,
    borderRadius:10,
    backgroundColor:'orange',
    alignItems:'center',
    justifyContent:'center',
    marginLeft:-5,
    marginTop:-5,
  },
  circleText:{
    color:'#ffffff',
    fontSize:12,
  },
  columnGroup1:{

  },
  row:{
    flexDirection:'row',
    borderBottomWidth:1,
    borderColor:'rgba(0, 0, 0, 0.22)',
    height:44,
    alignItems:'center',
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
