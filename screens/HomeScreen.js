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

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    //header: null,
    title:'建材商城',
  };
  state = {
    location: null,
    city: null,
    errorMessage: null,
  };
  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
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


  render() {
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.city) {
      text = this.state.city
      
    }
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.searchContainer}>
            <View style={styles.positionBox}>
              <Text style={styles.SearchText,styles.positionBoxText}>{text}</Text>
              <Image source={require('../assets/images/01首页部分/下拉.png')} />
            </View>
            <TouchableOpacity style={styles.searchBox} onPress={this._search}>
              <Image source={require('../assets/images/01首页部分/搜索.png')} />
              <Text style={styles.searchText,styles.searchBoxText}>搜索</Text>
            </TouchableOpacity>
            <View style={styles.userBox}>
              <TouchableOpacity style={{alignItems:'center',justifyContent:'center',height:28,width:28}} onPress={this._infoList}>
                <Image source={require('../assets/images/01首页部分/通知.png')} style={styles.userBoxText}/>
              </TouchableOpacity>
              <TouchableOpacity style={{alignItems:'center',justifyContent:'center',height:28,width:28}} onPress={this._user}>
                <Image source={require('../assets/images/01首页部分/用户.png')} />
              </TouchableOpacity>
            </View>
          </View>
          
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
              <Image source={require('../assets/images/01首页部分/秒杀.png')} style={styles.columnViewItemImage}/>
              <Text style={styles.columnViewItemText}>秒杀</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.columnViewItem} onPress={this._catalog}>
              <Image source={require('../assets/images/01首页部分/百科.png')} style={styles.columnViewItemImage}/>
              <Text style={styles.columnViewItemText}>百科</Text>
            </TouchableOpacity>
            <View style={styles.columnViewItem}>
              <Image source={require('../assets/images/01首页部分/方案.png')} style={styles.columnViewItemImage}/>
              <Text style={styles.columnViewItemText}>方案</Text>
            </View>
            <View style={styles.columnViewItem}>
              <Image source={require('../assets/images/01首页部分/附近.png')} style={styles.cloumnViewItemImage}/>
              <Text style={styles.columnViewItemText}>附近</Text>
            </View>
          </View>
          <View style={styles.column2View}>
            <View style={styles.column2ViewItem}>
              <Text style={styles.column2ViewItemText}>地区</Text>
              <Image source={require('../assets/images/01首页部分/地区下拉.png')} style={styles.column2ViewItemImage}/>
            </View>
            <View style={styles.column2ViewItemSpan}></View>
            <View style={styles.column2ViewItem}>
              <Text style={styles.column2ViewItemText}>栏目</Text>
              <Image source={require('../assets/images/01首页部分/地区下拉.png')} style={styles.column2ViewItemImage}/>
            </View>
            <View style={styles.column2ViewItemSpan}></View>
            <View style={styles.column2ViewItem}>
              <Text style={styles.column2ViewItemText}>价格</Text>
              <Image source={require('../assets/images/01首页部分/地区下拉.png')} style={styles.column2ViewItemImage}/>
            </View>
          </View>
          <View style={styles.recommendShop}>
            <View style={styles.recommendShopTitle}>
              <View style={styles.recommendShopTitleColumnBar}/>
              <Text style={styles.recommendShopTitleText}>推荐商家</Text>
              <Icon.Ionicons
                name={'ios-arrow-forward'}
                size={22}
                style={styles.recommendShopTitleArrow}
              />
            </View>
            <Swiper style={styles.recommendShopSwiper}
            dotColor={'#999999'} activeDotColor={'#ff8f00'} 
            width={Dimensions.get('window').width}
            height={Math.floor(Dimensions.get('window').width * 390/750)}>
              <View style={styles.recommendShopSlide}>
                <View style={styles.recommendShopPerson}>
                  <Image source={require('../assets/images/01首页部分/one-piece-anime.png')} style={styles.recommendShopPersonImage}/>
                  <Text style={styles.recommendShopPersonName}>黄师傅 HUANG</Text>
                  <View style={styles.recommendShopPersonTextBlock}><Text style={styles.recommendShopPersonText}>综合评分：</Text><Text style={styles.recommendShopPersonText}>5.0</Text><Text style={styles.recommendShopPersonText}>分</Text></View>
                  <View style={styles.recommendShopPersonTextBlock}><Text style={styles.recommendShopPersonText}>服务次数：</Text><Text style={styles.recommendShopPersonText}>810</Text><Text style={styles.recommendShopPersonText}>次</Text></View>
                </View>
                <View style={styles.recommendShopPerson}>
                  <Image source={require('../assets/images/01首页部分/one-piece-anime.png')} style={styles.recommendShopPersonImage}/>
                  <Text style={styles.recommendShopPersonName}>黄师傅 HUANG</Text>
                  <View style={styles.recommendShopPersonTextBlock}><Text style={styles.recommendShopPersonText}>综合评分：</Text><Text style={styles.recommendShopPersonText}>5.0</Text><Text style={styles.recommendShopPersonText}>分</Text></View>
                  <View style={styles.recommendShopPersonTextBlock}><Text style={styles.recommendShopPersonText}>服务次数：</Text><Text style={styles.recommendShopPersonText}>810</Text><Text style={styles.recommendShopPersonText}>次</Text></View>
                </View>
              </View>
              <View style={styles.recommendShopSlide}>
              </View>
            </Swiper>
          </View>
          <View style={styles.successCase}>
            <View style={styles.successCaseTitle}>
              <View style={styles.successCaseTitleColumnBar}/>
              <Text style={styles.successCaseTitleText}>成功案例</Text>
              <Icon.Ionicons
                name={'ios-arrow-forward'}
                size={22}
                style={styles.recommendShopTitleArrow}
              />
            </View>
            <ScrollView style={styles.successCaseSwiper}
            dotColor={'#999999'} activeDotColor={'#ff8f00'} 
            width={Dimensions.get('window').width}
            height={Math.floor(Dimensions.get('window').width * 240/750)}
            horizontal={true}>
              <Image source={require('../assets/images/01首页部分/a01首页_05.png')} style={styles.successCaseSlide}/>
              <Image source={require('../assets/images/01首页部分/a01首页_07.png')} style={styles.successCaseSlide}/>
              <Image source={require('../assets/images/01首页部分/a01首页_05.png')} style={styles.successCaseSlide}/>
            </ScrollView>
          </View>
          <View style={styles.recommendProduct}>
            <View style={styles.recommendProductTitle}>
              <View style={styles.recommendProductTitleColumnBar}/>
              <Text style={styles.recommendProductTitleText}>推荐产品</Text>
              <Icon.Ionicons
                name={'ios-arrow-forward'}
                size={22}
                style={styles.recommendProductTitleArrow}
              />
            </View>
            <Swiper style={styles.recommendProductSwiper}
            dotColor={'#999999'} activeDotColor={'#ff8f00'} 
            width={Dimensions.get('window').width}
            height={Math.floor(Dimensions.get('window').width * 440/750)}>
              <View style={styles.recommendProductSlide}>
                  <Image source={require('../assets/images/01首页部分/a01首页_11.png')} style={styles.recommendProductImage}/>
                  <Text style={styles.recommendProductName}>仿大理石TBC型板</Text>
                  <Text style={styles.recommendProductAttr}>材质：大理石</Text>
              </View>
              <View style={styles.recommendProductSlide}>
                  <Image source={require('../assets/images/01首页部分/a01首页_11.png')} style={styles.recommendProductImage}/>
                  <Text style={styles.recommendProductName}>仿大理石TBC型板</Text>
                  <Text style={styles.recommendProductAttr}>材质：大理石</Text>
              </View>
            </Swiper>
          </View>
          <View style={styles.decorationStrategy}>
            <View style={styles.decorationStrategyTitle}>
              <View style={styles.decorationStrategyTitleColumnBar}/>
              <Text style={styles.decorationStrategyTitleText}>装修攻略</Text>
              <Icon.Ionicons
                name={'ios-arrow-forward'}
                size={22}
                style={styles.recommendProductTitleArrow}
              />
            </View>
            <View style={styles.decorationStrategyImage}>
              <Image source={require('../assets/images/01首页部分/a01首页_15.png')} style={styles.decorationStrategyImageImage}/>
              <Text style={styles.decorationStrategyImageText}>祝贺现代大师首家水漆产品通过美国LEED的VOC检测美国LEED的VOC检测</Text>
            </View>
          </View>
          <View style={styles.listView}></View>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
  },
  searchContainer: {
    flex:1,
    flexDirection: 'row',
    justifyContent:'space-between',
    paddingHorizontal:12,
    height:28,
    marginTop:25,
    marginBottom:10,
  },
  searchText:{
    fontSize:15,
    color:'#888888',
    textAlign: 'center',
    marginLeft:14,
  },
  searchBox:{
    flex:1,
    //borderWidth:1,
    borderRadius:5,
    //borderColor:'#888888',
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal:19,
    backgroundColor:'rgba(0,0,0,0.05)',
  },
  searchBoxText:{
    marginLeft:14,
  },
  positionBox:{
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center',
  },
  positionBoxText:{
    marginRight:8,
    fontSize:15,
    color:'#888888',
  },
  userBox:{
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center',
  },
  userBoxText:{
    marginRight:14,
  },
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
    borderColor:'#000000',
    justifyContent:'space-around',
  },
  columnViewItem:{
    alignItems:'center',
    width:54,
    height:54,
    borderRadius:50,
  },
  columnViewItemImage:{
    width:22,
    height:22,
  },
  columnViewItemText:{
    fontSize:13,
    color:'#403f3d'
  },
  column2View:{
    width:Dimensions.get('window').width,
    height:100,
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-around',
  },
  column2ViewItem:{
    alignItems:'center',
    width:64,
    height:64,
    flexDirection:'row',
  },
  column2ViewItemImage:{
    width:11,
    height:11,
    marginLeft:11,
  },
  column2ViewItemText:{
    fontSize:15,
    color:'#888888',
  },
  column2ViewItemSpan:{
    height:14,
    width:1,
    backgroundColor:'#888888',
  },
  recommendShop:{
    marginVertical:11,
  },
  recommendShopTitle:{
    borderBottomWidth:1,
    borderColor:'#888888',
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
  successCase:{

  },
  successCaseTitle:{
    borderBottomWidth:1,
    borderColor:'#888888',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginHorizontal:22,
    paddingVertical:22,
  },
  successCaseTitleColumnBar:{
    width:4,
    height:20,
    backgroundColor:'red',
    marginRight:22,
  },
  successCaseTitleText:{
    fontSize:14,
    color:'#888888',
    flex:1,
  },
  successCaseTitleArrow:{
  },
  successCaseSwiper:{

  },
  successCaseSlide:{
    width:133,
    height:75,
    marginHorizontal:1,
    marginVertical:22,
  },
  recommendProduct:{
    marginVertical:11,
  },
  recommendProductTitle:{
    borderBottomWidth:1,
    borderColor:'#888888',
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
  recommendProductTitleArrow:{
  },
  recommendProductSwiper:{

  },
  recommendProductSlide:{
    alignItems:'center',
    justifyContent:'center',
  },
  recommendProductImage:{
  },
  recommendProductName:{
    fontSize:13,
    color:'#888888',
  },
  recommendProductAttr:{
    fontSize:12,
    color:'#c7c7c7',
  },
  decorationStrategy:{

  },
  decorationStrategyTitle:{
    borderBottomWidth:1,
    borderColor:'#888888',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginHorizontal:22,
    paddingVertical:22,
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
  decorationStrategyTitleArrow:{
  },
  decorationStrategyImage:{

  },
  decorationStrategyImageImage:{

  },
  decorationStrategyImageText:{
    fontSize:14,
    color:'#ffffff',
    marginTop:-64,
    backgroundColor:'#000000'
  },
  listView:{
    marginTop:64,
  },
  listViewItem:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginHorizontal:22,
    borderBottomWidth:1,
    borderColor:'#e5e5e5',
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
