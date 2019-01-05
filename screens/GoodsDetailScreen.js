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
  Platform,
  AsyncStorage,
  Alert,
  Linking,
  FlatList,
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
  static navigationOptions = ({navigation}) => ({
    headerTitle:<View style={{flexDirection:'row',justifyContent:'center',alignItems:'stretch',
        flex:1,alignSelf:'stretch',}}>
        <View style={{borderBottomColor:'#FF8928',borderBottomWidth:3,justifyContent:'center'}}>
            <Text style={{color:'#FF8928',fontSize:18,paddingTop:3}}>商品</Text>
        </View>
        <TouchableOpacity style={{paddingLeft:30,justifyContent:'center'}} 
            onPress={()=>navigation.state.params.onComment()}>
            <Text style={{color:'#444444',fontSize:18}}>评论</Text>
        </TouchableOpacity>
        </View>,
  });

  state={
    'info':{},
    'list':[],
    'visibleSwiper': false,
    'shippingFee':{},
    visibleModalPic: false,
    visibleModalSpe: false,
    visibleModalPro: false,
    visibleModalCart: false,
    visibleModalBuy: false,
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
    pro:[],
    specprice:[],
    selectedSpe:'',
    selectedPrice:{product_id:0,combstr:'',attr_number:'',shop_price:0,market_price:0},
    number:1,
    goodCollect:0,
    cartNumber:0,
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
    let proplist=responseJson.Data.properties;
    let defselected={
        product_id:0,
        combstr:responseJson.Data.good.default_spe_comstr,
        attr_number:responseJson.Data.good.goods_number,
        shop_price:responseJson.Data.good.shop_price,
        market_price:responseJson.Data.good.marketPrice,
    }
    for (let i = 0; i < proplist.specprice.length; i++) {
        if(responseJson.Data.good.default_spe_comstr==proplist.specprice[i].combstr){
            defselected=proplist.specprice[i];
        }
    }
    this.setState({
      info:responseJson.Data.good,
      html:responseJson.Data.good.goods_desc,
      list: responseJson.Data.good.pictures,
      shippingFee: responseJson.Data.shippingFee,
      store: responseJson.Data.store,
      comment_all: responseJson.Data.comment_all,
      good_comment: responseJson.Data.good_comment,
      spe: responseJson.Data.properties.spe,
      pro: responseJson.Data.properties.pro,
      specprice: responseJson.Data.properties.specprice,
      selectedSpe: responseJson.Data.properties.default_spe_comstr,
      selectedPrice: defselected,
      goodCollect:responseJson.Data.goods_collect,
      cartNumber:responseJson.Data.cart_num,
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
  }

  componentDidMount() {
    this.props.navigation.setParams({
        onComment: () => this._comment(),
    });
    setTimeout(() => {
      this.setState({
        visibleSwiper: true
      });
    }, 100);
  }

  _modal = (img_url) => {
    this.setState({visibleModalPic:true, img_url:img_url});
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
        this.setState({curprice:this.state.specprice[i]});
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

  _keyExtractor = (item, index) => 'item'+index;

  _createListItem = ({item}) => {
    if(item.type=='img'){
        return(
          <View style={{paddingVertical:12}}>
            <Image source={{uri:item.content}} style={{
                width:Dimensions.get('window').width-24,
                height:Math.floor((Dimensions.get('window').width-24) * 472/702),
            }}/>
          </View>
        );
    }else{
        return (
          <View style={{paddingVertical:12}}>
            <Text style={{fontSize:14,color:'#616161',lineHeight:20}}>{item.content}</Text>
          </View>
        );
    }
  }

  render() {
    console.log(this.state.selectedPrice);
    let info = this.state.info;
    let swiper = null;
    let shippingFee = this.state.shippingFee;
    let store = this.state.store;
    let comment_all = this.state.comment_all;
    let good_comment = this.state.good_comment;
    let spe = this.state.spe;
    let specprice = this.state.specprice;
    let pro = this.state.pro;

    let speView = <View style={styles.specialWapper}>
      {spe.map((item, key) => {
        let sub = item.values.map((item2, key2)=>{
          let bgcolor=item2.checked=='1'?'#ff8f00':'#eeeeee';
          let ftcolor=item2.checked=='1'?'#ffffff':'#777777';
          return (
            <TouchableOpacity 
                key={item2.id}
                style={{borderWidth:1,borderColor:'#eeeeee',padding:5,marginLeft:10,backgroundColor:bgcolor}} 
                onPress={() => this._speSelected(item2.id)}>
                <Text style={{color:ftcolor}}>{item2.label}</Text>
            </TouchableOpacity>
          )});
        return (
            <View key={item.attr_id}>
                <Text>{item.name}</Text>
                <View style={styles.specialItem}>{sub}</View>
            </View>)
      } )}
    </View>;

    let commentOne=<View style={{marginTop:10}}></View>;
    if(good_comment && good_comment.length>0){
        commentOne=<View style={{marginTop:10}}>
            <View style={{flexDirection:'row',paddingVertical:10,alignItems:'center'}}>
              <Image source={{uri: good_comment[0].user_picture}} style={{width:30,height:30,borderRadius:15}}/>
              <Text style={{fontSize:14,color:'#888888',paddingLeft:20}}>{good_comment[0].username}</Text>
            </View>
            <Text style={{fontSize:14,lineHeight:20,maxHeight:40}}>{good_comment[0].content}</Text>
        </View>;
    }
    
    if(!pro || pro.length==0){
        pro=[{'name':'','value':'暂无任何参数'}];
    }

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
        <View style={{flexDirection:'row',padding:12,alignItems:'center'}}>
          <Image source={{uri:store.logo_thumb}} style={{width:60,height:50,}}/>
          <Text style={{fontSize:18,color:'#3f3f3f',marginLeft:10,flex:1}}>{store.shop_name}</Text>
          <TouchableOpacity onPress={this._store} style={{padding:5,borderWidth:1,borderColor:'#ff8f00'}}>
            <Text style={{fontSize:14,color:'#999999'}}>进店逛逛</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row',padding:12,}}>
          <View style={{alignItems:'center',flex:0.33}}>
            <View style={{flexDirection:'row'}}>
                <Text style={{fontSize:14,color:'#3f3f3f',}}>{store.commentad.Rank.score}分</Text>
                <Text style={{fontSize:14,color:'#fff',paddingHorizontal:3,paddingVertical:1,
                    borderWidth:1,borderRadius:12,backgroundColor:'#F77255',borderColor:'#F77255'}}>
                    {store.commentad.Rank.commentRank}</Text>
            </View>
            <Text style={{fontSize:14,color:'#888888',marginTop:7}}>商品</Text>
          </View>
          <View style={{width:1,height:50,backgroundColor:'#e5e5e5',}}/>
          <View style={{alignItems:'center',flex:0.33}}>
            <View style={{flexDirection:'row'}}>
                <Text style={{fontSize:14,color:'#3f3f3f',}}>{store.commentad.Server.score}分</Text>
                <Text style={{fontSize:14,color:'#fff',paddingHorizontal:3,paddingVertical:1,
                    borderWidth:1,borderRadius:12,backgroundColor:'#ff8f00',borderColor:'#ff8f00'}}>
                    {store.commentad.Server.commentServer}</Text>
            </View>
            <Text style={{fontSize:14,color:'#888888',marginTop:7}}>服务</Text>
          </View>
          <View style={{width:1,height:50,backgroundColor:'#e5e5e5',}}/>
          <View style={{alignItems:'center',flex:0.33}}>
            <View style={{flexDirection:'row'}}>
                <Text style={{fontSize:14,color:'#3f3f3f',}}>{store.commentad.Delivery.score}分</Text>
                <Text style={{fontSize:14,color:'#fff',paddingHorizontal:3,paddingVertical:1,
                    borderWidth:1,borderRadius:12,backgroundColor:'#74EE62',borderColor:'#74EE62'}}>
                    {store.commentad.Delivery.commentDelivery}</Text>
            </View>
            <Text style={{fontSize:14,color:'#888888',marginTop:7}}>时效</Text>
          </View>
        </View>
      </View>;
    }

    let customerService = <TouchableOpacity style={{alignItems:'center',flex:0.14,}} onPress={this._customerService}>
            <Image source={require('../assets/images/05商品/客服.png')}/>
            <Text>客服</Text>
          </TouchableOpacity>;

    let collect = <Image source={require('../assets/images/05商品/收藏.png')}/>;
    if(this.state.goodCollect>0){
        collect = <Image source={require('../assets/images/05商品/收藏选中.png')}/>;
    }

    let cartspan=null;
    if(this.state.cartNumber>0){
        cartspan = <Text style={{position:'absolute',top:0,right:8,backgroundColor:'#FF8928',color:'#fff',
        paddingHorizontal:5,paddingVertical:1,borderRadius:10,fontSize:12}}>{this.state.cartNumber}</Text>;
    }

    return (
      <View style={styles.container}>
        <ScrollView style={{flex:1,}}>
            {swiper}
            <View style={{padding:12,backgroundColor:'#ffffff'}}>
                <Text style={{fontSize:16,color:'#000000',lineHeight:26}}>{info.goods_name}</Text>
                <View style={{marginTop:10}}>
                    <Text style={{fontSize:20,color:'#ff8f00',lineHeight:20}}>¥{this.state.selectedPrice.shop_price}</Text>
                    <Text style={{fontSize:14,color:'#999999',lineHeight:16}}>市场价 ¥{this.state.selectedPrice.market_price}</Text>
                </View>
                <View style={{flexDirection:'row',marginTop:10,}}>
                    <Text style={{flex:1,fontSize:14,color:'#999999',}}>快递：{info.is_shipping=='1'?'免邮':shippingFee.shipping_fee}</Text>
                    <Text style={{flex:1,fontSize:14,color:'#999999',textAlign:'center',}}>销量：{info.sale_count}</Text>
                    <Text style={{flex:1,fontSize:14,color:'#999999',textAlign:'right',}}>{store.self_run==0?'自营':'店铺'}</Text>
                </View>
            </View>
            <View style={{marginTop:14,backgroundColor:'#ffffff'}}>
                <TouchableOpacity style={{flexDirection:'row',justifyContent:'flex-start',
                    marginHorizontal:12,paddingVertical:12,
                    borderBottomWidth:1,borderColor:'#e5e5e5',
                }} onPress={()=>{this.setState({visibleModalSpe:true})}}>
                    <Text style={{fontSize:14,color:'#999999',}}>规格</Text>
                    <Text style={{fontSize:14,color:'#616161',paddingLeft:20,flex:1}}>{info.default_spe}</Text>
                    <Image source={require('../assets/images/04订单/右箭头.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',
                    marginHorizontal:12,paddingVertical:12,
                }} onPress={()=>{this.setState({visibleModalPro:true})}}>
                    <Text style={{fontSize:14,color:'#999999',}}>参数</Text>
                    <Text style={{fontSize:14,color:'#616161',paddingLeft:20,flex:1}}>{info.default_pro}</Text>
                    <Image source={require('../assets/images/04订单/右箭头.png')} />
                </TouchableOpacity>
            </View>
            <View style={{marginTop:14,backgroundColor:'#ffffff'}}>
                <TouchableOpacity style={{marginHorizontal:12,paddingVertical:12,}} onPress={this._comment}>
                    <View style={{flexDirection:'row',justifyContent:'flex-start',}}>
                        <Text style={{fontSize:14,color:'#999999',flex:1}}>商品评价（{comment_all.allmen}）</Text>
                        <Image source={require('../assets/images/04订单/右箭头.png')} />
                    </View>
                    {commentOne}
                </TouchableOpacity>
            </View>
            <View style={{marginTop:14,backgroundColor:'#ffffff'}}>
                {self_run}
            </View>
            <View style={{marginTop:14,paddingBottom:20,backgroundColor:'#ffffff',justifyContent:'center',alignItems:'center'}}>
                <View style={{alignItems:'center',backgroundColor:'#eeeeee',alignSelf:'stretch'}}>
                    <Text style={{fontSize:16,paddingBottom:14,color:'#666666'}}>----商品详情----</Text>
                </View>
                <FlatList
                    data={info.desc_list}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._createListItem}
                    style={{paddingHorizontal:12,}}
                />
            </View>

            <Modal animationType="slide" visible={this.state.visibleModalSpe} 
                transparent={true} onRequestClose={() => { }}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalInner} width={Dimensions.get('window').width}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalGoodInfo}>
                                <Image style={{width:150,height:180}} source={{uri:info.goods_thumb}}/>
                                <View style={styles.modalGoodPrice}>
                                    <Text style={{fontSize:20,color:'#ff8f00',lineHeight:30}}>¥{this.state.selectedPrice.shop_price}</Text>
                                    <Text style={{fontSize:14,color:'#888888',lineHeight:20}}>库存：{this.state.selectedPrice.attr_number}</Text>
                                </View>
                                <TouchableOpacity style={{position:'absolute',top:0,right:0}} 
                                    onPress={() => {this.setState({visibleModalSpe:false});}}>
                                    <Image source={require('../assets/images/05商品/关闭.png')}/>
                                </TouchableOpacity>
                            </View>
                            {speView}
                            <View style={styles.buyCountWapper}>
                                <Text style={{fontSize:14,}}>购买数量</Text>
                                <View style={styles.buyCount}>
                                    <TouchableOpacity onPress={this._minus} 
                                        style={{backgroundColor:'#eeeeee',height:30,width:30,justifyContent:'center',alignItems:'center'}}>
                                        <Text style={{fontSize:14}}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={{fontSize:14,backgroundColor:'#eeeeee',textAlign:'center',textAlignVertical:'center',
                                        height:30,width:30,marginLeft:3}}>
                                        {this.state.number}</Text>
                                    <TouchableOpacity onPress={this._plus} 
                                        style={{backgroundColor:'#eeeeee',height:30,width:30,marginLeft:3,justifyContent:'center',alignItems:'center'}}>
                                        <Text style={{fontSize:14}}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.modalBottom,{flexDirection:'row',padding:5,marginBottom:10,}]}>
                            <TouchableHighlight style={{backgroundColor:'#FCC418',height:36,
                                justifyContent:'center',alignItems:'center',flex:0.5,padding:3,
                                borderTopLeftRadius:15,borderBottomLeftRadius:15}}
                                onPress={()=>{this._addToCart('spe',0)}}>
                                <Text style={{fontSize:16,color:'#fff',lineHeight:30}}>加入购物车</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={{backgroundColor:'#FF7300',height:36,
                                justifyContent:'center',alignItems:'center',flex:0.5,padding:3,
                                borderTopRightRadius:15,borderBottomRightRadius:15}}
                                onPress={()=>{this._addToCart('spe',10)}}>
                                <Text style={{fontSize:16,color:'#fff',lineHeight:30}}>立即购买</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal animationType="slide" visible={this.state.visibleModalCart} 
                transparent={true} onRequestClose={() => { }}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalInner} width={Dimensions.get('window').width}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalGoodInfo}>
                                <Image style={{width:150,height:180}} source={{uri:info.goods_thumb}}/>
                                <View style={styles.modalGoodPrice}>
                                    <Text style={{fontSize:20,color:'#ff8f00',lineHeight:30}}>¥{this.state.selectedPrice.shop_price}</Text>
                                    <Text style={{fontSize:14,color:'#888888',lineHeight:20}}>库存：{this.state.selectedPrice.attr_number}</Text>
                                </View>
                                <TouchableOpacity style={{position:'absolute',top:0,right:0}} 
                                    onPress={() => {this.setState({visibleModalCart:false});}}>
                                    <Image source={require('../assets/images/05商品/关闭.png')}/>
                                </TouchableOpacity>
                            </View>
                            {speView}
                            <View style={styles.buyCountWapper}>
                                <Text style={{fontSize:14,}}>购买数量</Text>
                                <View style={styles.buyCount}>
                                    <TouchableOpacity onPress={this._minus} 
                                        style={{backgroundColor:'#eeeeee',height:30,width:30,justifyContent:'center',alignItems:'center'}}>
                                        <Text style={{fontSize:14}}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={{fontSize:14,backgroundColor:'#eeeeee',textAlign:'center',textAlignVertical:'center',
                                        height:30,width:30,marginLeft:3}}>
                                        {this.state.number}</Text>
                                    <TouchableOpacity onPress={this._plus} 
                                        style={{backgroundColor:'#eeeeee',height:30,width:30,marginLeft:3,justifyContent:'center',alignItems:'center'}}>
                                        <Text style={{fontSize:14}}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.modalBottom}>
                            <TouchableHighlight style={{backgroundColor:'#ff8f00',height:38,
                                justifyContent:'center',alignItems:'center'}}
                                onPress={()=>{this._addToCart('cart',0)}}>
                                <Text style={{fontSize:16,color:'#fff',lineHeight:30}}>确定</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal animationType="slide" visible={this.state.visibleModalBuy} 
                transparent={true} onRequestClose={() => { }}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalInner} width={Dimensions.get('window').width}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalGoodInfo}>
                                <Image style={{width:150,height:180}} source={{uri:info.goods_thumb}}/>
                                <View style={styles.modalGoodPrice}>
                                    <Text style={{fontSize:20,color:'#ff8f00',lineHeight:30}}>¥{this.state.selectedPrice.shop_price}</Text>
                                    <Text style={{fontSize:14,color:'#888888',lineHeight:20}}>库存：{this.state.selectedPrice.attr_number}</Text>
                                </View>
                                <TouchableOpacity style={{position:'absolute',top:0,right:0}} 
                                    onPress={() => {this.setState({visibleModalBuy:false});}}>
                                    <Image source={require('../assets/images/05商品/关闭.png')}/>
                                </TouchableOpacity>
                            </View>
                            {speView}
                            <View style={styles.buyCountWapper}>
                                <Text style={{fontSize:14,}}>购买数量</Text>
                                <View style={styles.buyCount}>
                                    <TouchableOpacity onPress={this._minus} 
                                        style={{backgroundColor:'#eeeeee',height:30,width:30,justifyContent:'center',alignItems:'center'}}>
                                        <Text style={{fontSize:14}}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={{fontSize:14,backgroundColor:'#eeeeee',textAlign:'center',textAlignVertical:'center',
                                        height:30,width:30,marginLeft:3}}>
                                        {this.state.number}</Text>
                                    <TouchableOpacity onPress={this._plus} 
                                        style={{backgroundColor:'#eeeeee',height:30,width:30,marginLeft:3,justifyContent:'center',alignItems:'center'}}>
                                        <Text style={{fontSize:14}}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.modalBottom}>
                            <TouchableHighlight style={{backgroundColor:'#ff8f00',height:38,
                                justifyContent:'center',alignItems:'center'}}
                                onPress={()=>{this._addToCart('buy',10)}}>
                                <Text style={{fontSize:16,color:'#fff',lineHeight:30}}>确定</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal animationType="slide" visible={this.state.visibleModalPro} 
                transparent={true}
                onRequestClose={() => { }}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalInner} width={Dimensions.get('window').width}>
                        <View style={styles.modalTitle}>
                            <Text style={{fontSize:16}}>商品参数</Text>
                        </View>
                        <View style={styles.modalContent}>
                            {pro.map((item, key) => {
                                return (
                                    <View key={key} style={styles.modalItem}>
                                        <Text style={{fontSize:14,width:80,}}>{item.name}</Text>
                                        <Text style={{fontSize:14,paddingLeft:20,color:'#888888'}}>{item.value}</Text>
                                    </View>
                                );
                            })}
                        </View>
                        <View style={styles.modalBottom}>
                            <TouchableHighlight style={{backgroundColor:'#ff8f00',height:38,
                                justifyContent:'center',alignItems:'center'}}
                                onPress={() => {this.setState({visibleModalPro:false});}}>
                                <Text style={{fontSize:16,color:'#fff',lineHeight:30}}>关闭</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal visible={this.state.visibleModalPic} 
                transparent={false}
                style={{backgroundColor:'black',}}
                onRequestClose={() => { }}>
                <View style={{alignItems:'flex-end',backgroundColor:'black',}}>
                    <TouchableHighlight style={{marginTop:44,width:44,height:44,alignItems:'center',justifyContent:'center'}}
                        onPress={() => {
                        this.setState({visibleModalPic: false});
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
        <View style={{flexDirection:'row',padding:3,alignItems:'center'}}>
          <TouchableOpacity style={{alignItems:'center',flex:0.2,padding:3}}
            onPress={this._changeGoodCollect}>
            {collect}
            <Text style={{fontSize:14,}}>收藏</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems:'center',flex:0.2,padding:3}} onPress={this._cart}>
            <Image source={require('../assets/images/05商品/购物车.png')}/>
            {cartspan}
            <Text style={{fontSize:14,}}>购物车</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor:'#FCC418',flex:0.3,alignItems:'center',height:34,
                justifyContent:'center',padding:3,borderTopLeftRadius:15,borderBottomLeftRadius:15}}
                onPress={()=>{this.setState({visibleModalCart:true})}}>
            <Text style={{fontSize:14,color:'#fff'}}>加入购物车</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor:'#FF7300',flex:0.3,alignItems:'center',height:34,
            justifyContent:'center',padding:3,borderTopRightRadius:15,borderBottomRightRadius:15}}
            onPress={()=>{this.setState({visibleModalBuy:true})}}>
            <Text style={{fontSize:14,color:'#fff'}}>立即购买</Text>
          </TouchableOpacity>
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

  _settlement = async (carttype) => {
    this.props.navigation.navigate('Settlement',{'carttype':carttype});
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

  _addToCart = async (modaltype,carttype) => {
    const { navigation } = this.props;
    let goods_id = navigation.getParam('goods_id');
    const userToken = await AsyncStorage.getItem('userToken');
    var data = {
      'Action':'AddToCart',
      'token':userToken,
      'good_id': goods_id,
      'number':this.state.number,
      'spec': this.state.selectedPrice.combstr,
      'store_id':0,
      'parent':0,
      'cart_type':carttype
    };
    let responseJson = await ApiPost(data);
    if(responseJson.Result){
      if(modaltype=='cart'){
        Alert.alert(
            '添加购物车',
            responseJson.MessageString,
            [
              {text: '确定', onPress: () => {
                // console.log(responseJson);
              }},
            ],
            { cancelable: false }
        );
        this.setState({
            visibleModalCart:false,
            cartNumber:responseJson.Data.goods_number
        });
      }else if(modaltype=='spe'){
        if(carttype==0){
            Alert.alert(
                '添加购物车',
                responseJson.MessageString,
                [
                  {text: '确定', onPress: () => {
                    // console.log(responseJson);
                  }},
                ],
                { cancelable: false }
              );
            this.setState({
                visibleModalSpe:false,
                cartNumber:responseJson.Data.goods_number
            });
        }else{
            this.setState({
                visibleModalSpe:false,
            });
            this._settlement(10);
        }
      }else{
        this.setState({
            visibleModalBuy:false,
        });
        this._settlement(10);
      }
    }
  };

  _changeGoodCollect = async () => {
    const { navigation } = this.props;
    let goods_id = navigation.getParam('goods_id');
    const userToken = await AsyncStorage.getItem('userToken');
    var data = {
      'Action':'ChangeGoodsCollection',
      'token':userToken,
      'good_id': goods_id,
    };
    let responseJson = await ApiPost(data);
    if(responseJson.Result){
      this.setState({
          goodCollect:responseJson.Data.good_collect,
      })
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  modalContainer:{
    flex:1,
    justifyContent:'center',
    backgroundColor:'rgba(0, 0, 0, 0.5)',
  },
  modalInner:{
    position:'absolute',
    bottom:0,
    backgroundColor:'#fff',
    borderRadius:10,
    alignItems:'stretch',
  },
  modalTitle:{
    padding:20,
    alignItems:'center',
  },
  modalContent:{
    flex:1,
    alignItems:'stretch',
    padding:12,
  },
  modalItem:{
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-start',
    borderBottomWidth:1,
    borderColor:'#eeeeee',
    padding:12,
    paddingVertical:15,
  },
  modalBottom:{
    marginTop:30,
  },
  modalGoodInfo:{
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-start',
    borderBottomWidth:1,
    borderColor:'#eeeeee',
  },
  modalGoodPrice:{
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    paddingLeft:20,
  },
  specialWapper:{
    flex:1,
    flexDirection:'column',
    paddingVertical:10,
    borderBottomWidth:1,
    borderColor:'#eeeeee',
  },
  specialItem:{
    flex:1,
    flexDirection:'row',
    flexWrap:'wrap',
    marginTop:10,
  },
  buyCountWapper:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    paddingVertical:15,
    borderBottomWidth:1,
    borderColor:'#eeeeee',
  },
  buyCount:{
    flex:1,
    flexDirection:'row',
    alignSelf:'stretch',
    justifyContent:'flex-end',
    alignItems:'center',
  }
});
