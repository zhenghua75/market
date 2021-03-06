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
    },
    selected:0,
  }

  //获取已经生成的订单{"Action":"GetOrderList","token":"90f9f715ee5d1acf4a104dedd4b30727",
//"size":10,"page":1,"status":0}
//其中status的意思是：0--全部订单，1--待付款，2--待收货


  _GetOrderList = async (status) => {
    const userToken = await AsyncStorage.getItem('userToken');
    var data = {
      'Action':'GetOrderList',
      'token':userToken,
      'size':100,
      'page':1,
      'status':status,
    };
    let responseJson = await ApiPost(data);
    this.setState({Data:responseJson.Data,selected:status});
  };

  componentWillMount() {
    this._GetOrderList(0);
  }
  _renderItem = ({item, index, section}) => (
    <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'#eeeeee',padding:12}}>
      <Image source={{uri:item.goods_thumb}} style={{width:90,height:90}}/>
      <View style={{marginLeft:11,height:90,flex:1,}}>
        <Text style={{fontSize:14,color:'#3F3F3F',}} key={index+'name'}>{item.goods_name}</Text>
        <Text style={{fontSize:12,color:'#C7C7C7',marginTop:8,}} key={index+'attr'}>{item.goods_attr}</Text>
        <View style={{flexDirection:'row',justifyContent:'space-between',}}>
          <Text style={{fontSize:14,color:'#FF8F00',}} key={index+'price'}>{item.goods_price}</Text>
          <Text style={{width:44,textAlign:'center'}}>X{item.goods_number}</Text>
        </View>
      </View>
    </View>
  );

  _renderHeader = ({section: {user_name,order_status_des,order_sn,order_time}}) => (
    <View>
        <View style={{height:10,flex:1,backgroundColor:'#E0E0E0'}}/>
        <View style={{flexDirection:'row',padding:12,alignItems:'center',borderBottomWidth:1,borderColor:'#e5e5e5'}}>
            <Image source={require('../assets/images/04订单/店铺.png')} />
            <Text style={{fontSize:14,fontWeight: 'bold',marginHorizontal:11}}>{user_name}</Text>
            {/* <Image source={require('../assets/images/04订单/右箭头.png')} /> */}
            <Text style={{flex:1,fontSize:14,marginHorizontal:11,color:'#EC5151',textAlign:'right'}}>{order_status_des}</Text>
        </View>
        <View style={{padding:12,}}>
            <Text style={{fontSize:14,}}>订单号：{order_sn}</Text>
            <Text style={{fontSize:12,}}>{order_time}</Text>
        </View>
    </View>
  );

  _cancel = async (order_id) => {
    const userToken = await AsyncStorage.getItem('userToken');
    var data = {
      'Action':'CancelOrder',
      'token':userToken,
      'order_id':order_id,
    };
    let responseJson = await ApiPost(data);
    if(responseJson.Result){
      alert(responseJson.MessageString);
      this._GetOrderList(this.state.selected);
    }
  };

  _delete = async (order_id) => {
    const userToken = await AsyncStorage.getItem('userToken');
    var data = {
      'Action':'DeleleOrder',
      'token':userToken,
      'order_id':order_id,
    };
    let responseJson = await ApiPost(data);
    if(responseJson.Result){
      alert(responseJson.MessageString);
      this._GetOrderList(this.state.selected);
    }
  };

  _pay =  (order_sn) => {
    this.props.navigation.navigate('Alipay',{'order_sn':order_sn});
  };

  _renderFooter ({section: {order_id,order_goods_num,total_fee,order_sn,order_status,order_del,delete_yes}}) {
    let buttonwarp=<View style={{flexDirection:'row',justifyContent:'flex-end',padding:11}}></View>;
    if(order_status=='0'){
        buttonwarp=<View style={{flexDirection:'row',justifyContent:'flex-end',padding:11}}>
            <TouchableOpacity style={{marginLeft:11,borderWidth:1,borderColor:'#3F3F3F',padding:8,borderRadius:5,alignItems:'center',justifyContent:'center'}} 
                onPress={()=>{this._cancel(order_id);}}>
                <Text style={{fontSize:12,color:'#3F3F3F'}}>取消订单</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft:11,borderWidth:1,borderColor:'#ff8f00',padding:8,borderRadius:5,alignItems:'center',justifyContent:'center'}}
                onPress={() => {this._pay(order_sn);}}>
                <Text style={{fontSize:12,color:'#ff8f00'}}>付款</Text>
            </TouchableOpacity>
        </View>;
    }else if(order_del==1 && delete_yes==1){
        buttonwarp=<View style={{flexDirection:'row',justifyContent:'flex-end',padding:11}}>
            <TouchableOpacity style={{marginLeft:11,borderWidth:1,borderColor:'#3F3F3F',padding:8,borderRadius:5,alignItems:'center',justifyContent:'center'}} 
                onPress={()=>{this._delete(order_id);}}>
                <Text style={{fontSize:12,color:'#3F3F3F'}}>删除订单</Text>
            </TouchableOpacity>
        </View>;
    }
    return (
      <View>
        <View style={{flexDirection:'row',justifyContent:'flex-end',borderBottomWidth:1,borderTopWidth:1,borderColor:'#e5e5e5',padding:11}}>
          <Text>共{order_goods_num}件商品 小计：</Text>
          <Text>{total_fee}</Text>
        </View>
        {buttonwarp}
      </View>
    );
  };

  render() {
    //全部订单列表，有四个，0-全部，1—待付款，2—待收货，3-待评价
    // <TouchableOpacity style={{flex:0.2,height:44}} onPress={() => { this._GetOrderList(2)}}>
    //         <Text style={{fontSize:14,color:'#3f3f3f'}}>待发货</Text>
    //       </TouchableOpacity>
    let selected= this.state.selected;
    let selected0 = selected == 0;
    let selected1 = selected == 1;
    let selected2 = selected == 2;
    let selected3 = selected == 3;

    return (
      <View style={styles.container}>
        <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',
            borderColor:'#eeeeee',borderBottomWidth:1,}}>
          <TouchableOpacity style={{paddingVertical:10}} onPress={() => {this._GetOrderList(0);}}>
            <Text style={{fontSize:16,color:selected0?'#ff8f00':'#3F3F3F'}}>全部</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{paddingVertical:10}} onPress={() => { this._GetOrderList(1)}}>
            <Text style={{fontSize:16,color:selected1?'#ff8f00':'#3F3F3F'}}>待付款</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{paddingVertical:10}} onPress={() => { this._GetOrderList(2)}}>
            <Text style={{fontSize:16,color:selected2?'#ff8f00':'#3F3F3F'}}>待收货</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{paddingVertical:10}} onPress={() => { this._GetOrderList(3)}}>
            <Text style={{fontSize:16,color:selected3?'#ff8f00':'#3F3F3F'}}>待评价</Text>
          </TouchableOpacity>
        </View>
        <SectionList
          renderItem={this._renderItem}
          renderSectionHeader={this._renderHeader}
          renderSectionFooter = {this._renderFooter.bind(this)}
          sections={this.state.Data.order_list}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
