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
    height:0,
    'store':{},
  };

  //单个商品：{"Action":"GetGoodInfo","good_id":"1","token":"2e6b88dbbf93a4d6095bdea691f6da87"}
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

  render() {
    let info = this.state.info;
    let swiper = null;
    let modal = null;
    let shippingFee = this.state.shippingFee;
    let store = this.state.store;

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
    return (
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
          <View style={{marginHorizontal:12,paddingVertical:12,borderBottomWidth:1,borderColor:'#e5e5e5',}}>
            <Text style={{fontSize:14,color:'#999999',}}>评价（{info.comments_number}）</Text>
          </View>
          <View style={{flexDirection:'row',padding:12,}}>
            <View style={{backgroundColor:'#ff8f00',width:33,height:33,}}/>
            <Text style={{fontSize:18,color:'#3f3f3f',marginLeft:7,}}>{store.shop_name}</Text>
          </View>
          <View style={{flexDirection:'row',padding:12,}}>
            <View style={{alignItems:'center',flex:0.33}}>
              <Text style={{fontSize:16,color:'#3f3f3f',}}>5分</Text>
              <Text style={{fontSize:14,color:'#888888',marginTop:7}}>商品</Text>
            </View>
            <View style={{width:1,height:50,backgroundColor:'#e5e5e5',}}/>
            <View style={{alignItems:'center',flex:0.33}}>
              <Text style={{fontSize:16,color:'#3f3f3f',}}>5分</Text>
              <Text style={{fontSize:14,color:'#888888',marginTop:7}}>服务</Text>
            </View>
            <View style={{width:1,height:50,backgroundColor:'#e5e5e5',}}/>
            <View style={{alignItems:'center',flex:0.33}}>
              <Text style={{fontSize:16,color:'#3f3f3f',}}>5分</Text>
              <Text style={{fontSize:14,color:'#888888',marginTop:7}}>新品</Text>
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
        
        <WebView originWhitelist={['*']} 
          source={{ html: '<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/></head><body>'
            +info.goods_desc
            +'<script>'
            +'  function ResizeImages(){'
            +'    var myimg;'
            +'    for(i=0;i <document.images.length;i++){'
            +'      myimg = document.images[i];'
            +'      myimg.width = '+Dimensions.get('window').width+' - 20};'
            +'    }'
            +'  }'
            +'  window.onload=function(){ '
            +'    ResizeImages()'
            +'  }'
            +'  </script>'
            +'</body></html>'}} 
          style={{width:Dimensions.get('window').width,
            height:this.state.height,
            flex: 1,
          }}
          injectedJavaScript={BaseScript}
          onMessage={this.onMessage.bind(this)}
          scalesPageToFit={true}
        />
        <View style={{marginTop:50,flexDirection:'row',}}>
          <View style={{alignItems:'center',flex:0.14,}}>
            <Image source={require('../assets/images/05商品/收藏选中.png')}/>
            <Text>收藏</Text>
          </View>
          <View style={{alignItems:'center',flex:0.14,}}>
            <Image source={require('../assets/images/05商品/购物车.png')}/>
            <Text>购物车</Text>
          </View>
          <View style={{alignItems:'center',flex:0.14,}}>
            <Image source={require('../assets/images/05商品/客服.png')}/>
            <Text>客服</Text>
          </View>
          <TouchableOpacity 
            style={{backgroundColor:'#e58810',flex:0.3,alignItems:'center',justifyContent:'center'}}
            onPress={this._addToCart}>
            <Text style={{fontSize:19,color:'#fff'}}>加入购物车</Text>
          </TouchableOpacity>
          <View style={{backgroundColor:'#ff8f00',flex:0.3,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:19,color:'#fff'}}>立即购买</Text>
          </View>
        </View>
        <Modal visible={this.state.visibleModal} 
        	transparent={false}
        	style={{backgroundColor:'black',}}
          onRequestClose={() => {
          }}>
          <View style={{alignItems:'flex-end',backgroundColor:'black',}}>
              <TouchableHighlight style={{width:44,height:44,alignItems:'center',justifyContent:'center'}}
                onPress={() => {
                  this.setState({visibleModal: !this.state.visibleModal});
                }}>
                <Text style={{color:'white'}}>X</Text>
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
              source={{uri:'http://jc.ynweix.com/'+this.state.img_url}}/>
          </ImageZoom>
        </Modal>
      </ScrollView>
    );
  }

  _store = async () => {
    this.props.navigation.navigate('Store');
  };

  _comment = async () => {
  	const { navigation } = this.props;
    let goods_id = navigation.getParam('goods_id');
    this.props.navigation.navigate('GoodsDetailComment',{'goods_id':goods_id});
  };

  _addToCart = async () => {
    //
    const { navigation } = this.props;
    let goods_id = navigation.getParam('goods_id');
    const userToken = await AsyncStorage.getItem('userToken');
    var data = {
      'Action':'AddToCart',
      'token':userToken,
      'good_id': goods_id,
      'number':'1',
    };
    let responseJson = await ApiPost(data);
    console.log(responseJson);
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
