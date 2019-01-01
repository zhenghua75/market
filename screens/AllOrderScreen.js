import React from 'react';
import {
  ScrollView, 
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  SectionList,
  Button,
  AsyncStorage,
   } from 'react-native';

import ApiPost from '../lib/ApiPost';



export default class AllOrderScreen extends React.Component {
  _pay =  (order_sn) => {
    // const userToken = await AsyncStorage.getItem('userToken');
    // var data = {
    //   'Action':'GetOnlinePay',
    //   'token':userToken,
    //   'order_sn':order_sn,
    // };
    // console.log(data);
    // let responseJson = await ApiPost(data);
    // console.log(responseJson);
    // if(responseJson.Result){
    //   //支付
      
    // }
    this.props.navigation.navigate('Alipay',{'order_sn':order_sn});
  };
  // constructor(props) {
  //   super(props);
  //   this._pay = this._pay.bind(this);
  // }
  static navigationOptions = ({navigation}) => ({
    title: '我的订单',
    headerRight: (
      <TouchableOpacity style={{width:44,height:44,alignItems:'center',justifyContent:'center'}} onPress={() => navigation.navigate('SearchOrder')}>
              <Image source={require('../assets/images/09搜索框+头部返回箭头等杂七杂八/搜索.png')} />
            </TouchableOpacity>
    ),
  });

  state={
    Data:{
      order_list:[],
    }
  }

  //获取已经生成的订单{"Action":"GetOrderList","token":"90f9f715ee5d1acf4a104dedd4b30727",
//"size":10,"page":1,"status":0}
//其中status的意思是：0--全部订单，1--待付款，2--待收货


  _GetOrderList = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    var data = {
      'Action':'GetOrderList',
      'token':userToken,
      'size':100,
      'page':1,
      'status':0,
    };
    console.log(data);
    let responseJson = await ApiPost(data);
    console.log(responseJson);
    this.setState({Data:responseJson.Data});
  };

  componentWillMount() {
    this._GetOrderList();
  }
  _renderItem = ({item, index, section}) => (
    <View style={{flexDirection:'row',alignItems:'center'}}>
      <Image source={{uri:item.goods_thumb}} style={{width:90,height:90}}/>
      <View style={{}}>
        <Text style={{fontSize:14,color:'#3F3F3F',}} key={index+'name'}>{item.goods_name}</Text>
        <Text style={{fontSize:12,color:'#C7C7C7',marginTop:8,}} key={index+'attr'}>{item.goods_attr}</Text>
        <View style={{flexDirection:'row',alignItems:'center',}}>
          <Text style={{fontSize:14,color:'#FF8F00',}} key={index+'price'}>{item.goods_price}</Text>
          <Text style={{width:44,textAlign:'center'}}>X{item.goods_number}</Text>
        </View>
      </View>
    </View>
  );

  //

  _renderHeader = ({section: {user_name,order_sn}}) => (
    <View style={{flexDirection:'row'}}>
      <Image source={require('../assets/images/04订单/店铺.png')} />
      <Text style={{fontWeight: 'bold'}}>{user_name}</Text>
      <Image source={require('../assets/images/04订单/右箭头.png')} />
      <Button title='取消订单' onPress={()=>{}}/>
          <Button title='付款' onPress={() => {
            this._pay(order_sn);
          }}/>
    </View>
  );
  
  //

  

  _cancel = async (order_sn) => {};

  _renderSectionFooter ({section: {order_goods_num,total_fee,order_sn}}) {
    //console.log(this);
    // <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
    //       <Button title='取消订单' onPress={()=>{}}/>
    //       <Button title='付款' onPress={() => {
    //         this._pay(order_sn);
    //       }}/>
    //     </View>
    return (
      <View>
        <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
          <Text>共{order_goods_num}件商品 小计：</Text>
          <Text>{total_fee}</Text>
        </View>
        
      </View>
      );
  };

  render() {
    //
    return (
      <ScrollView style={styles.container}>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity style={{flex:0.2,height:44}}>
            <Text style={{fontSize:14,color:'#ff8f00'}}>全部</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:0.2,height:44}}>
            <Text style={{fontSize:14,color:'#3f3f3f'}}>代付款</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:0.2,height:44}}>
            <Text style={{fontSize:14,color:'#3f3f3f'}}>待发货</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:0.2,height:44}}>
            <Text style={{fontSize:14,color:'#3f3f3f'}}>待收货</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:0.2,height:44}}>
            <Text style={{fontSize:14,color:'#3f3f3f'}}>待评价</Text>
          </TouchableOpacity>
        </View>
        <SectionList
          renderItem={this._renderItem}
          renderSectionHeader={this._renderHeader}
          renderSectionFooter = {this._renderSectionFooter}
          sections={this.state.Data.order_list}
          keyExtractor={(item, index) => item + index}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
