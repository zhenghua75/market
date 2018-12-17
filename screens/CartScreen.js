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

  _renderItem = ({item, index, section}) => (
    <View style={{flexDirection:'row',alignItems:'center'}}>
      <Image source={require('../assets/images/10购物车/购物车未选中.png')} />
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

  _renderHeader = ({section: {selected,ru_name}}) => (
    <TouchableOpacity onPress={()=>{this._storeSelected(selected)}}>
      <View style={{flexDirection:'row'}}>
        <Image source={require('../assets/images/10购物车/购物车未选中.png')} />
        <Image source={require('../assets/images/04订单/店铺.png')} />
        <Text style={{fontWeight: 'bold'}}>{ru_name}</Text>
        <Image source={require('../assets/images/04订单/右箭头.png')} />
      </View>
    </TouchableOpacity>
  );

  //购物车{"Action":"GetCart","token":"2e6b88dbbf93a4d6095bdea691f6da87"}

  _getCart = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    var data = {
      'Action':'GetCart',
      'token':userToken,
    };
    let responseJson = await ApiPost(data);
    console.log(responseJson);
    for (var i = 0; i < responseJson.Data.goods_list.length; i++) {
      responseJson.Data.goods_list[i]['index'] = i;
      responseJson.Data.goods_list[i]['selected'] = false;
    }
    this.setState({Data:responseJson.Data});
    
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
    console.log(responseJson);
    if (responseJson.Result) {
      this._getCart();
    }
  };
  _storeSelected = (selected) => {

  };

  //购物车选择和取消选择
  //{"Action":"CartSelected","token":"2e6b88dbbf93a4d6095bdea691f6da87",
  //"cart_ids":"18","change_cart_ids":"36","change_status":"0"}
  _CartSelected = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    let result = parseInt(number)+parseInt(plus);
    var data = {
      'Action':'CartGoodsNumber',
      'token':userToken,
      'cart_id':rec_id,
      'number': result,
    };
    let responseJson = await ApiPost(data);
    console.log(responseJson);
  };

  componentWillMount() {
    this._getCart();
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <SectionList
          renderItem={this._renderItem}
          renderSectionHeader={this._renderHeader}
          sections={this.state.Data.goods_list}
          keyExtractor={(item, index) => item + index}
        />
        <View style={{flexDirection:'row'}}>
          <View style={{flexDirection:'row'}}>
            <Image source={require('../assets/images/10购物车/购物车未选中.png')} />
            <Text>全选</Text>
          </View>
          <View style={{flexDirection:'row'}}>
            <Text>合计：</Text>
            <Text>¥{this.state.Data.total.goods_amount}</Text>
            <TouchableOpacity onPress={this._nextAsync} style={{alignItems:'center',justifyContent:'center',}}>
              <ImageBackground source={require('../assets/images/02登录注册部分/按钮未填入.png')} style={{width: 60, height: 20,alignItems:'center',justifyContent:'center',}}>
                <Text>结算(1)</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
        <Button
          title="Update the title"
          onPress={() => this.props.navigation.setParams({otherParam: '购物车(0)'})}
        />
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
