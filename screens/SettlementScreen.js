import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  Text,
  ImageBackground,
  SectionList,
  Image,
  View,
   } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class SettlementScreen extends React.Component {
  static navigationOptions = {
    title: '结算',
  };
  state = {
    Data:{
      consignee:{

      },
      goods_list:[],

    }
  };
  _CartToSettle = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    var data = {
      'Action':'CartToSettle',
      'token':userToken,
    };
    console.log(data);
    let responseJson = await ApiPost(data);
    console.log(responseJson);
    this.setState({Data:responseJson.Data});
  };
  componentWillMount() {
    this._CartToSettle();
  };
  _Settlement = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    var data = {
      'Action':'SettleToOrder',
      'token':userToken,
      'cart_value':'18',
      'ru_id':[2],
      'postscript':'',
      "need_inv":"1",
      "inv_type":"0",
      "inv_payee":"个人",
      "tax_id":"",
      "inv_content":"明细",
      "invoice_id":"0",
      "vat_id":"",
      "payment":"15",
      "shipping":[0],
      "shipping_type":[0],
      "shipping_code":["yto"],
    };
    console.log(data);
    let responseJson = await ApiPost(data);
    console.log(responseJson);
  };
  _renderItem = ({item, index, section}) => {
    let img = <Image source={require('../assets/images/10购物车/购物车未选中.png')} />;
    if(item.is_checked == '1'){
      img = <Image source={require('../assets/images/10购物车/购物车选中.png')} />
    }
   return (
    <View style={{flexDirection:'row',alignItems:'center'}}>
      <TouchableOpacity onPress={() => this._CartSelected(item.is_checked,item.rec_id)}>
        {img}
      </TouchableOpacity>
      <Image source={{uri:item.goods_thumb}} style={{width:90,height:90}}/>
      <View style={{}}>
        <Text style={{fontSize:14,color:'#3F3F3F',}} key={index+'name'}>{item.goods_name}</Text>
        <Text style={{fontSize:12,color:'#C7C7C7',marginTop:8,}} key={index+'attr'}>{item.goods_attr}</Text>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Text style={{fontSize:14,color:'#FF8F00',}} key={index+'price'}>{item.goods_price}</Text>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'rgba(0,0,0,0.22)',borderRadius:10,}}>
            <TouchableOpacity style={{width:44,height:44,alignItems:'center',justifyContent:'center'}}
              onPress={()=>this._CartGoodsNumber(item.rec_id,item.goods_number,1,index,section)}>
              <Image source={require('../assets/images/10购物车/加号.png')} />
            </TouchableOpacity>
            <View style={{width:1,height:44,backgroundColor:'rgba(0, 0, 0, 0.22)',}}/>
            <Text style={{width:44,textAlign:'center'}}>{item.goods_number}</Text>
            <View style={{width:1,height:44,backgroundColor:'rgba(0, 0, 0, 0.22)',}}/>
            <TouchableOpacity 
              style={{width:44,height:44,alignItems:'center',justifyContent:'center'}}
              onPress={()=>this._CartGoodsNumber(item.rec_id,item.goods_number,-1,index, section)}>
              <Image source={require('../assets/images/10购物车/减号.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  ); 
  }

  _renderHeader = ({section: {is_checked,ru_id,ru_name}}) => {
    let img = <Image source={require('../assets/images/10购物车/购物车未选中.png')} />;
    let checked = '0';
    if(is_checked=='1'){
      img = <Image source={require('../assets/images/10购物车/购物车选中.png')} />;
      checked = '1';
    }
    return (
    <TouchableOpacity onPress={()=>{this._storeSelected(checked,ru_id)}}>
      <View style={{flexDirection:'row'}}>
        {img}
        <Image source={require('../assets/images/04订单/店铺.png')} />
        <Text style={{fontWeight: 'bold'}}>{ru_name}</Text>
        <Image source={require('../assets/images/04订单/右箭头.png')} />
      </View>
    </TouchableOpacity>
  );
  };

  render() {
    let consignee = this.state.Data.consignee;
    let goods_list = this.state.Data.goods_list;
    return (
      <ScrollView style={styles.container}>
        <Text>{consignee.consignee}{consignee.mobile}{consignee.region}{consignee.address}</Text>
        <SectionList
          renderItem={this._renderItem}
          renderSectionHeader={this._renderHeader}
          sections={this.state.Data.goods_list}
          keyExtractor={(item, index) => item + index}
        />
        <TouchableOpacity onPress={this._Settlement} style={{alignItems:'center',justifyContent:'center',}}>
              <ImageBackground source={require('../assets/images/02登录注册部分/按钮未填入.png')} style={{width: 60, height: 20,alignItems:'center',justifyContent:'center',}}>
                <Text>结算(1)</Text>
              </ImageBackground>
            </TouchableOpacity>
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
