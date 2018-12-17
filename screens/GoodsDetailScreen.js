import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  WebView,
  Platform,
  AsyncStorage,
  Alert,
  Linking,
   } from 'react-native';

import Swiper from 'react-native-swiper';
import ImageZoom from 'react-native-image-pan-zoom';
import ApiPost from '../lib/ApiPost';

const BaseScript =
    `
    (function () {
        var height = null;
        function changeHeight() {
          if (document.body.scrollHeight != height) {
            height = document.body.scrollHeight;
            if (window.postMessage) {
              window.postMessage(JSON.stringify({
                type: 'setHeight',
                height: height,
              }))
            }
          }
        }
        setInterval(changeHeight, 100);
    } ())
    `;

export default class GoodsDetailScreen extends React.Component {
  static navigationOptions = {
    title: '商品详情',
    headerTitleStyle: {
      alignSelf: 'center',
      textAlign: 'center',
      width: '100%',
    },
  };

  state={
    'info':{},
    'list':[],
    'visibleSwiper': false,
    'shippingFee':{},
    visibleModal: false,
    img_url:'',
    height:200,
    'store':{
      'commentad':{
        'Rank':{},
        'Delivery':{},
        'Server':{},
      },},
    comment_all:{},
    good_comment:[],
    spe:[],
    specprice:[],
    selected:{},
    number:0,
  };

  _getGoods=async (goods_id) =>{
    const userToken = await AsyncStorage.getItem('userToken');
    const { navigation } = this.props;
    let cat_id = navigation.getParam('cat_id');
    var data = {
      'Action':'GetGoodInfo',
      'token':userToken,
      'good_id':goods_id,
    };
    let responseJson = await ApiPost(data);
    console.log(responseJson);
    this.setState({
      info:responseJson.Data.good,
      html:responseJson.Data.good.goods_desc,
      list: responseJson.Data.good.pictures,
      shippingFee: responseJson.Data.shippingFee,
      store: responseJson.Data.store,
      comment_all: responseJson.Data.comment_all,
      good_comment: responseJson.Data.good_comment,
      spe: responseJson.Data.properties.spe,
      specprice: responseJson.Data.properties.specprice,
    });
    
  };

  _getGoodsGallery=async (goods_id) =>{
    try {
      let response = await fetch(
        'http://jc.ynweix.com/api.php?app_key=E6E3D813-4809-4C98-8D34-A14C7C493A7C&method=dsc.goods.gallery.list.get&format=json&goods_id='+goods_id
      );
      let responseJson = await response.json();
      if(responseJson.error > 1){
        throw responseJson;
      }
      let list = responseJson.info.list;
      this.setState({list:list, });
    } catch (error) {
      console.error(error);
    }
  };

  componentWillMount() {
    const { navigation } = this.props;
    let goods_id = navigation.getParam('goods_id');
    this._getGoods(goods_id);
    //this._getGoodsGallery(goods_id);
  }

  componentDidMount() {
   setTimeout(() => {
      this.setState({
        visibleSwiper: true
      });
   }, 100);
  }

  _modal = (img_url) => {
    this.setState({visibleModal:true, img_url:img_url});
  };

  onMessage (event) {
    try {
      const action = JSON.parse(event.nativeEvent.data)
      if (action.type === 'setHeight' && action.height > 0) {
        this.setState({ height: action.height })
      }
    } catch (error) {
      // pass
    }
  };

  _speSelected = (id) => {
    let specprice = this.state.specprice;

    for (var i = 0; i < specprice.length; i++) {
      if(specprice[i].combstr == id){
        this.setState({selected:this.state.specprice[i]});
        return;
      }
    }
    
  };

  _plus = () => {
    let number = this.state.number;
    this.setState({number:number+1});
  };

  _minus = () => {
    let number = this.state.number;
    if(number-1<0){
      this.setState({number:0});
    }else{
      this.setState({number:number-1});
    }
  };

