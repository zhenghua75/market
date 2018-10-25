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
   } from 'react-native';

import Swiper from 'react-native-swiper';
import ImageZoom from 'react-native-image-pan-zoom';

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
    visibleModal: false,
    img_url:'',
  };

  _getGoods=async (goods_id) =>{
    try {
      let response = await fetch(
        'http://jc.ynweix.com/api.php?app_key=E6E3D813-4809-4C98-8D34-A14C7C493A7C&method=dsc.goods.info.get&format=json&goods_id='+goods_id
      );
      let responseJson = await response.json();
      if(responseJson.error > 1){
        throw responseJson;
      }
      let info = responseJson.info;
      this.setState({info:info, });
    } catch (error) {
      console.error(error);
    }
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
    this._getGoodsGallery(goods_id);
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

  render() {
    let info = this.state.info;
    let swiper = null;
    let modal = null;
    
    if (this.state.visibleSwiper) {
      swiper = <Swiper style={styles.wrapper} dotColor={'#999999'} activeDotColor={'#ff8f00'} 
        width={Dimensions.get('window').width}
        height={Math.floor(Dimensions.get('window').width * 564/750)}
        removeClippedSubviews={false}
        autoplay={true}>
        {this.state.list.map((item, key) => {
          return (
            <TouchableOpacity key={key} onPress={() => this._modal(item.img_url)}>
              <Image source={{uri:'http://jc.ynweix.com/'+item.img_url}} style={{
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
          <Text style={{fontSize:16,color:'#3f3f3f',}}>商品</Text>
          <Text style={{fontSize:16,color:'#ff8f00',}}>评论</Text>
        </View>
        {swiper}
        <View style={{padding:12,}}>
          <Text style={{fontSize:16,color:'#3f3f3f',}}>{info.goods_name}</Text>
          <View style={{flexDirection:'row',alignItems:'center',marginTop:26,}}>
            <Text style={{fontSize:19,color:'#ff8f00',}}>¥{info.market_price}</Text>
            <Text style={{fontSize:14,color:'#999999',marginLeft:12,}}>¥{info.shop_price}</Text>
          </View>
          <View style={{flexDirection:'row',}}>
            <View style={{flexDirection:'row',flex:0.5,}}>
              <Text style={{fontSize:14,color:'#999999',}}>快递：{info.is_shipping=='1'?'免邮':info.shipping_fee}</Text>
              <Text style={{fontSize:14,color:'#999999',marginLeft:30}}>销量：{info.sales_volume}件</Text>
            </View>
            <Text style={{fontSize:14,color:'#999999',flex:0.5,textAlign:'right',}}>{info.user_id=='0'?'自营':'其他'}</Text>
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
            <Text style={{fontSize:14,color:'#999999',}}>评价（0）</Text>
          </View>
          <View style={{flexDirection:'row',padding:12,}}>
            <View style={{backgroundColor:'#ff8f00',width:33,height:33,}}/>
            <Text style={{fontSize:18,color:'#3f3f3f',marginLeft:7,}}>王五的五金店</Text>
          </View>
          <View style={{flexDirection:'row',padding:12,}}>
            <View style={{alignItems:'center',flex:0.33}}>
              <Text style={{fontSize:16,color:'#3f3f3f',}}>331</Text>
              <Text style={{fontSize:14,color:'#888888',marginTop:7}}>全部</Text>
            </View>
            <View style={{width:1,height:50,backgroundColor:'#e5e5e5',}}/>
            <View style={{alignItems:'center',flex:0.33}}>
              <Text style={{fontSize:16,color:'#3f3f3f',}}>331</Text>
              <Text style={{fontSize:14,color:'#888888',marginTop:7}}>新品</Text>
            </View>
            <View style={{width:1,height:50,backgroundColor:'#e5e5e5',}}/>
            <View style={{alignItems:'center',flex:0.33}}>
              <Text style={{fontSize:16,color:'#3f3f3f',}}>331</Text>
              <Text style={{fontSize:14,color:'#888888',marginTop:7}}>促销</Text>
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
        <Image source={require('../assets/images/05商品/detail.png')} style={{
          width:Dimensions.get('window').width,
          height:Math.floor(Dimensions.get('window').width * 1591/750),
        }}/>
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
          <View style={{backgroundColor:'#e58810',flex:0.3,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:19,color:'#fff'}}>加入购物车</Text>
          </View>
          <View style={{backgroundColor:'#ff8f00',flex:0.3,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:19,color:'#fff'}}>立即购买</Text>
          </View>
        </View>
        <Modal visible={this.state.visibleModal} transparent={false}
          onRequestClose={() => {
          }}>
          <View style={{marginTop: 22}}>
            <View style={{justifyContent:'flex-end',}}>
              <TouchableHighlight style={{width:44,height:44,alignItems:'center',justifyContent:'center'}}
                onPress={() => {
                  this.setState({visibleModal: !this.state.visibleModal});
                }}>
                <Text style={{color:'white'}}>X</Text>
              </TouchableHighlight>
            </View>
          </View>
          <ImageZoom 
            cropWidth={Dimensions.get('window').width}
            cropHeight= {Dimensions.get('window').height}
            imageWidth={Dimensions.get('window').width}
            imageHeight={Math.floor(Dimensions.get('window').width * 564/750)}>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
