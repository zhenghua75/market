import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
  ImageBackground,
  AsyncStorage,
} from 'react-native';
import { 
  WebBrowser,
  Icon,
  Constants, 
  Location, 
  Permissions,
} from 'expo';

import { MonoText } from '../components/StyledText';

import Swiper from 'react-native-swiper';

import ApiPost from '../lib/ApiPost';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title:'建材商城',
    headerTitleStyle: {
      alignSelf: 'center',
      textAlign: 'center',
      width: '100%',
    },
  };
  state = {
    location: null,
    city: null,
    errorMessage: null,
    recommendProduct: null,
    'visibleSwiper': false,
  };

  _getRecommendProduct = async () =>{
    const userToken = await AsyncStorage.getItem('userToken');
    const { navigation } = this.props;
    let cat_id = navigation.getParam('cat_id');
    var data = {
      'Action':'GetGoods',
      'token':userToken,
      'PageSize':'10',
      'Page': '0',
      'Cat_id': '',
      'Is_Best':'1',
      'GoodName':'',
    };
    let responseJson = await ApiPost(data);
    let list = responseJson.Data.Data;
    this.setState({recommendProduct:list, });
  };
  componentDidMount() {
   setTimeout(() => {
      this.setState({
        visibleSwiper: true
      });
   }, 100);
  }
  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }

    this._getRecommendProduct();
  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    let longitude = location.coords.longitude;
    let latitude = location.coords.latitude;
    let url = 'https://restapi.amap.com/v3/geocode/regeo?location='+longitude+','+latitude+'&key=f0278b2d0f10f10adbd3e55858f0a2f1';
    let response = await fetch(url,{method: 'POST',});
    let responseJson = await response.json();
    this.setState({ location:location,city:responseJson.regeocode.addressComponent.city });

    //https://restapi.amap.com/v3/config/district?keywords=中国&subdistrict=2&key=f0278b2d0f10f10adbd3e55858f0a2f1
  };
  _detail = async (goods_id) => {
    this.props.navigation.navigate('GoodsDetail',{'goods_id':goods_id});
  };
  render() {
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.city) {
      text = this.state.city
      
    }
    let swiper = null;
    if (this.state.visibleSwiper) {
    
      let list = [];
      if(this.state.recommendProduct && this.state.recommendProduct.length>0){
        
        let len = this.state.recommendProduct.length;
        let n = 2; 
        let lineNum = len % n === 0 ? len / n : Math.floor( (len / n) + 1 );
        let list = [];
        for (let i = 0; i < lineNum; i++) {
          let temp = this.state.recommendProduct.slice(i*n, i*n+n);
          list.push(temp);
        }
        let obj = [];
        for (var i = 0; i < list.length; i++) {

          obj.push(<View key={i} style={{flexDirection:'row',padding:12,}}>
                      {list[i].map((item, key) => {
                        return (
                          <TouchableOpacity key={item.goods_id} 
                            onPress={() => {this._detail(item.goods_id)}}
                            style={{alignItems:'center',justifyContent:'center',marginLeft:12,}}>
                          <Image source={{uri: item.goods_thumb.Data}} style={{ width:Dimensions.get('window').width/2-24,
                            height:Math.floor((Dimensions.get('window').width/2-24) * 208/306),}}/>
                          <Text style={styles.recommendProductName}>{item.goods_name}</Text>
                          <Text style={styles.recommendProductAttr}>材质：大理石</Text>
                      </TouchableOpacity>)})}</View>);
        }

        swiper = <Swiper style={styles.recommendProductSwiper}
            dotColor={'#999999'} activeDotColor={'#ff8f00'} 
            width={Dimensions.get('window').width}
            height={Math.floor(Dimensions.get('window').width * 440/750)}>
              {obj.map((item, key) => {return item;})}
            </Swiper>
      }
    }
    return (
        <ScrollView style={{flex: 1,backgroundColor: 'rgb(229,229,229)',}} contentContainerStyle={styles.contentContainer}>
          <View style={{flex:1,
    flexDirection: 'row',
    justifyContent:'space-between',
    paddingVertical:10,
    height:49,
    backgroundColor:'#fff',}}>
            <TouchableOpacity style={{
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:12,}} onPress={this._catalog}>
              
              <Image source={require('../assets/images/01首页部分/分类.png')} style={{width:12,height:12,}}/>
              <Text style={{
    fontSize:12,
    color:'#888888',}}>分类</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex:1,
    borderRadius:5,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'rgb(242,247,253)',}} onPress={this._search}>
              <Image source={require('../assets/images/01首页部分/搜索.png')} />
              <Text style={{
    fontSize:15,
    color:'#888888',
    textAlign: 'center',
    marginLeft:14,}}>搜索</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center',}}>
              <TouchableOpacity style={{alignItems:'center',justifyContent:'center',height:28,width:52,paddingHorizontal:12}} onPress={this._infoList}>
                <Image source={require('../assets/images/01首页部分/通知.png')} style={{height:16,width:16,}}/>
                <Text style={{
    fontSize:12,
    color:'#888888',}}>消息</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={{backgroundColor:'#fff'}}>
            <Swiper style={styles.wrapper} dotColor={'#999999'} activeDotColor={'#ff8f00'} 
              width={Dimensions.get('window').width}
              height={Math.floor(Dimensions.get('window').width * 458/750)}>
              <View style={styles.slide}>
                <Image source={require('../assets/images/01首页部分/a01首页_02.png')} style={styles.swiperImage}/>
              </View>
              <View style={styles.slide}>
                <Image source={require('../assets/images/01首页部分/a01首页_02.png')} style={styles.swiperImage}/>
              </View>
              <View style={styles.slide}>
                <Image source={require('../assets/images/01首页部分/a01首页_02.png')} style={styles.swiperImage}/>
              </View>
            </Swiper>
            <View style={styles.columnView}>
              <TouchableOpacity style={styles.columnViewItem} onPress={this._secondKill}>
                <View style={{alignItems:'center',justifyContent:'center',borderRadius:22,width:44,height:44,backgroundColor:'rgb(229,229,229)',}}>
                  <Image source={require('../assets/images/01首页部分/秒杀.png')} style={styles.columnViewItemImage}/>
                </View>
                <Text style={styles.columnViewItemText}>秒杀</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.columnViewItem} onPress={this._catalog}>
                <View style={{alignItems:'center',justifyContent:'center',borderRadius:22,width:44,height:44,backgroundColor:'rgb(229,229,229)',}}>
                  <Image source={require('../assets/images/01首页部分/百科.png')} style={styles.columnViewItemImage}/>
                </View>
                <Text style={styles.columnViewItemText}>百科</Text>
              </TouchableOpacity>
              <View style={styles.columnViewItem}>
                <View style={{alignItems:'center',justifyContent:'center',borderRadius:22,width:44,height:44,backgroundColor:'rgb(229,229,229)',}}>
                  <Image source={require('../assets/images/01首页部分/方案.png')} style={styles.columnViewItemImage}/>
                </View>
                <Text style={styles.columnViewItemText}>方案</Text>
              </View>
              <View style={styles.columnViewItem}>
                <View style={{alignItems:'center',justifyContent:'center',borderRadius:22,width:44,height:44,backgroundColor:'rgb(229,229,229)',}}>
                  <Image source={require('../assets/images/01首页部分/附近.png')} style={styles.cloumnViewItemImage}/>
                </View>
                <Text style={styles.columnViewItemText}>附近</Text>
              </View>
            </View>
            <View style={{flexDirection:'row',}}>
              <TouchableOpacity style={{flex:1,margin:10,}} onPress={this._storeIn}>
                <View style={{flex:1,height:36,backgroundColor:'#f2f6fd',borderRadius:1.5,justifyContent:'center',}}>
                  <Text style={{fontSize:14,color:'#3f3f3f',textAlign:'center'}}>商家入驻</Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity style={{flex:1,margin:10,}}>
                <View style={{flex:1,height:36,backgroundColor:'#f2f6fd',borderRadius:1.5,justifyContent:'center',}}>
                  <Text style={{fontSize:14,color:'#3f3f3f',textAlign:'center'}}>施工队入驻</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.recommendShop}>
            <View style={styles.recommendShopTitle}>
              <View style={styles.recommendShopTitleColumnBar}/>
              <Text style={styles.recommendShopTitleText}>品质好店</Text>
              <Icon.Ionicons
                name={'ios-arrow-forward'}
                size={22}
                style={styles.recommendShopTitleArrow}
              />
            </View>
            <View style={{paddingVertical:10,}}>
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <View style={{margin:15,alignItems:'center',}}>
                  <Image source={require('../assets/images/13建材首页/banner.png')} style={{
                    width:Dimensions.get('window').width/2-60,
                    height:Math.floor((Dimensions.get('window').width/2-60) * 208/302),
                  }}/>
                  <Text style={{fontSize:14,color:'#888888',}}>王思聪品质好店</Text>
                </View>

                <View style={{margin:15,alignItems:'center',}}>
                  <Image source={require('../assets/images/13建材首页/banner.png')} style={{
                    width:Dimensions.get('window').width/2-60,
                    height:Math.floor((Dimensions.get('window').width/2-60) * 208/302),
                  }}/>
                  <Text style={{fontSize:14,color:'#888888',}}>王思聪品质好店</Text>
                </View>
              </View>
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <View style={{margin:15,alignItems:'center',}}>
                  <Image source={require('../assets/images/13建材首页/banner.png')} style={{
                    width:Dimensions.get('window').width/2-60,
                    height:Math.floor((Dimensions.get('window').width/2-60) * 208/302),
                  }}/>
                  <Text style={{fontSize:14,color:'#888888',}}>王思聪品质好店</Text>
                </View>

                <View style={{margin:15,alignItems:'center',}}>
                  <Image source={require('../assets/images/13建材首页/banner.png')} style={{
                    width:Dimensions.get('window').width/2-60,
                    height:Math.floor((Dimensions.get('window').width/2-60) * 208/302),
                  }}/>
                  <Text style={{fontSize:14,color:'#888888',}}>王思聪品质好店</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.recommendShop}>
            <View style={styles.recommendShopTitle}>
              <View style={styles.recommendShopTitleColumnBar}/>
              <Text style={styles.recommendShopTitleText}>优秀团队</Text>
              <Icon.Ionicons
                name={'ios-arrow-forward'}
                size={22}
                style={styles.recommendShopTitleArrow}
              />
            </View>
            <View style={{paddingVertical:10,}}>
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <View style={{margin:15,alignItems:'center',}}>
                  <Image source={require('../assets/images/13建材首页/banner.png')} style={{
                    width:Dimensions.get('window').width/2-60,
                    height:Math.floor((Dimensions.get('window').width/2-60) * 208/302),
                  }}/>
                  <Text style={{fontSize:14,color:'#888888',}}>我是施工队名称</Text>
                </View>

                <View style={{margin:15,alignItems:'center',}}>
                  <Image source={require('../assets/images/13建材首页/banner.png')} style={{
                    width:Dimensions.get('window').width/2-60,
                    height:Math.floor((Dimensions.get('window').width/2-60) * 208/302),
                  }}/>
                  <Text style={{fontSize:14,color:'#888888',}}>我是施工队名称</Text>
                </View>
              </View>
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <View style={{margin:15,alignItems:'center',}}>
                  <Image source={require('../assets/images/13建材首页/banner.png')} style={{
                    width:Dimensions.get('window').width/2-60,
                    height:Math.floor((Dimensions.get('window').width/2-60) * 208/302),
                  }}/>
                  <Text style={{fontSize:14,color:'#888888',}}>我是施工队名称</Text>
                </View>

                <View style={{margin:15,alignItems:'center',}}>
                  <Image source={require('../assets/images/13建材首页/banner.png')} style={{
                    width:Dimensions.get('window').width/2-60,
                    height:Math.floor((Dimensions.get('window').width/2-60) * 208/302),
                  }}/>
                  <Text style={{fontSize:14,color:'#888888',}}>我是施工队名称</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{backgroundColor:'#fff',}}>
            <TouchableOpacity onPress={this._decorationStrategyList}>
              <View style={{borderBottomWidth:1,
                borderColor:'rgb(229,229,229)',
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between',
                marginHorizontal:22,
                paddingVertical:22,}}>
                <View style={styles.decorationStrategyTitleColumnBar}/>
                <Text style={styles.decorationStrategyTitleText}>装修攻略</Text>
                <Icon.Ionicons
                  name={'ios-arrow-forward'}
                  size={22}
                />
              </View>
            </TouchableOpacity>
            <View style={{padding:12,backgroundColor:'#fff',}}>
              <View style={{}}>
                <ImageBackground source={require('../assets/images/01首页部分/a01首页_15.png')} style={{
                  width:Dimensions.get('window').width-24,
                  height:Math.floor((Dimensions.get('window').width-24) * 190/349),
                  justifyContent:'flex-end',
                }}>
                  <View style={{height:53,backgroundColor:'rgba(0,0,0,0.5)',}}>
                    <Text style={{
                      fontSize:14,
                      color:'#fff',
                      opacity:1.0,
                      padding:12,
                    }}>祝贺现代大师首家水漆产品通过美国LEED的VOC检测美国LEED的VOC检测</Text>
                  </View>
                </ImageBackground>
              </View>
            </View>
            <View style={{backgroundColor:'#fff',}}>
              <View style={styles.listViewItem}>
                    <View style={styles.listViewItemDot} />
                    <Text style={styles.listViewItemText}>高于生活的艺术从家开始</Text>
                    <Text style={styles.listViewItemDate}>2018-06-26</Text>
                    <Icon.Ionicons
                      name={'ios-arrow-forward'}
                      size={22}
                      style={styles.listViewItemArrow}
                    />
              </View>
              <View style={styles.listViewItem}>
                    <View style={styles.listViewItemDot} />
                    <Text style={styles.listViewItemText}>高于生活的艺术从家开始</Text>
                    <Text style={styles.listViewItemDate}>2018-06-26</Text>
                    <Icon.Ionicons
                      name={'ios-arrow-forward'}
                      size={22}
                      style={styles.listViewItemArrow}
                    />
              </View>
              <View style={styles.listViewItem}>
                    <View style={styles.listViewItemDot} />
                    <Text style={styles.listViewItemText}>高于生活的艺术从家开始</Text>
                    <Text style={styles.listViewItemDate}>2018-06-26</Text>
                    <Icon.Ionicons
                      name={'ios-arrow-forward'}
                      size={22}
                      style={styles.listViewItemArrow}
                    />
              </View>
            </View>
          </View>
          <View style={{marginVertical:11,backgroundColor:'#fff'}}>
            <View style={styles.recommendProductTitle}>
              <View style={styles.recommendProductTitleColumnBar}/>
              <Text style={styles.recommendProductTitleText}>推荐产品</Text>
              <Icon.Ionicons
                name={'ios-arrow-forward'}
                size={22}
                style={styles.recommendProductTitleArrow}
              />
            </View>
            {swiper}
          </View>
          
          </ScrollView>      
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };

  _search = async () => {
    this.props.navigation.navigate('Search');
  };

  _secondKill = async () => {
    this.props.navigation.navigate('SecondKill');
  };

  _catalog = async () => {
    this.props.navigation.navigate('Catalog');
  };
  _infoList = async () => {
    this.props.navigation.navigate('InfoList');
  };
  _user = async () => {
    this.props.navigation.navigate('My');
  };

  _decorationStrategyList = async () => {
    this.props.navigation.navigate('DecorationStrategyList');
  };

  _storeIn = async () => {
    this.props.navigation.navigate('StoreIn');
  };
}

