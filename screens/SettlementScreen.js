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
    title: '确认订单',
  };

  state = {
    Data:{
      consignee:{},
      goods_list:[{shipping:[{shipping_id:null,shipping_name:null,}],shipping_id:null,shipping_idx:0,data:[]},],
      total:{
        amount:null,
      },
      payment_selected:{
        pay_name:null,
      },
      order:{
        inv_type:null,
        inv_payee:null,
      },
      payment_list:[],
      inv_content_list:[]
    },
  };

  _CartToSettle = async () => {
    const { navigation } = this.props;
    let carttype = navigation.getParam('carttype');
    const userToken = await AsyncStorage.getItem('userToken');
    var data = {
      'Action':'CartToSettle',
      'token':userToken,
      'cart_type':carttype
    };
    let responseJson = await ApiPost(data);
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
    const { navigation } = this.props;
    let carttype = navigation.getParam('carttype');
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
      "cart_type":carttype
    };
    let responseJson = await ApiPost(data);
    if(responseJson.Result){
      alert(responseJson.MessageString);
      this.props.navigation.navigate('Alipay',{'order_sn':responseJson.Data.order_sn});
    }
  };

  _renderItem ({item, index, section}) {
   return (
    <View style={{flexDirection:'row',alignItems:'center'}}>
      <Image source={{uri:item.goods_thumb}} style={{width:90,height:90}}/>
      <View style={{flex:1,height:90,marginLeft:11}}>
        <Text style={{fontSize:14,color:'#3F3F3F',}} key={index+'name'}>{item.goods_name}</Text>
        <Text style={{fontSize:12,color:'#C7C7C7',marginTop:8,}} key={index+'attr'}>{item.goods_attr}</Text>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
          <Text style={{fontSize:14,color:'#FF8F00',}} key={index+'price'}>¥{item.goods_price}</Text>
          <Text style={{fontSize:14,color:'#3F3F3F',}}>X{item.goods_number}</Text>
        </View>
      </View>
    </View>
  ); 
  }
  //
  _renderHeader ({section: {is_checked,ru_id,ru_name}}) {
    return (
      <View style={{flexDirection:'row',marginBottom:11}}>
          <Image source={require('../assets/images/04订单/店铺.png')} />
          <Text style={{fontWeight: 'bold',marginLeft:11}}>{ru_name}</Text>
          <Image source={require('../assets/images/04订单/右箭头.png')} style={{marginLeft:11}}/>
        </View>
    );
  };
  //
  _renderSectionFooter ({section: {is_checked,ru_id,ru_name,shipping,index,shipping_idx,goods_amount}}) {
    let defaultShipping = shipping[shipping_idx];
    return (
      <View>
        <View style={{flexDirection:'row',justifyContent:'space-between',padding:11,borderBottomWidth:1,borderTopWidth:1,borderColor:'#e5e5e5'}}>
          <Text style={{fontSize:14,color:'#3F3F3F'}}>配送方式</Text>
          <TouchableOpacity onPress={()=>{
            let btns = [];
            for (var i = 0; i < shipping.length; i++) {
              let shipping_id = shipping[i].shipping_id;
              btns.push({text:shipping[i].shipping_name,onPress:()=>{
                //console.log(shipping_id);
              }});
            }
            btns.push({
              text: '取消', style: 'cancel', onPress: () => {}
            });
            Alert.alert(
              '快递',
              null,
              btns,
            );
          }}>
            <View style={{ height: 50, flexDirection:'row'}}>
              <Text style={{fontSize:14,color:'#3F3F3F'}}>{defaultShipping.shipping_name}</Text>
              <Text style={{fontSize:14,color:'#ff8f00'}}>¥{defaultShipping.shipping_fee}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',padding:11}}>
          <View/>
          <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:12,color:'#3F3F3F'}}>共{}件商品 小计：</Text>
            <Text style={{fontSize:12,color:'#ff8f00',marginLeft:11}}>¥{goods_amount}</Text>
          </View>
        </View>
      </View>
      );
  };
  //
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
    let payment_selected = this.state.Data.payment_selected;
    let order = this.state.Data.order;
    return (
      <View style={styles.container}>
        <View style={{padding:11,marginBottom:11,flexDirection:'row',backgroundColor:'#fff'}}>
          <Image source={require('../assets/images/04订单/地址.png')} />
          <View style={{marginLeft:11}}>
            <View style={{flexDirection:'row',justifyContent:'space-between',}}>
              <Text style={{fontSize:12,color:'#3F3F3F'}}>收货人：{consignee.consignee}</Text>
              <Text style={{fontSize:12,color:'#888888'}}>{consignee.mobile}</Text>
            </View>
            <Text style={{fontSize:12,color:'#3F3F3F'}}>收货地址：{consignee.region}{consignee.address}</Text>
          </View>
          
        </View>
        <SectionList
          renderItem = {this._renderItem}
          renderSectionHeader = {this._renderHeader}
          renderSectionFooter = {this._renderSectionFooter}
          sections = {goods_list}
          keyExtractor = {(item, index) => item + index}
          style={{flex:1,backgroundColor:'#fff',padding:11}}
        />
        <View style={{marginTop:11,backgroundColor:'#fff',padding:11}}>
          <TouchableOpacity onPress = {this._selectPayType}
            style={{flexDirection:'row',justifyContent:'space-between',height:44,borderBottomWidth:1,borderColor:'#e5e5e5',alignItems:'center'}}>
            <Text>支付方式</Text>
            <View style={{flexDirection:'row'}}>
              <Text>{payment_selected.pay_name}</Text>
              <Image source={require('../assets/images/04订单/右箭头.png')} style={{marginLeft:11}}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress = {this._selectInv}
            style={{flexDirection:'row',justifyContent:'space-between',height:44,marginTop:11,alignItems:'center'}}>
            <Text>发票信息</Text>
            <View style={{flexDirection:'row'}}>
              <Text>{order.inv_payee}</Text>
              <Text style={{marginLeft:11}}>{order.inv_content}</Text>
              <Image source={require('../assets/images/04订单/右箭头.png')} style={{marginLeft:11}}/>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row',alignItems:'center', justifyContent:'space-between',backgroundColor:'#fff',padding:11}}>
          <View/>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={{fontSize:14,color:'#3F3F3F',}} >合计金额：</Text>
            <Text style={{fontSize:14,color:'#FF8F00',marginLeft:11}} >¥{this.state.Data.total.amount}</Text>
            <TouchableOpacity onPress={this._Settlement} style={{marginLeft:11,width: 120, height: 40,borderRadius:15,alignItems:'center',justifyContent:'center',backgroundColor:'#ff8f00'}}>
              <Text style={{fontSize:14,color:'#ffffff',}} >提交订单</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  //
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

  _selectPayType = () => {
    let payment_list = this.state.Data.payment_list;
    let btns = [];
    for (var i = 0; i < payment_list.length; i++) {
      let cur = payment_list[i];
      btns.push({text:payment_list[i].pay_name,onPress:()=>{
        let data  = this.state.Data;
        data.payment_selected = cur;
        this.setState({Data:data});
      }});
    }
    btns.push({
      text: '取消', style: 'cancel', onPress: () => {}
    });
    Alert.alert(
      '支付方式',
      null,
      btns,
    );
  };

  _selectInv = () => {
    let inv_content_list = this.state.Data.inv_content_list;
    let btns = [];
    for (var i = 0; i < inv_content_list.length; i++) {
      let cur = inv_content_list[i];
      btns.push({text:inv_content_list[i],onPress:()=>{
        let data  = this.state.Data;
        data.order.inv_content = cur;
        this.setState({Data:data});
      }});
    }
    btns.push({
      text: '取消', style: 'cancel', onPress: () => {}
    });
    Alert.alert(
      '发票信息',
      null,
      btns,
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C7C7C7',
  },
});