  render() {
    let info = this.state.info;
    let swiper = null;
    let modal = null;
    let shippingFee = this.state.shippingFee;
    let store = this.state.store;
    let comment_all = this.state.comment_all;
    let good_comment = this.state.good_comment;
    let spe = this.state.spe;
    let specprice = this.state.specprice;

    let speView = <View>
      {spe.map((item, key) => {
        let sub = item.values.map((item2, key2)=>{return (
          <TouchableOpacity 
            key={item2.id} 
            style={{height:44,height:44,margin:11,}} 
            onPress={() => this._speSelected(item2.id)}>
              <Text>{item2.label}</Text>
            </TouchableOpacity>
          )});
        return (<View key={item.attr_type}><Text>{item.name}</Text>{sub}</View>)
      } )}
    </View>;

    let selected = <View style={{flexDirection:'row',alignItems:'center',marginTop:26,}}>
            <Text style={{fontSize:19,color:'#ff8f00',}}>¥{this.state.selected.shop_price}</Text>
            <Text style={{fontSize:14,color:'#999999',marginLeft:12,}}>¥{this.state.selected.market_price}</Text>
          </View>;

    if (this.state.visibleSwiper) {
      swiper = <Swiper style={styles.wrapper} dotColor={'#999999'} activeDotColor={'#ff8f00'} 
        width={Dimensions.get('window').width}
        height={Math.floor(Dimensions.get('window').width * 564/750)}
        removeClippedSubviews={false}
        autoplay={true}>
        {this.state.list.map((item, key) => {
          return (
            <TouchableOpacity key={key} onPress={() => this._modal(item.img_url)}>
              <Image source={{uri: item.img_url}} style={{
                width:Dimensions.get('window').width,
                height:Math.floor(Dimensions.get('window').width * 564/750)
              }}/>
            </TouchableOpacity>
          )
        })}
      </Swiper>;
    } else {
      swiper = <View></View>;
    }
    let self_run = null;
    if(store.self_run){
      self_run = <View>
        <View style={{flexDirection:'row',padding:12,}}>
          <Image source={{uri:store.logo_thumb}} style={{width:33,height:33,}}/>
          <Text style={{fontSize:18,color:'#3f3f3f',marginLeft:7,}}>{store.shop_name}</Text>
        </View>
        <View style={{flexDirection:'row',padding:12,}}>
          <View style={{alignItems:'center',flex:0.33}}>
            <Text style={{fontSize:16,color:'#3f3f3f',}}>{store.commentad.Rank.score}分{store.commentad.Rank.commentRank}</Text>
            <Text style={{fontSize:14,color:'#888888',marginTop:7}}>商品</Text>
          </View>
          <View style={{width:1,height:50,backgroundColor:'#e5e5e5',}}/>
          <View style={{alignItems:'center',flex:0.33}}>
            <Text style={{fontSize:16,color:'#3f3f3f',}}>{store.commentad.Server.score}分{store.commentad.Server.commentServer}</Text>
            <Text style={{fontSize:14,color:'#888888',marginTop:7}}>服务</Text>
          </View>
          <View style={{width:1,height:50,backgroundColor:'#e5e5e5',}}/>
          <View style={{alignItems:'center',flex:0.33}}>
            <Text style={{fontSize:16,color:'#3f3f3f',}}>{store.commentad.Delivery.score}分{store.commentad.Delivery.commentDelivery}</Text>
            <Text style={{fontSize:14,color:'#888888',marginTop:7}}>时效</Text>
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
      </View>;
    }

    let customerService = <TouchableOpacity style={{alignItems:'center',flex:0.14,}} onPress={this._customerService}>
            <Image source={require('../assets/images/05商品/客服.png')}/>
            <Text>客服</Text>
          </TouchableOpacity>;

    return (
      <View style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={{flexDirection:'row',justifyContent:'space-around',padding:12,}}>
          <Text style={{fontSize:16,color:'#ff8f00',textAlign:'center',flex:1}}>商品</Text>
          <TouchableOpacity style={{flex:1,}} onPress={this._comment}>
          	<Text style={{fontSize:16,color:'#3f3f3f',textAlign:'center',}}>评论</Text>
          </TouchableOpacity>
        </View>
        {swiper}
        <View style={{padding:12,}}>
          <Text style={{fontSize:16,color:'#3f3f3f',}}>{info.goods_name}</Text>
          <View style={{flexDirection:'row',alignItems:'center',marginTop:26,}}>
            <Text style={{fontSize:19,color:'#ff8f00',}}>¥{info.price}</Text>
            <Text style={{fontSize:14,color:'#999999',marginLeft:12,}}>¥{info.marketPrice}</Text>
          </View>
          <View style={{flexDirection:'row',}}>
            <View style={{flexDirection:'row',flex:0.5,}}>
              <Text style={{fontSize:14,color:'#999999',}}>快递：{shippingFee.is_shipping=='1'?'免邮':shippingFee.shipping_fee}</Text>
              <Text style={{fontSize:14,color:'#999999',marginLeft:30}}>销量：{shippingFee.sales_volume}件</Text>
            </View>
            <Text style={{fontSize:14,color:'#999999',flex:0.5,textAlign:'right',}}>{store.self_run==0?'自营':'其他'}</Text>
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
          {selected}
          {speView}
          <View style={{flexDirection:'row',justifyContent:'space-between',
            marginHorizontal:12,paddingVertical:12,
            borderBottomWidth:1,borderColor:'#e5e5e5',
          }}>
            <Text style={{fontSize:14,color:'#999999',}}>数量</Text>
            <View>
              <TouchableOpacity onPress={this._minus} style={{width:44,height:44}}><Text>-</Text></TouchableOpacity>
              <Text>{this.state.number}</Text>
              <TouchableOpacity onPress={this._plus} style={{width:44,height:44}}><Text>+</Text></TouchableOpacity>
            </View>
          </View>
          <View style={{marginHorizontal:12,paddingVertical:12,borderBottomWidth:1,borderColor:'#e5e5e5',}}>
            <Text style={{fontSize:14,color:'#999999',}}>评价（{comment_all.allmen}）</Text>
          </View>
          {self_run}
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
        
        <WebView 
          source={{ uri: info.goods_desc}} 
          originWhitelist={['*']} 
          injectedJavaScript={BaseScript}
          onMessage={this.onMessage.bind(this)}
          style={{width:Dimensions.get('window').width,
            height:400,
          }}
        />
        <Modal visible={this.state.visibleModal} 
          transparent={false}
          style={{backgroundColor:'black',}}
          onRequestClose={() => {
          }}>
          <View style={{alignItems:'flex-end',backgroundColor:'black',}}>
              <TouchableHighlight style={{marginTop:44,width:44,height:44,alignItems:'center',justifyContent:'center'}}
                onPress={() => {
                  this.setState({visibleModal: false});
                }}>
                <Text style={{color:'white',fontSize:40,}}>X</Text>
              </TouchableHighlight>
            </View>
          <ImageZoom style={{backgroundColor:'black',}}
            cropWidth={Dimensions.get('window').width}
            cropHeight= {Dimensions.get('window').height-66}
            imageWidth={Dimensions.get('window').width}
            imageHeight={Math.floor(Dimensions.get('window').width * 564/750)}
            tintColor={'black'}>
            <Image style={{
              width:Dimensions.get('window').width,
              height:Math.floor(Dimensions.get('window').width * 564/750)
            }}
              source={{uri:this.state.img_url}}/>
          </ImageZoom>
        </Modal>
      </ScrollView>
      <View style={{marginTop:50,flexDirection:'row',}}>
          <View style={{alignItems:'center',flex:0.2,}}>
            <Image source={require('../assets/images/05商品/收藏选中.png')}/>
            <Text>收藏</Text>
          </View>
          <TouchableOpacity style={{alignItems:'center',flex:0.2,}} onPress={this._cart}>
            <Image source={require('../assets/images/05商品/购物车.png')}/>
            <Text>购物车</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={{backgroundColor:'#e58810',flex:0.3,alignItems:'center',justifyContent:'center'}}
            onPress={this._addToCart}>
            <Text style={{fontSize:19,color:'#fff'}}>加入购物车</Text>
          </TouchableOpacity>
          <View style={{backgroundColor:'#ff8f00',flex:0.3,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:19,color:'#fff'}}>立即购买</Text>
          </View>
        </View>
        
      </View>
    );
  }

