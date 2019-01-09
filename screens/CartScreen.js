import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  View,
  Text,
  SectionList,
  Image,
  Slider,
  ImageBackground,
  AsyncStorage,
   } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

class MyListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    const textColor = this.props.selected ? "red" : "black";
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View>
          <Text style={{ color: textColor }}>
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}


export default class CartScreen extends React.Component {
  // static navigationOptions = {
  //   title: '购物车',
  // };
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('otherParam', '购物车'),
    };
  };

  state = {
    selected: (new Map(): Map<string, boolean>),
    Data:{
      goods_list:[
        {
          data:[],
        }
      ],
      total:{}
    },
    isRefresh:false,
  };

  _keyExtractor = (item, index) => item.id;

  _onPressItem = (id: string) => {
    // updater functions are preferred for transactional updates
    this.setState((state) => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return {selected};
    });
  };

  _renderItem1 = ({item}) => (
    <MyListItem
      id={item.id}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.id)}
      title={item.title}
    />
  );

  _renderItem = ({item, index, section}) => {
    let img = <Image source={require('../assets/images/10购物车/购物车未选中.png')} style={{width:16,height:16}}/>;
    if(item.is_checked == '1'){
      img = <Image source={require('../assets/images/10购物车/购物车选中.png')} style={{width:16,height:16}}/>
    }
    //
   return (
    <View style={{flexDirection:'row',alignItems:'center'}}>
      <TouchableOpacity onPress={() => this._CartSelected(item.is_checked,item.rec_id)}>
        {img}
      </TouchableOpacity>
      <Image source={{uri:item.goods_thumb}} style={{width:90,height:90,marginLeft:11}}/>
      <View style={{height:90,justifyContent:'center',flex:1,marginLeft:11,}}>
        <Text style={{fontSize:14,color:'#3F3F3F',marginTop:11,}} key={index+'name'}>{item.goods_name}</Text>
        <Text style={{fontSize:12,color:'#C7C7C7',marginTop:8,}} key={index+'attr'}>{item.goods_attr}</Text>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',flex:1}}>
          <Text style={{fontSize:14,color:'#FF8F00'}} key={index+'price'}>{item.goods_price}</Text>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'rgba(0,0,0,0.22)',borderRadius:5,}}>
            <TouchableOpacity style={{width:22,height:22,alignItems:'center',justifyContent:'center'}}
              onPress={()=>this._CartGoodsNumber(item.rec_id,item.goods_number,1,index,section)}>
              <Image source={require('../assets/images/10购物车/加号.png')} />
            </TouchableOpacity>
            <View style={{width:1,height:22,backgroundColor:'rgba(0, 0, 0, 0.22)',}}/>
            <Text style={{width:22,textAlign:'center'}}>{item.goods_number}</Text>
            <View style={{width:1,height:22,backgroundColor:'rgba(0, 0, 0, 0.22)',}}/>
            <TouchableOpacity 
              style={{width:22,height:22,alignItems:'center',justifyContent:'center'}}
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
    let img = <Image source={require('../assets/images/10购物车/购物车未选中.png')} style={{width:16,height:16}}/>;
    let checked = '0';
    if(is_checked=='1'){
      img = <Image source={require('../assets/images/10购物车/购物车选中.png')} style={{width:16,height:16}}/>;
      checked = '1';
    }
    //
    return (
    <TouchableOpacity onPress={()=>{this._storeSelected(checked,ru_id)}}>
      <View style={{flexDirection:'row'}}>
        {img}
        <Image source={require('../assets/images/04订单/店铺.png')} style={{width:16,height:16,marginLeft:11}}/>
        <Text style={{fontWeight: 'bold',marginHorizontal:11}}>{ru_name}</Text>
        <Image source={require('../assets/images/04订单/右箭头.png')} />
      </View>
    </TouchableOpacity>
  );
  };

  _getCart = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    var data = {
      'Action':'GetCart',
      'token':userToken,
    };
    let responseJson = await ApiPost(data);
    let j = 0;
    if(responseJson.Result){
      for (var i = 0; i < responseJson.Data.goods_list.length; i++) {
        responseJson.Data.goods_list[i]['index'] = i;
        //responseJson.Data.goods_list[i]['selected'] = false;
        if(responseJson.Data.goods_list[i]['is_checked'] == '1'){
          j ++;
        }
      }
      responseJson.Data.total.is_checked='0';
      if(j == responseJson.Data.goods_list.length){
        responseJson.Data.total.is_checked='1';
      }
      this.setState({Data:responseJson.Data});
      let count = responseJson.Data.total.real_goods_count;
      this.props.navigation.setParams({otherParam: '购物车('+count+')'});
    }
    
  };

  //{"Action":"CartGoodsNumber","token":"2e6b88dbbf93a4d6095bdea691f6da87","cart_id":"36","number":"2"}
  _CartGoodsNumber = async (rec_id,number,plus,idx,section) => {
    const userToken = await AsyncStorage.getItem('userToken');
    let result = parseInt(number)+parseInt(plus);
    var data = {
      'Action':'CartGoodsNumber',
      'token':userToken,
      'cart_id':rec_id,
      'number': result,
    };
    let responseJson = await ApiPost(data);
    if (responseJson.Result) {
      this._getCart();
    }
  };

  _allSelected = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    let result = this.state.Data.total.is_checked;
    let allcart = 'checked';
    if(result == '1'){
      allcart = 'uncheck';
    }
    var data = {
      'Action':'CartSelected',
      'token':userToken,
      'cart_id':'',
      'ru_id':'',
      'status':'',
      'allcart': allcart,
    };
    let responseJson = await ApiPost(data);
    if (responseJson.Result) {
      this._getCart();
    }
  };

  _storeSelected = async (checked,ru_id) => {
    const userToken = await AsyncStorage.getItem('userToken');
    let result = '1';
    if(checked == '1'){
      result = '0';
    }
    var data = {
      'Action':'CartSelected',
      'token':userToken,
      'cart_id':'',
      'ru_id':ru_id,
      'status':result,
      'allcart': '',
    };
    let responseJson = await ApiPost(data);
    if (responseJson.Result) {
      this._getCart();
    }
  };

  _CartSelected = async (checked,cart_id) => {
    const userToken = await AsyncStorage.getItem('userToken');
    let result = '1';
    if(checked == '1'){
      result = '0';
    }
    var data = {
      'Action':'CartSelected',
      'token':userToken,
      'cart_id':cart_id,
      'ru_id':'',
      'status':result,
      'allcart': '',
    };
    let responseJson = await ApiPost(data);
    if (responseJson.Result) {
      this._getCart();
    }
  };

  _Settlement = async () => {
    this.props.navigation.navigate('Settlement',{'carttype':0});
  };

  componentWillMount() {
    this._getCart();
  };
  _didFocusSubscription = {};
  
  componentDidMount() {
      // 通过addListener开启监听，可以使用上面的四个属性
      this._didFocusSubscription = this.props.navigation.addListener(
          'didFocus',
          payload => {
              this._getCart();
          }
      );
  }
  componentWillUnmount() {
      // 在页面消失的时候，取消监听
      this._didFocusSubscription && this._didFocusSubscription.remove();
  }

  componentWillReceiveProps(nextProps){
    this.setState({
        isRefresh:nextProps.navigation.getParam('fresh',false),
    });
    if(this.state.isRefresh){
        this._getCart();
    }
  };

  render() {
    let is_checked = this.state.Data.total.is_checked;
    let img = <Image source={require('../assets/images/10购物车/购物车未选中.png')} style={{width:16,height:16}}/>;
    if(is_checked == '1'){
      img = <Image source={require('../assets/images/10购物车/购物车选中.png')} style={{width:16,height:16}}/>;
    }
    let count = this.state.Data.total.real_goods_count;

    return (
      <View style={styles.container}>
        <SectionList
          renderItem={this._renderItem}
          renderSectionHeader={this._renderHeader}
          sections={this.state.Data.goods_list}
          keyExtractor={(item, index) => item + index}
          style={{flex:1}}
        />
        <View style={{flexDirection:'row',alignItems:'center', justifyContent:'space-between'}}>
          <TouchableOpacity style={{flexDirection:'row',}} onPress={() => this._allSelected()}>
            {img}
            <Text style={{fontSize:14,color:'#3F3F3F',marginLeft:11}} >全选</Text>
          </TouchableOpacity>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={{fontSize:14,color:'#3F3F3F',}} >合计：</Text>
            <Text style={{fontSize:14,color:'#FF8F00',marginLeft:11}} >¥{this.state.Data.total.goods_amount}</Text>
            <TouchableOpacity onPress={this._Settlement} style={{marginLeft:11,width: 120, height: 40,borderRadius:15,alignItems:'center',justifyContent:'center',backgroundColor:'#ff8f00'}}>
              <Text style={{fontSize:14,color:'#ffffff',}} >结算({count})</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:11,
  },
});