const styles = StyleSheet.create({
  swiperImage:{
    width: Dimensions.get('window').width,
    height: Math.floor(Dimensions.get('window').width * 458/750),
  },
  wrapper: {
    
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnView:{
    width:Dimensions.get('window').width-44,
    height:100,
    marginHorizontal:22,
    marginTop:-20,
    alignItems:'center',
    borderRadius:10,
    backgroundColor:'#ffffff',
    flexDirection:'row',
    borderWidth:1,
    borderColor:'rgb(229,229,229)',
    justifyContent:'space-around',
  },
  columnViewItem:{
    alignItems:'center',
    width:64,
    height:64,
  },
  columnViewItemImage:{
    width:22,
    height:22,
  },
  columnViewItemText:{
    fontSize:13,
    color:'#403f3d'
  },
  recommendShop:{
    marginVertical:11,
    backgroundColor:'#fff',
  },
  recommendShopTitle:{
    borderBottomWidth:1,
    borderColor:'rgb(229,229,229)',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginHorizontal:22,
    paddingVertical:22,
  },
  recommendShopTitleColumnBar:{
    width:4,
    height:20,
    backgroundColor:'red',
    marginRight:22,
  },
  recommendShopTitleText:{
    fontSize:14,
    color:'#888888',
    flex:1,
  },
  recommendShopTitleArrow:{
  },
  recommendShopSwiper:{

  },
  recommendShopSlide:{
    flexDirection:'row',
    justifyContent:'space-around',
    width:Dimensions.get('window').width,
    height:Math.floor(Dimensions.get('window').width * 390/750),
  },
  recommendShopPerson:{
    borderWidth:1,
    borderColor:'#888888',
    marginTop:30,
    alignItems:'center',
  },
  recommendShopPersonImage:{
    width:59,
    height:59,
    borderRadius:30,
    marginTop:-30,
  },
  recommendShopPersonName:{
    fontSize:13,
    color:'#888888',
  },
  recommendShopPersonTextBlock:{
    flexDirection:'row',
  },
  recommendShopPersonText:{
    fontSize:12,
    color:'#c7c7c7',
  },
  recommendProductTitle:{
    borderBottomWidth:1,
    borderColor:'rgb(229,229,229)',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginHorizontal:22,
    paddingVertical:22,
  },
  recommendProductTitleColumnBar:{
    width:4,
    height:20,
    backgroundColor:'red',
    marginRight:22,
  },
  recommendProductTitleText:{
    fontSize:14,
    color:'#888888',
    flex:1,
  },
  recommendProductSwiper:{

  },
  recommendProductName:{
    fontSize:13,
    color:'#888888',
  },
  recommendProductAttr:{
    fontSize:12,
    color:'#c7c7c7',
  },
  decorationStrategyTitleColumnBar:{
    width:4,
    height:20,
    backgroundColor:'red',
    marginRight:22,
  },
  decorationStrategyTitleText:{
    fontSize:14,
    color:'#888888',
    flex:1,
  },
  listViewItem:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginHorizontal:22,
    borderBottomWidth:1,
    borderColor:'rgb(229,229,229)',
    backgroundColor:'#fff',
    height:80,
  },
  listViewItemDot:{
    height:5,
    width:5,
    borderRadius:5,
    backgroundColor:'#000000',
  },
  listViewItemText:{
    fontSize:14,
    color:'#888888',
    flex:1,
    marginLeft:22,
  },
  listViewItemDate:{
    fontSize:12,
    color:'#c7c7c7',
    marginRight:22,
  },
  listViewItemArrow:{

  },
});