  _store = async () => {
    this.props.navigation.navigate('Store');
  };

  _cart = async () => {
    this.props.navigation.navigate('Cart');
  };

  _comment = async () => {
  	const { navigation } = this.props;
    let goods_id = navigation.getParam('goods_id');
    this.props.navigation.navigate('GoodsDetailComment',{
      'goods_id':goods_id,
      'good_comment':this.state.good_comment,
      'comment_all':this.state.comment_all,
    });
  };

  _customerService = async() => {
      //Linking为RN自带的组件
     let url = "mqqwpa://im/chat?chat_type=wpa&uin=87023264";//调用QQ
     //let url = "tel: 电话号码";//调用拨号
     Linking.canOpenURL(url).then(supported => {
         if (supported) {
             Linking.openURL(url);
         }
     });
  };

  _addToCart = async () => {
    //{"Action":"AddToCart","token":"2e6b88dbbf93a4d6095bdea691f6da87",
    //"spec":"110","goods_id":"147","store_id":"0","number":"1","parent":"0"}
    const { navigation } = this.props;
    let goods_id = navigation.getParam('goods_id');
    const userToken = await AsyncStorage.getItem('userToken');
    var data = {
      'Action':'AddToCart',
      'token':userToken,
      'good_id': goods_id,
      'number':this.state.number,
      'spec': this.state.selected.combstr,
      'store_id':0,//this.state.info.seller_id,
    };
    console.log(data);
    let responseJson = await ApiPost(data);
    //console.log(responseJson);
    if(responseJson.Result){
      Alert.alert(
        '添加购物车',
        responseJson.MessageString,
        [
          {text: '确定', onPress: () => {
            console.log(responseJson);
            //this.props.navigation.pop();
          }},
        ],
        { cancelable: false }
      )
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
