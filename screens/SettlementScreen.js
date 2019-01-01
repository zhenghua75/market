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
  Picker,
  Alert
   } from 'react-native';

export default class SettlementScreen extends React.Component {

  static navigationOptions = {
    title: '支付',
  };

  state = {
    Data:{
      consignee:{},
      goods_list:[{shipping:[{shipping_id:null,shipping_name:null,}],shipping_id:null,shipping_idx:0,data:[]},],
    },
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
    for (var i = 0; i < responseJson.Data.goods_list.length; i++) {
      responseJson.Data.goods_list[i].index = i;
      let shipping = responseJson.Data.goods_list[i].shipping;
      for (var j = 0; j < shipping.length; j++) {
        if(shipping[j].default==1){
          responseJson.Data.goods_list[i].shipping_idx = j;
          responseJson.Data.goods_list[i].shipping_id = shipping[j].shipping_id;
          break;
        }
      }
    }
    this.setState({Data:responseJson.Data});
  };

  componentWillMount() {
    this._CartToSettle();
  };

  _Settlement = async () => {
    let goods_list = this.state.Data.goods_list;
    let cart_value = this.state.Data.cart_value;
    let ru_id = [];
    let shipping = [];
    for (var i = 0; i < goods_list.length; i++) {
      ru_id.push(goods_list[i].ru_id);
      shipping.push(parseInt(goods_list[i].shipping_id));
    }
    let order = this.state.Data.order;
    need_inv = order.need_inv;
    inv_payee = order.inv_payee;
    inv_content = order.inv_content;
    inv_type = order.inv_type;
    payment_selected = this.state.Data.payment_selected;
    pay_id = payment_selected.pay_id;

    const userToken = await AsyncStorage.getItem('userToken');
    var data = {
      'Action':'SettleToOrder',
      'token':userToken,
      'cart_value':cart_value,
      'ru_id':ru_id,
      'postscript':[],
      "shipping":shipping,
      "need_inv":need_inv,
      "inv_type":inv_type,
      "inv_payee":inv_payee,
      "tax_id":"",
      "inv_content":inv_content,
      "invoice_id":"0",
      "vat_id":"",
      "payment":pay_id,
    };
    console.log(data);
    let responseJson = await ApiPost(data);
    console.log(responseJson);
  };

  _renderItem ({item, index, section}) {
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

  _renderHeader ({section: {is_checked,ru_id,ru_name}}) {
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

  _renderSectionFooter ({section: {is_checked,ru_id,ru_name,shipping,index,shipping_idx}}) {
    let defaultShipping = shipping[shipping_idx];
    return (
      <TouchableOpacity onPress={()=>{this._selectShipping(shipping)}}>
        <View style={{ height: 50, }}>
          <Text>{defaultShipping.shipping_name}</Text>
        </View>
      </TouchableOpacity>
      );
  };

  render() {
    let consignee = this.state.Data.consignee;
    let goods_list = this.state.Data.goods_list;
    // <Picker
    //       selectedValue={shipping_id}
    //       style={{ flex: 1, }}
    //       onValueChange={(itemValue, itemIndex) => {
    //         let data = this.state.Data;
    //         let shipping_id = data.goods_list[index].shipping[itemIndex].shipping_id;
    //         data.goods_list[index].shipping_id = shipping_id;
    //         this.setState({Data: data});
    //       }}>
    //       { 
    //         shipping.map((item, key) => {
    //         return (<Picker.Item key={'shipping-'+item.shipping_id} label={item.shipping_name} value={item.shipping_id} />)
    //       })}
    //     </Picker>

    return (
      <ScrollView style={styles.container}>
        <Text>{consignee.consignee}{consignee.mobile}{consignee.region}{consignee.address}</Text>
        <SectionList
          renderItem = {this._renderItem}
          renderSectionHeader = {this._renderHeader}
          renderSectionFooter = {this._renderSectionFooter}
          sections = {goods_list}
          keyExtractor = {(item, index) => item + index}
        />
        <TouchableOpacity onPress={this._Settlement} style={{alignItems:'center',justifyContent:'center',}}>
          <ImageBackground source={require('../assets/images/02登录注册部分/按钮未填入.png')} style={{width: 60, height: 20,alignItems:'center',justifyContent:'center',}}>
            <Text>结算(1)</Text>
          </ImageBackground>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  _selectShipping= (shipping) => {
    let btns = [];
    for (var i = 0; i < shipping.length; i++) {
      btns.push({text:shipping[i].shipping_name,onPress:()=>console.log(shipping[i].shipping_id)});
    }
    Alert.alert(
      '快递',
      '快递',
      btns,
      { cancelable: false }
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
